const metaScraper = require("metascraper");


class WebMetadataHelper {
    getMetaData(url,callback) {
            function getMeta($) {
                let meta = {}
                // parse all <meta> tags and attach to metdata.meta object:
                $('head meta').each(function (index, elem) {
                    var $this = $(this)
                        , m = {};

                    // prioritize key tag by: name, http-equiv, property:
                    m.name = $this.attr('name') || $this.attr('http-equiv') || $this.attr('property');
                    m.content = $this.attr('content');

                    // if there is a name key, add it to the meta object, otherwise discard:
                    if (m.name && m.content) {
                        if (meta[m.name]) {
                            meta[m.name + 's'] = meta[m.name + 's'] || [meta[m.name]]
                            meta[m.name + 's'].push(m.content)
                        } else {
                            meta[m.name] = m.content;
                        }
                    }
                });
                return meta;
            }


            const MY_RULES = Object.assign(metaScraper.RULES, {
               // meta: getMeta,
                totalVideos:($)=>{return $('body iframe').length},
                totalImages:($)=>{return $('body img').length}
            });
            
            metaScraper.scrapeUrl(url, MY_RULES).then((metadata) => {
                callback(null,metadata);
            }).catch(error=>{
                callback(null,{url:null});
            });
    }


}

module.exports = new WebMetadataHelper();