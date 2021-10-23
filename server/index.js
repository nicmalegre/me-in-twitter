const needle = require("needle");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;

app.listen(PORT, () => console.log(`server is runnig on PORT: ${PORT}`));

const endpointUsers = `https://api.twitter.com/2/users/by/username/`;

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

// const username = "753883405"; me

app.get("/users/:id", async (req, res, next) => {
  try {
    const username = req.params.id;
    const response = await getUser(username);
    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get("/user/:id", async (req, res, next) => {
  try {
    const username = req.params.id;
    const response = await getUser(username);
    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
