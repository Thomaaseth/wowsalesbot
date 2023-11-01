import { TwitterApi } from "twitter-api-v2";
require('dotenv').config();

const consumerKey = process.env.API_KEY;
const consumerSecret = process.env.API_KEY_SECRET;
const bearerToken = process.env.BEARER_TOKEN;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const twitterClient = new TwitterApi({
    appKey: consumerKey,
    appSecretKey: consumerSecret,
    appBearer: bearerToken,
    accessToken: accessToken,
    accessTokenSecret: accessTokenSecret
});

