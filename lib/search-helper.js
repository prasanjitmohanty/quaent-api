const request = require('request-promise-native');
const cheerio = require('cheerio');
const scraper = require('google-search-scraper');


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
                    // console.log(urls);
                    resolve(urls);
                }).catch((error) => {
                    //Fallback if duck duck go fails
                    new Promise(
                        () => {
                            const options = {
                                query: opts.q,
                                limit: max
                            };
                            let resultCount = 0;
                            let urls = [];
                            let errors = [];
                            scraper.search(options, (err, url) => {
                                resultCount++;
                                // This is called for each result 
                                err ? errors.push(err) : urls.push(url);
                                if (resultCount === max) {
                                    console.log('from google');
                                    urls.length > 0 ? resolve(urls) : reject(errors);
                                }
                            });
                        });
                });
            });
    }
}
module.exports = new SearchHelper();