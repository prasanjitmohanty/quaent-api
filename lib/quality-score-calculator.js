const qualityScoreAlgo = require('./quality-score-algorithm');

class QualityScoreCalculator {

    getScore(urlMetadata, callback) {
        let dict = {};
        const myURL = require('url').parse(urlMetadata.url);
        let score =0;
        try {
            const ups = parseInt(urlMetadata.totalImages) + parseInt(urlMetadata.totalVideos) + parseInt(urlMetadata.totalShareCount)
                + parseInt(urlMetadata.readabilityScore);
            if (urlMetadata.date.trim() && (ups > 0)) {
                const createdAt = new Date(urlMetadata.date);
                score = qualityScoreAlgo.hot(ups, createdAt);
            } 
        } catch (error) {
        }
        dict[myURL.host+myURL.path] = score;
        callback(null, dict);
    }
}
module.exports = new QualityScoreCalculator();