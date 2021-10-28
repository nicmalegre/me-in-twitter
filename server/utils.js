const isRetweet = tweet => tweet.substring(0, 2) === "RT";

const filterTweetsByCreated = tweets =>
  tweets.filter(({ text }) => !isRetweet(text));

const getAverages = tweets => {
  let retweet_count_total = 0;
  let reply_count_total = 0;
  let like_count_total = 0;
  let quote_count_total = 0;

  tweets.map(({ public_metrics }) => {
    retweet_count_total += public_metrics.retweet_count;
    reply_count_total += public_metrics.reply_count;
    like_count_total += public_metrics.like_count;
    quote_count_total += public_metrics.quote_count;
  });

  const retweetAvg = Math.round(retweet_count_total / tweets.length);
  const replyAvg = Math.round(reply_count_total / tweets.length);
  const likeAvg = Math.round(like_count_total / tweets.length);
  const quoteAvg = Math.round(quote_count_total / tweets.length);

  return { retweetAvg, replyAvg, likeAvg, quoteAvg };
};

const Utils = { filterTweetsByCreated, getAverages };

module.exports = Utils;
