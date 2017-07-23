const request = require('request-promise-native');
const async = require('async');
const sociare = require('sociare-counter');

class SocialShareCount {

    getShareCount(metadata, callback) {
        let url = metadata.url;
        function getFBShareCount(url, callback) {
            let baseUrl = `http://graph.facebook.com/?id=${url}`;
            request({
                method: 'GET',
                uri: baseUrl,
                json: true,
            }).then((response) => {
                callback(null, response.share.share_count);
            }).catch((error) => {
                callback(null, 0);
            });
        }

        function getOtherPlatformShareCount(url, callback) {
            sociare.getCounts(url, {
                networks: ['linkedin', 'pinterest']
            }).then((counts) => {
                callback(null, counts['linkedin'] + counts['pinterest']);
            });

        }
        async.parallel([
            (callback) => {
                getFBShareCount(url, callback);
            },
            (callback) => {
                getOtherPlatformShareCount(url, callback);
            },

        ], (err, results) => {
            //console.log(results);
            var totalCount = results.reduce((sum, value) => {
                return sum + value;
            }, 0);

            let dict = {};
            dict[url] = totalCount;
            callback(null, dict);
        });
    }


}
module.exports = new SocialShareCount();