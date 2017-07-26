const cmd = require('node-cmd');
const path = require('path');

class ReadabilityScore {

    getScore(metadata, callback) {
        let url = metadata.url;
        let dict = {};
        let readabilityPath = path.join('node_modules', 'readability-checker', 'lib', 'readability.js');
        let readabilityCommand = `node ${readabilityPath} ${url}`
        cmd.get(
            readabilityCommand,
            (err, data, stderr) => {
                if (err) {
                    dict[url] = 0;
                    callback(err, dict)
                } else {
                    try {
                        let outputArray = data.split('\n');//.split(':')[1].trim().split('/')[0];//;
                        let scoreString = outputArray.find(words => {
                            return words.includes('Flesch Reading Ease:');
                        })
                        let score = 0
                        if (scoreString) {
                            score = parseInt(scoreString.split(':')[1].split('/')[0].split('97m')[1]);
                        }

                        dict[url] = score;
                        callback(null, dict)

                    } catch (error) {
                        console.log(error);
                        dict[url] = 0;
                        callback(err, dict)
                    }
                }
            }
        );
    }
}
module.exports = new ReadabilityScore();