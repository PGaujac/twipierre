import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import './Comments.css';

export default function Comments(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div id='commentModal'>
      <Button className='modal-btn' onClick={handleShow}>
        Show comments
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ backgroundColor: '#141d26', color: '#fff' }}>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#243447', color: '#fff' }}>
          {props.displayComments()}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#141d26' }}>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
