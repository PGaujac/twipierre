import React, { useState, useEffect } from 'react';

import './Tweets.css';

export default function Tweets(props) {
  const [isLiked, isLikedUpdate] = useState(false);
  const [likeCounter, likeCounterUpdate] = useState(0);

  useEffect(() => {
    props.getTweets();
  }, []);

  const addLike = e => {
    likeCounterUpdate(likeCounter + 1);
  };

  const displayTweets = () => {
    const allTweets = props.tweetState.map((element, index) => (
      <div key={index} className='tweetContainer'>
        <div className='tweet'>
          <div className='tweet-head'>
            <div className='tweet-image'>
              <img src='/img/pierrvatar.jpg' alt='avatar' />
            </div>
            <div className='tweet-author'>
              <div className='name'>{element.Name}</div>
              <div className='handle'>@PGaujac</div>
            </div>
          </div>
          <div className='tweet-body'>
            <p id='tweet-text'>{element.Content}</p>
          </div>
          <div className='tweet-footer'>
            <div className='icons'>
              <i className='fas fa-reply'></i>
              <i className='fas fa-retweet'></i>
              <i onClick={addLike} className='fas fa-heart'></i>
              <span>{likeCounter}</span>
            </div>
          </div>
        </div>
      </div>
    ));

    return allTweets;
  };

  return <div>{displayTweets()}</div>;
}
