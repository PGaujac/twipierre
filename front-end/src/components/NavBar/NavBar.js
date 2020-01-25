import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { DiNetbeans } from 'react-icons/di';
import { IconContext } from 'react-icons';
import './NavBar.css';

export default function NavBar() {
  return (
    <Container>
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
      </Navbar>
    </Container>
  );
}
