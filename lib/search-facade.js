const searchHelper = require('./search-helper');
const metadataHelper = require('./web-matadata-helper');
const socialShareCont = require('./social-share-count');
const readabilityScore = require('./redability-score');
const qualityScoreCalc = require('./quality-score-calculator');
const socialFollowers = require('./social-followers-count');


const async = require('async');

class SearchFacade {
    search(searchText, callback) {
        searchHelper.search({
            q: searchText,
            max: 20
        }, (err, links) => {
            if (err) {
                callback([]);
            }
            async.map(links, metadataHelper.getMetaData, (err, results) => {
                let filteredData = results.filter((result) => {
                    return result.url;
                })
                async.series([
                    (callback) => {
                        async.map(filteredData, socialShareCont.getShareCount, (err, resultsData) => {
                            callback(null, resultsData);
                        });
                    },
                    (callback) => {
                        async.map(filteredData, readabilityScore.getScore, (err, resultsData) => {
                            callback(null, resultsData);
                        });
                    },
                    (callback) => {
                        async.map(filteredData, socialFollowers.getFollowersCount, (err, resultsData) => {
                            callback(null, resultsData);
                        });
                    },

                ], (err, parallelResults) => {
                    let metadata = filteredData;
                    let shareCounts = parallelResults[0].reduce((sum, value) => {
                        return Object.assign(sum, value)
                    }, {});

                    let readabilityScores = parallelResults[1].reduce((sum, value) => {
                        return Object.assign(sum, value)
                    }, {});

                    let followersCount = parallelResults[2].reduce((sum, value) => {
                        return Object.assign(sum, value)
                    }, {});

                    metadata.forEach((data) => {
                        data['totalShareCount'] = shareCounts[data.url];
                        data['readabilityScore'] = readabilityScores[data.url];
                        data['followersCount'] = followersCount[data.url];
                    });
                    async.map(metadata, qualityScoreCalc.getScore, (err, scores) => {
                        let qualityScores = scores.reduce(function (sum, value) {
                            return Object.assign(sum, value)
                        }, {});
                        metadata.forEach((data) => {
                            data['contentQualityScore'] = qualityScores[data.url];
                        });

                        let sortedMetadata = metadata.sort((a, b) => {
                            return b.contentQualityScore - a.contentQualityScore;
                            return b.contentQualityScore - a.contentQualityScore;
                        });
                        callback(sortedMetadata);
                    });

                });

            });
        });
    }
}



module.exports = new SearchFacade();