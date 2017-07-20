const searchHelper = require('./search-helper');
const metadataHelper = require('./web-matadata-helper');
const socialShareCont = require('./social-share-count');
const readabilityScore = require('./redability-score');
//
const async = require('async');

const data =  [ { author: 'Erwin Van Lun',
    date: '2017-07-19T11:00:00.000Z',
    description: `Chatbot directory, all virtual agents,  virtual agents, chatbots,  chat bots,  conversational agents and chatterbots listed), virtual agent list
, virtual assistant overview, chatterbot, chat bot,  conversational agent`,
    image: 'https://www.chatbots.org/design/chatbotsorg_homepage.jpg',
    publisher: 'Chatbots.org',
    title: 'Chatbots.org - Virtual assistants, virtual agents, chat bots, conversational agents, chatterbots, chatbots: examples, companies, news,directory',
    url: 'https://www.chatbots.org/',
    totalVideos: 0,
    totalImages: 52,
    totalShareCount: 725,
    readabilityScore: 96 },
  { author: '10203247768089464',
    date: '2016-04-20T11:46:02.836Z',
    description: 'Everything you need to know.',
    image: 'https://cdn-images-1.medium.com/max/1200/1*QNDwvpEdMtiv18XIJe0Ukg.png',
    publisher: 'Chatbots Magazine',
    title: 'The Complete Beginner’s Guide To Chatbots – Chatbots Magazine',
    url: 'https://chatbotsmagazine.com/the-complete-beginner-s-guide-to-chatbots-8280b7b906ca',
    totalVideos: 5,
    totalImages: 23,
    totalShareCount: 2552,
    readabilityScore: 96 },
  { author: null,
    date: '2017-01-30T12:00:00.000Z',
    description: null,
    image: '//upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Telegram_tourism_chatbot.png/200px-Telegram_tourism_chatbot.png',
    publisher: null,
    title: 'Chatbot - Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Chatbot',
    totalVideos: 0,
    totalImages: 4,
    totalShareCount: 133,
    readabilityScore: 96 },
  { author: 'John Rampton',
    date: '2017-02-28T19:30:00.000Z',
    description: 'Having a website became standard for every business years ago. That same process is just beginning for chatbots.',
    image: 'https://assets.entrepreneur.com/content/3x2/1300/20170227225902-GettyImages-555799115.jpeg',
    publisher: 'Entrepreneur',
    title: 'Top 10 Best Chatbot Platform Tools to Build Chatbots for Your Business',
    url: 'https://www.entrepreneur.com/article/289788',
    totalVideos: 1,
    totalImages: 9,
    totalShareCount: 2917,
    readabilityScore: 96 },
  { author: null,
    date: null,
    description: 'Cleverbot - Chat with a bot about anything and everything - AI learns from people, in context, and imitates',
    image: null,
    publisher: 'Cleverbot',
    title: 'Cleverbot',
    url: 'http://www.cleverbot.com/',
    totalVideos: 0,
    totalImages: 67,
    totalShareCount: 825472,
    readabilityScore: 96 },
  { author: 'Bi Intelligence',
    date: '2016-12-14T00:00:00.000Z',
    description: 'Businesses are beginning to see the benefits of using chatbots for their consumer-facing products',
    image: 'http://static3.uk.businessinsider.com/image/585161f7dd089526558b4ccb-1190-625/80-of-businesses-want-chatbots-by-2020.jpg',
    publisher: 'Business Insider',
    title: '80% of businesses want chatbots by 2020',
    url: 'http://uk.businessinsider.com/80-of-businesses-want-chatbots-by-2020-2016-12',
    totalVideos: 2,
    totalImages: 13,
    totalShareCount: undefined,
    readabilityScore: undefined },
  { author: 'Blake Morgan',
    date: '2017-06-08T00:00:00.000Z',
    description: `Customers are ready for chatbots, and the technology is here to take advantage of chatbot’s potential and forever change how brands engage with
customers. Chatbot technology is constantly improving, and it can be applied to a number of industries and has had success in just about every space.`,
    image: 'https://specials-images.forbesimg.com/imageserve/548473441/640x434.jpg?fit=scale',
    publisher: 'Forbes',
    title: 'How Chatbots Improve Customer Experience In Every Industry: An Infograph',
    url: 'https://www.forbes.com/sites/blakemorgan/2017/06/08/how-chatbots-improve-customer-experience-in-every-industry-an-infograph/',
    totalVideos: 0,
    totalImages: 7,
    totalShareCount: 1384,
    readabilityScore: 96 },
  { author: null,
    date: null,
    description: 'Affordable Chatbot Development Online Services. Hire a freelance chat bot specialist and get your project delivered remotely online',
    image: 'https://assetsv2.fiverrcdn.com/assets/v2_globals/fiverr-logo-new-green-9e65bddddfd33dfcf7e06fc1e51a5bc5.png',
    publisher: 'Fiverr.com',
    title: 'Chatbot Creation | Fiverr',
    url: 'https://www.fiverr.com/categories/programming-tech/chatbots',
    totalVideos: 1,
    totalImages: 3,
    totalShareCount: 3,
    readabilityScore: 96 },
  { author: 'Tamjul 19',
    date: '2017-07-19T16:33:42.950Z',
    description: 'Chatbots, AI, NLP, Facebook Messenger, Slack, Telegram, and more.',
    image: 'https://cdn-images-1.medium.com/max/1200/1*21YIHiEOUohoIT7_9Khrig.png',
    publisher: 'Chatbots Magazine',
    title: 'Chatbots Magazine',
    url: 'https://chatbotsmagazine.com/',
    totalVideos: 0,
    totalImages: 27,
    totalShareCount: 593,
    readabilityScore: 96 } ]

class SearchFacade {
    search(searchText) {
        return new Promise((resolve, reject) => {
            // searchHelper.search({
            //     q: searchText,
            //     max: 10
            // }).then(links => {
            //     async.parallel([
            //         (callback) => {
            //             async.map(links, metadataHelper.getMetaData, function (err, results) {
            //                 let filteredData = results.filter((result) => {
            //                     return result.url;
            //                 })
            //                 callback(null, filteredData);
            //             });
            //         },
            //         (callback) => {
            //             async.map(links, socialShareCont.getShareCount, function (err, results) {
            //                 callback(null, results);
            //             });
            //         },
            //         (callback) => {
            //             async.map(links, readabilityScore.getScore, function (err, results) {
            //                 callback(null, results);
            //             });
            //         },

            //     ], (err, results) => {

            //         let metadata = results[0];
            //         let shareCounts = results[1].reduce(function (sum, value) {
            //             return Object.assign(sum, value)
            //         }, {});;
            //         let readabilityScores = results[2].reduce(function (sum, value) {
            //             return Object.assign(sum, value)
            //         }, {});;
            //         console.log(metadata);
            //         console.log('----------------------------------------------------');
            //         console.log(shareCounts);
            //         console.log('----------------------------------------------------');
            //         console.log(readabilityScores);
            //         metadata.forEach((data) => {
            //             data['totalShareCount'] = shareCounts[data.url];
            //             data['readabilityScore'] = readabilityScores[data.url];
            //         });
            //         resolve(metadata);

            //     });


            // });
            resolve(data);
        });
    }
}

module.exports = new SearchFacade();