const needle = require("needle");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Utils = require("./utils");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;

app.listen(PORT, () => console.log(`server is runnig on PORT: ${PORT}`));

const endpointUsers = "https://api.twitter.com/2/users/by/username/";
const base_endpoint_user = "https://api.twitter.com/2/users/";

const getUser = async username => {
  const params = {
    "user.fields":
      "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
    expansions: "pinned_tweet_id",
    "tweet.fields":
      "attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,public_metrics,organic_metrics,promoted_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld",
  };

  // this is the HTTP header that adds bearer TOKEN authentication
  const res = await needle("get", `${endpointUsers}${username}`, params, {
    headers: {
      "User-Agent": "v2UserLookupJS",
      authorization: `Bearer ${TOKEN}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
};

const getUserIdByUsername = async username => {
  // this is the HTTP header that adds bearer TOKEN authentication
  const res = await needle("get", `${endpointUsers}${username}`, {
    headers: {
      "User-Agent": "v2UserLookupJS",
      authorization: `Bearer ${TOKEN}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
};

const getTweetsById = async id => {
  const params = {
    "tweet.fields": "public_metrics",
    max_results: 100,
  };

  // this is the HTTP header that adds bearer TOKEN authentication
  const res = await needle("get", `${base_endpoint_user}${id}/tweets`, params, {
    headers: {
      "User-Agent": "v2UserLookupJS",
      authorization: `Bearer ${TOKEN}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
};

// const username = "753883405"; me

app.get("/users/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    const response = await getUser(username);
    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/users/:username/tweets", async (req, res, next) => {
  try {
    const username = req.params.username;

    const response = await getUserIdByUsername(username);
    const { id } = Object(response.data);

    if (id) {
      const responseTweets = await getTweetsById(id);
      res.json(responseTweets);
    }
    res.json(`Unsuccessful request. Try again with another username`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/users/:username/tweets/analytics", async (req, res, next) => {
  try {
    const username = req.params.username;

    const response = await getUserIdByUsername(username);
    const { id } = Object(response.data);

    if (id) {
      const responseTweets = await getTweetsById(id);

      const filtersTweets = Utils.filterTweetsByCreated(responseTweets.data);
      const { retweetAvg, replyAvg, likeAvg, quoteAvg } =
        Utils.getAverages(filtersTweets);

      console.log("AVERAGES");
      console.log("filtersTweets length", filtersTweets.length);
      console.log("retweetAvg", retweetAvg);
      console.log("replyAvg", replyAvg);
      console.log("likeAvg", likeAvg);
      console.log("quoteAvg", quoteAvg);

      const analyticsData = {
        total_tweets: filtersTweets.length,
        reply_average: replyAvg,
        retweet_average: retweetAvg,
        like_average: likeAvg,
        quote_average: quoteAvg,
      };

      res.json(analyticsData);
    }
    res.json(`Unsuccessful request. Try again with another username`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
