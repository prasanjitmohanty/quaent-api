const searchHelper = require('./search-helper');
const metadataHelper = require('./web-matadata-helper');
const socialShareCont = require('./social-share-count');
const readabilityScore = require('./redability-score');
const qualityScoreCalc = require('./quality-score-calculator');


const async = require('async');

class SearchFacade {
    search(searchText) {
        return new Promise((resolve, reject) => {
            searchHelper.search({
                q: searchText,
                max: 15
            }).then(links => {
                async.map(links, metadataHelper.getMetaData, (err, results) => {
                    let filteredData = results.filter((result) => {
                        return result.url;
                    })

                    async.parallel([
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

                    ], (err, parallelResults) => {                        
                        let metadata = filteredData;
                        let shareCounts = parallelResults[0].reduce((sum, value) => {
                            return Object.assign(sum, value)
                        }, {});
                        let readabilityScores = parallelResults[1].reduce((sum, value) => {
                            return Object.assign(sum, value)
                        }, {});

                        metadata.forEach((data) => {
                            data['totalShareCount'] = shareCounts[data.url];
                            data['readabilityScore'] = readabilityScores[data.url];
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
                            });
                            console.log(sortedMetadata);
                            resolve(sortedMetadata);
                        });

                    });
                });

            });


        });
        //resolve(data);
    }
}


module.exports = new SearchFacade();