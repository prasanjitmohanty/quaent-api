class QualityScoreAlgorithm {

    constructor() {
        this.base = 1134028003;
        this.epoch = new Date(1970, 1, 1);
    }

    hot(score, date) {
        let order = this.log10(Math.max(Math.abs(score), 1));;
        let sign = this.sign(score);
        let seconds = Math.abs((date.getTime() - this.epoch.getTime()) / 1000) - this.base;
        let result = sign * order + seconds / 45000;
        return Math.round(Math.pow(10, 7) * result) / Math.pow(10, 7);
    }

    sign(score) {
        if (score > 0) {
            return 1;
        }
        return 0;
    }

    log10(value) {
        return Math.log(value) / Math.LN10;
    }
}
module.exports = new QualityScoreAlgorithm();