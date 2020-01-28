import React, { useEffect } from 'react';
import Tweet from '../Tweet/Tweet';

import './Tweets.css';

export default function Tweets(props) {
  useEffect(() => {
    props.getTweets();
  }, []);

  const displayTweets = () => {
    const allTweets = props.tweetState.map((element, index) => (
      <Tweet key={index} element={element} />
    ));

    return allTweets;
  };

  return <div>{displayTweets()}</div>;
}

//Array.unshift
