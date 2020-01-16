import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { FaTwitter } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import './NavBar.css';

export default function NavBar() {
  return (
    <div>
      <Container>
        <Navbar
          className='navbar'
          variant='dark'
          style={{ backgroundColor: '#141d26' }}
        >
          <Navbar.Brand href='#home'>
            <IconContext.Provider value={{ className: 'react-icons' }}>
              <div className='icon-container'>
                <FaTwitter />
              </div>
            </IconContext.Provider>
            <span className='brand'>TwiPierre</span>
          </Navbar.Brand>
        </Navbar>
      </Container>
    </div>
  );
}
