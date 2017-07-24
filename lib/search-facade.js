const searchHelper = require('./search-helper');
const metadataHelper = require('./web-matadata-helper');
const socialShareCont = require('./social-share-count');
const readabilityScore = require('./redability-score');
const qualityScoreCalc = require('./quality-score-calculator');
const { fork } = require('child_process');


const async = require('async');

class SearchFacade {
    search(searchText) {
        return new Promise((resolve, reject) => {
            searchHelper.search({
                q: searchText,
                max: 15
            }).then(links => {
                const totalProcesses = 3;
                let resultCounter = 0;
                let resultData = [];
                let startIndex = 0;
                let endIndex = 5;

                for (let index = 0; index < totalProcesses; index++) {
                    let compute = fork('./lib/result-calculator.js');
                    compute.send(links.slice(startIndex, endIndex));
                    startIndex += 5;
                    endIndex += 5;
                    compute.on('message', metadata => {
                        resultCounter++;
                        resultData = resultData.concat(metadata);
                        if (resultCounter === totalProcesses) {
                            let sortedMetadata = resultData.sort((a, b) => {
                                return b.contentQualityScore - a.contentQualityScore;
                            });
                            resolve(sortedMetadata);
                        }
                    });
                }
                //----
            });


        });
        //resolve(data);
    }
}


module.exports = new SearchFacade();