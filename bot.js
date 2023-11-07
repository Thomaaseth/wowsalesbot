const { TwitterApi } = require ("twitter-api-v2");
const axios  = require ("axios");
require('dotenv').config();

// const consumerKey = process.env.API_KEY;
// const consumerSecret = process.env.API_KEY_SECRET;
// const bearerToken = process.env.BEARER_TOKEN;
// const accessToken = process.env.ACCESS_TOKEN;
// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// const twitterClient = new TwitterApi({
//     appKey: consumerKey,
//     appSecretKey: consumerSecret,
//     appBearer: bearerToken,
//     accessToken: accessToken,
//     accessTokenSecret: accessTokenSecret
// });

const openseaApiKey = process.env.OPENSEA_API_KEY;
const collectionSlug = "world-of-women-nft";

axios.get(`https://api.opensea.io/api/v2/events/collection/${collectionSlug}`, {
    headers: {
        'x-api-key': openseaApiKey
    }
})
.then((response) => {
    const latestSale = response.data.asset_events[0];
    const name = latestSale.nft.name;
    const id = latestSale.nft.identifier;

    console.log(`Latest sale: ${name}, ${id}`);
})
.catch((error) => {
    console.error('Error fetching data', error)
});