
const searchFacade = require('./lib/search-facade');
 searchFacade.search('node.js').then((reults)=>{
    console.log(reults);
 })
//http://www.theguardian.com/technology/2016/apr/06/what-is-chat-bot-kik-bot-shop-messaging-platform
// const searchFacade = require('./lib/web-matadata-helper');
// searchFacade.getMetaData('http://www.theguardian.com/technology/2016/apr/06/what-is-chat-bot-kik-bot-shop-messaging-platform',function(err,metadata){
//     console.log(metadata);
// })

// const URL = require('url');
//
// const myURL = require('url').parse ('https://www.theguardian.com/technology/2016/apr/06/what-is-chat-bot-kik-bot-shop-messaging-platform');
// console.log(myURL.host+myURL.path)

// const searchFacade = require('./lib/social-share-count');
// searchFacade.getShareCount('http://www.theguardian.com/technology/2016/apr/06/what-is-chat-bot-kik-bot-shop-messaging-platform',function(err,metadata){
//     console.log(metadata);
// })

// const urlMetadata = {
//     author: 'Erwin Van Lun',
//     date: '2017-07-19T11:00:00.000Z',
//     publisher: 'Chatbots.org',
//     title: 'Chatbots.org - Virtual assistants, virtual agents, chat bots, conversational agents, chatterbots, chatbots: examples, companies, news,directory',
//     url: 'https://www.chatbots.org/',
//     totalVideos: 0,
//     totalImages: 52,
//     totalShareCount: 725,
//     readabilityScore: 96
// };
// const searchFacade = require('./lib/quality-score-calculator');
// searchFacade.getScore(urlMetadata, function (err, score) {
//     console.log(score);
// })

