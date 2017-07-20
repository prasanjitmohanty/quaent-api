const request = require('request-promise-native');
const cheerio = require('cheerio');


class SearchHelper {

    search(opts) {
        
        return new Promise(
            (resolve, reject) => {
                let max = opts.max || 0
                 delete opts.max
                let urls = [];
                request({
                    method: 'GET',
                    baseUrl: 'https://duckduckgo.com',
                    uri: '/html',
                    qs: opts
                }).then((response) => {
                    //console.log(response);
                    let $ = cheerio.load(response)
                    let links = $('#links .links_main a.result__a')
                    links.each((i, elem) => {
                        if ((max > 0 && urls.length < max) || max === 0) {
                            let url = $(elem).attr('href');
                            url = unescape(url.substring(url.indexOf('http')));
                            urls.push(url);
                        }
                    })
                    console.log(urls);
                    resolve(urls);
                }).catch((error) => {
                    reject(error);
                });
            });
    }
}
module.exports = new SearchHelper();