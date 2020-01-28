import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { FaRegHeart, FaRetweet, FaShare, FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import { UserContext } from '../App/UserProvider';

import Comments from '../Comments/Comments';

import './Tweet.css';

export default function Tweet(props) {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState([]);

  const [user, setUser] = useContext(UserContext);

  const handleComment = e => {
    setComment(e.target.value);
  };

  const sendComment = e => {
    e.preventDefault();
    const newComment = {
      Author: user,
      Content: comment
    };
    setComment('');

    const commentData = {
      comment: newComment,
      tweetId: props.element._id
    };

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(commentData),
      credentials: 'include'
    };
    fetch('http://localhost:8080/comment', data)
      .then(response => response.json())
      .then(responseData => console.log(responseData));

    props.element.Comments.push(newComment);
  };
  const addLike = e => {
    setLikes(likes + 1);
  };

  const displayComments = () => {
    return props.element.Comments.map((comment, index) => {
      return (
        <div key={index}>
          <h3>{comment.Author}</h3>
          <p>{comment.Content}</p>
        </div>
      );
    });
  };
  return (
    <div className='tweetContainer'>
      <div className='tweet'>
        <div className='tweet-head'>
          <IconContext.Provider value={{ size: '2.5em' }}>
            <div className='tweet-image'>
              <FaUserCircle />
            </div>
          </IconContext.Provider>
          <div className='tweet-author'>
            {/* <div className='name'>
              {props.element.Name}
              {console.log(props.element.Name)}
            </div> */}
            <div className='handle'>{props.element.Author}</div>
          </div>
        </div>
        <div className='tweet-body'>
          <p id='tweet-text'>{props.element.Content}</p>
        </div>
        <div className='tweet-footer'>
          <div className='icons'>
            <FaShare className='fas fa-reply' />
            <FaRetweet className='fas fa-retweet' />
            <FaRegHeart onClick={addLike} className='fas fa-heart' />
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
              <Button
                style={{ borderRadius: '20px' }}
                className='commentButton'
                type='submit'
              >
                Send
              </Button>
            </span>
          </form>
          <Comments displayComments={displayComments} />
        </div>
      </div>
    </div>
  );
}
