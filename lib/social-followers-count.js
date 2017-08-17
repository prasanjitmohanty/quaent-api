const socialCounter = require('social-counter');
const async = require('async');

class SocialFollowersCount {

    getFollowersCount(metadata, callback) {
        let url = metadata.url;
        let authorTwitterId = metadata.meta['twitter:creator'];
        let sourceTwitterId = metadata.meta['twitter:site'];
        function getAuthorFollowersCount(twitterId, callback) {
            let socialCounterPromise = socialCounter.init({
                'twitter': twitterId
            });

            socialCounterPromise.then(() => {
                let twitterNumber = socialCounter.getTwitter();
                callback(null, twitterNumber);
            }).catch(error => {
                callback(null, 0);
            });
        }


        async.parallel([
            (callback) => {
                if (authorTwitterId) {
                    getAuthorFollowersCount(authorTwitterId, callback);
                } else {
                    callback(null, 0);
                }

            },
            (callback) => {
                if (sourceTwitterId && (authorTwitterId !== sourceTwitterId)) {
                    getAuthorFollowersCount(sourceTwitterId, callback);
                } else {
                    callback(null, 0);
                }
            },

        ], (err, results) => {
            let totalCount = results.reduce((sum, value) => {
                return sum + value;
            }, 0);
            let dict = {};
            dict[url] = totalCount;
            callback(null, dict);
        });
    }
}
module.exports = new SocialFollowersCount();