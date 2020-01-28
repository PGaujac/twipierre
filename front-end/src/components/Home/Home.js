import React, { useState, useContext } from 'react';

import Tweets from '../Tweets/Tweets';
import { UserContext } from '../App/UserProvider';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import './Home.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Home(props) {
  const [tweetContent, tweetContentUpdate] = useState({});
  const [tweets, setTweets] = useState([]);
  const [tweetLength, setTweetLength] = useState(0);

  const [user, setUser] = useContext(UserContext);

  const handleChange = e => {
    tweetContentUpdate({
      Author: user,
      Date: new Date(),
      Content: e.target.value,
      Likes: 0,
      Comments: []
    });
    setTweetLength(e.target.value.length);
  };

  // Send tweet to DB
  const sendTweet = e => {
    e.preventDefault();
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(tweetContent),
      credentials: 'include'
    };
    fetch('http://localhost:8080/tweet', data)
      .then(response => response.json())
      .then(data => {
        tweetContent.Date = tweetContent.Date.toDateString();
        setTweets([...tweets, tweetContent]);
      });
    tweetContentUpdate('');
  };

  // Fetch tweets from DB
  const getTweets = () => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      headers: headers,
      method: 'GET'
    };

    fetch('http://localhost:8080/gettweets', data)
      .then(response => response.json())
      .then(data => setTweets(data));
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className='postTweet'>
            <div>
              {' '}
              <IconContext.Provider value={{ size: '2.5em' }}>
                <div>
                  <FaUserCircle />
                </div>
              </IconContext.Provider>
            </div>
            <label name='tweet'>{user}</label>
            <input
              autoComplete='off'
              className='tweetInput'
              type='text'
              name='tweet'
              id='tweet'
              placeholder="What's on your mind ?"
              onChange={handleChange}
              value={tweetContent.Content || ''}
            />
            <Button onClick={sendTweet} className='sendTweet'>
              Send
            </Button>
            <div className='counter'>
              <p>You inserted {tweetLength} characters</p>
            </div>
          </div>
          <Tweets getTweets={getTweets} tweetState={tweets} />
        </Col>
      </Row>
    </Container>
  );
}
