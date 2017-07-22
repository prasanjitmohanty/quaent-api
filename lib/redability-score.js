const request = require('request-promise-native');
const cheerio = require('cheerio');

class ReadabilityScore {

    getScore(url, callback) {
        let dict = {};
        const myURL = require('url').parse(url);
        dict[myURL.host+myURL.path] = 96;
        callback(null,dict);
    }
}
module.exports = new ReadabilityScore();