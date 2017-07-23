const cmd = require('node-cmd');
const path = require('path');

class ReadabilityScore {

    getScore(url, callback) {
        let dict = {};
        const myURL = require('url').parse(url);
        let readabilityPath = path.join('node_modules', 'readability-checker', 'lib','readability.js');
        let readabilityCommand =`node ${readabilityPath} ${url}`
        cmd.get(
            readabilityCommand,
             (err, data, stderr) =>{
                if(err){
                    dict[myURL.host+myURL.path] = 0;
                    callback(err,dict)
                }else{
                    let outputArray = data.split('\n');//.split(':')[1].trim().split('/')[0];//;
                    let scoreString=outputArray.find(words =>{
                        return words.includes('Flesch Reading Ease:');
                    })
                    let score =scoreString.split(':')[1].split('/')[0].split('97m')[1];
                    dict[myURL.host+myURL.path] =parseInt(score);
                    callback(null,dict)
                }
            }
        );
    }
}
module.exports = new ReadabilityScore();