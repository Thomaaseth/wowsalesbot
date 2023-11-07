const fs = require("fs");
const { TwitterApi } = require ("twitter-api-v2");
const axios  = require ("axios");
require('dotenv').config();

const consumerKey = process.env.API_KEY;
const consumerSecret = process.env.API_KEY_SECRET;
const bearerToken = process.env.BEARER_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const twitterClient = new TwitterApi({
    appKey: consumerKey,
    appSecret: consumerSecret,
    accessToken: accessToken,
    accessSecret: accessTokenSecret,
    appBearer: bearerToken
});

const openseaApiKey = process.env.OPENSEA_API_KEY;
const collectionSlug = "world-of-women-nft";

let lastOrderHash;

try {
    const data = fs.readFileSync('last_order_hash.json', 'utf8');
    lastOrderHash = JSON.parse(data).orderHash;
} catch (err) {
  console.error('Error reading hash', err);
}

axios.get(`https://api.opensea.io/api/v2/events/collection/${collectionSlug}`, {
    headers: {
        'x-api-key': openseaApiKey
    }
})
.then((response) => {
    const latestSale = response.data.asset_events[0];
    const name = latestSale.nft.name;
    const id = latestSale.nft.identifier;
    const orderHash = latestSale.order_hash;
    const priceWei = response.data.asset_events[0].payment.quantity;
    const priceETH = parseFloat(priceWei) / Math.pow(10, 18)

    console.log(`Latest sale: ${name}, ${id}, ${orderHash}`);
    console.log(`orderHash: '${orderHash}'`);
    console.log(`lastOrderHash: '${lastOrderHash}'`);
    console.log( `Price in ETH: ${priceETH}`);


    if (orderHash !== lastOrderHash) {
        const message = `New WoW sale test: ${name}, ${id}, ${priceETH}`;
        
        twitterClient.v2.tweet(message)
            .then((response) => {
            console.log("Tweet successfull", response);

            fs.writeFileSync('last_order_hash.json', JSON.stringify({ orderHash }), 'utf8');


        })
        .catch((error) => {
        console.log("Error sending tweet", error);
    });
} else {
    console.log("No new sale");
}
})
.catch((error) => {
    console.error('Error fetching data', error)
});


