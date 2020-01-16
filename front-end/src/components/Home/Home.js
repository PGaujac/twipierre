import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';

import './Home.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Home(props) {
  const [tweetContent, tweetContentUpdate] = useState({});

  const handleChange = e => {
    tweetContentUpdate({
      Author: 'Pierre de Gaujac',
      Date: new Date(),
      Content: e.target.value,
      Likes: 0
    });
  };

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
    console.log(data);
    fetch('http://localhost:8080/tweet', data)
      .then(response => response.json())
      .then(data => console.log(data));
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}
