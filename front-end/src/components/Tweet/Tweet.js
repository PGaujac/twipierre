import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import './Tweet.css';

export default function Tweet(props) {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState([]);

  const handleComment = e => {
    setComment(e.target.value);
  };

  const sendComment = e => {
    e.preventDefault();
    const newComment = {
      Author: ' Pierre de Gaujac',
      Content: comment
    };
    setComment('');

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(newComment)
    };
    fetch('http://localhost:8080/comment', data)
      .then(response => response.json())
      .then(console.log(data));
  };
  const addLike = e => {
    setLikes(likes + 1);
  };
  return (
    <div className='tweetContainer'>
      <div className='tweet'>
        <div className='tweet-head'>
          <div className='tweet-image'>
            <img src='/img/pierrvatar.jpg' alt='avatar' />
          </div>
          <div className='tweet-author'>
            <div className='name'>{props.element.Name}</div>
            <div className='handle'>@PGaujac</div>
          </div>
        </div>
        <div className='tweet-body'>
          <p id='tweet-text'>{props.element.Content}</p>
        </div>
        <div className='tweet-footer'>
          <div className='icons'>
            <i className='fas fa-reply'></i>
            <i className='fas fa-retweet'></i>
            <i onClick={addLike} className='fas fa-heart'></i>
            <span>{likes}</span>
          </div>
          <form onSubmit={sendComment}>
            <label htmlFor='comment' name='comment' id='comment'>
              Comment :
            </label>
            <input
              className='commentInput'
              type='text'
              name='comment'
              value={comment}
              autoComplete='off'
              onChange={handleComment}
            />
            <span>
              <Button className='commentButton' type='submit'>
                Send
              </Button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
