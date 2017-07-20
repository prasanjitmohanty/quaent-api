
const searchFacade = require('./lib/search-facade');
 searchFacade.search('chatbots').then((reults)=>{
    console.log(reults);
 })

// const searchFacade = require('./lib/web-matadata-helper');
// searchFacade.getMetaData('https://medium.com/@stubailo/returning-the-query-type-in-graphql-111d5c0b15b8',function(err,metadata){
//     console.log(metadata);
// })


// const searchFacade = require('./lib/social-share-count');
// searchFacade.getShareCount('http://blog.andrewray.me/reactjs-for-stupid-people',function(err,metadata){
//     console.log(metadata);
// })

