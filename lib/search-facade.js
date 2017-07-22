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
                max: 10
            }).then(links => {
                async.parallel([
                    (callback) => {
                        async.map(links, metadataHelper.getMetaData, (err, results) => {
                            let filteredData = results.filter((result) => {
                                return result.url;
                            })
                            callback(null, filteredData);
                        });
                    },
                    (callback) => {
                        async.map(links, socialShareCont.getShareCount, (err, results) => {
                            callback(null, results);
                        });
                    },
                    (callback) => {
                        async.map(links, readabilityScore.getScore, (err, results) => {
                            callback(null, results);
                        });
                    },

                ], (err, results) => {

                    let metadata = results[0];
                    let shareCounts = results[1].reduce((sum, value) => {
                        return Object.assign(sum, value)
                    }, {});
                    console.log(shareCounts);
                    let readabilityScores = results[2].reduce((sum, value) => {
                        return Object.assign(sum, value)
                    }, {});

                    metadata.forEach((data) => {
                        let myURL = require('url').parse(data.url);
                        let key = myURL.host + myURL.path;
                        data['totalShareCount'] = shareCounts[key];
                        data['readabilityScore'] = readabilityScores[key];
                    });
                    async.map(metadata, qualityScoreCalc.getScore, (err, scores) => {
                        let qualityScores = scores.reduce(function (sum, value) {
                            return Object.assign(sum, value)
                        }, {});
                        metadata.forEach((data) => {
                            let myURLData = require('url').parse(data.url);
                            let keyr = myURLData.host + myURLData.path;
                            data['contentQualityScore'] = qualityScores[keyr];
                        });
                        let sortedMetadata = metadata.sort( (a, b)=> {
                            return b.contentQualityScore - a.contentQualityScore;
                        });
                        resolve(sortedMetadata);
                    });

                });

            });


        });
        //resolve(data);
    }
}


module.exports = new SearchFacade();