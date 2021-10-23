const PORT = 8000;
const needle = require("needle");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(PORT, () => console.log(`server is runnig on PORT: ${PORT}`));

const token =
  "AAAAAAAAAAAAAAAAAAAAAL4CUwEAAAAAijF2%2FLMfZngDTE%2Byov9gUeW7ib8%3D1PsojU5b6ZOYLHup6jy2ZUTcyWO366KrgQgnWU3TNAHnfuvsGz";

// const userId = "14889282"; pb
const userId = "753883405"; //me

const endpointURL = `https://api.twitter.com/2/users/${userId}`;

async function getRequest() {
  const params = {
    "user.fields":
      "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
    expansions: "pinned_tweet_id",
    "tweet.fields":
      "attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,public_metrics,organic_metrics,promoted_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld",
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2UserLookupJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

const getData = async () => {
  try {
    // Make request
    const response = await getRequest();
    return response;
    // console.dir(response, {
    //   depth: null,
    // });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
};

app.get("/", async (req, res) => {
  const response = await getData();
  res.json(response);
});
