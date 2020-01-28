import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Button } from 'react-bootstrap';
import { DiNetbeans } from 'react-icons/di';
import { IconContext } from 'react-icons';
import { Redirect } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {
  const [reDirect, handleReDirect] = useState(false);

  const redirect = () => {
    if (reDirect === true) {
      return <Redirect to='/login' />;
    }
  };

  const logOut = () => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      headers: headers,
      method: 'GET',
      credentials: 'include'
    };
    fetch('http://localhost:8080/api/logout', data)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success === true) {
          handleReDirect(true);
          console.log(responseData);
        }
      });
  };
  return (
    <Container>
      {redirect()}
      <Navbar
        className='navbar'
        variant='dark'
        style={{ backgroundColor: '#141d26' }}
      >
        <Navbar.Brand>
          <IconContext.Provider value={{ size: '2.5em' }}>
            <div className='icon-container'>
              <DiNetbeans />
            </div>
          </IconContext.Provider>
          <span className='brand'>TwiPierre</span>
        </Navbar.Brand>
        <Button onClick={logOut}>LogOut</Button>
      </Navbar>
    </Container>
  );
}
