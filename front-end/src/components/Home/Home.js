import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Tweets from '../Tweets/Tweets';

import './Home.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Home(props) {
  const [tweetContent, tweetContentUpdate] = useState('');
  const [tweets, setTweets] = useState([]);
  const [tweetLength, setTweetLength] = useState(0);

  const handleChange = e => {
    tweetContentUpdate({
      Author: 'Pierre de Gaujac',
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
      body: JSON.stringify(tweetContent)
    };
    fetch('http://localhost:8080/tweet', data)
      .then(response => response.json())
      .then(data => {
        tweetContent.Date = tweetContent.Date.toDateString();
        setTweets([...tweets, tweetContent]);
      });
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
            <Image
              className='avatar'
              src='/img/pierrvatar.jpg'
              roundedCircle
            ></Image>
            <label name='tweet'>@Pierre</label>
            <input
              autoComplete='off'
              className='tweetInput'
              type='text'
              name='tweet'
              id='tweet'
              placeholder='Sup ?'
              onChange={handleChange}
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
