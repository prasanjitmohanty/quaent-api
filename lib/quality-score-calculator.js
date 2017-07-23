const qualityScoreAlgo = require('./quality-score-algorithm');

class QualityScoreCalculator {

    getScore(urlMetadata, callback) {
        let dict = {};
        let score =0;
        try {
            const ups = parseInt(urlMetadata.totalImages) + parseInt(urlMetadata.totalVideos) + parseInt(urlMetadata.totalShareCount)
                + parseInt(urlMetadata.readabilityScore);
                let publishedDate = new Date();
                publishedDate.setFullYear(publishedDate.getFullYear() - 10);
            if (urlMetadata.date) {
                publishedDate = new Date(urlMetadata.date.trim());
            } 
            if(ups > 0){
                score = qualityScoreAlgo.hot(ups, publishedDate);
            }
            
        } catch (error) {
            console.log(error)
        }
        dict[urlMetadata.url] = score;
        callback(null, dict);
    }
}
module.exports = new QualityScoreCalculator();