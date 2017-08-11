
const scrape = require('ascrape');
const textStats = require('text-stats');
const flesch = require('flesch');

class ReadabilityScore {

    getScore(metadata, callback) {
        let url = metadata.url;
        let dict = {};
        scrape(url, (err, article, meta) => {
            if (err) {
                dict[url] = 0;
                callback(err, dict)
            } else {
                try {
                    let text = article.content.text();
                    let stats = textStats.stats(text);
                    let score = flesch({
                        sentence: stats.sentences,
                        word: stats.words,
                        syllable: stats.syllables
                    });
                    dict[url] = score;
                    callback(null, dict)
                } catch (error) {
                     console.log('content not available for:' + url);
                    dict[url] = 0;
                    callback(err, dict)
                }
            }

        });
    }
}
module.exports = new ReadabilityScore();