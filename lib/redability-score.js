const request = require('request-promise-native');
const cheerio = require('cheerio');

class ReadabilityScore {

    getScore(url, callback) {
        let dict = {};
        dict[url] = 96;
        callback(null,dict);
    }
}
module.exports = new ReadabilityScore();