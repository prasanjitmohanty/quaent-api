
// const searchFacade = require('./lib/search-facade');
//  searchFacade.search('state of art of chatbots').then((reults)=>{
//     console.log(reults);
//  })
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

const searchFacade = require('./lib/redability-score');
searchFacade.getScore('http://google.com',function(err,metadata){
    console.log(err)
    console.log(metadata);
})
//const redability = require('readability-checker');
//console.log(redability)
// var cmd=require('node-cmd');
// var nrc = require('node-run-cmd');
// //cmd.run('node_modules\.bin\readability http://www.heydonworks.com');
// var dataCallback = function(data) {
//   console.log(data);
// };

 
//node node_modules\readability-checker\lib\readability.js
//nrc.run('node test1.js', { onData: dataCallback });
// cmd.get(
    
//         'node node_modules/readability-checker/lib/readability.js http://www.heydonworks.com',
//         function(err, data, stderr){
//             let score = data.split('\n')[3].split(':')[1].split('/')[0];
//             console.log('the current dir contains these files :\n\n',score)
//         }
//     );
//  if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
//   shell.echo('Error: Git commit failed');
//   shell.exit(1);
// }

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

