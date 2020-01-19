//Module Imports
import React from 'react';
import { useFormFields } from '../../libs/hooksLib';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './SignUp.css';

export default function SignUp(props) {
  const [fields, handleFieldChange] = useFormFields({
    Email: '',
    UserName: '',
    Password: ''
  });

  const validateForm = () =>
    fields.Email.length && fields.UserName.length && fields.Password.length > 0;

  const handleSubmit = e => {
    e.preventDefault();
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const data = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(fields)
    };
    fetch('http://localhost:8080/register', data)
      .then(response => response.json())
      .then(data => console.log(data));
    console.log('test');
  };
  return (
    <div className='SignUp'>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId='Email' size='large'>
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type='email'
            value={fields.Email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='UserName' size='large'>
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type='text'
            value={fields.UserName}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='Password' size='large'>
          <FormLabel>Password</FormLabel>
          <FormControl
            autoFocus
            type='password'
            value={fields.Password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <Button type='submit' block size='large' disabled={!validateForm()}>
          Register Account
        </Button>
      </form>
    </div>
  );
}
