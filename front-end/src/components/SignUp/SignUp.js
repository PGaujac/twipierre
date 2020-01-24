//Module Imports
import React, { useState } from 'react';
import { useFormFields } from '../../libs/hooksLib';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './SignUp.css';
import { Redirect } from 'react-router-dom';

export default function SignUp(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [reDirect, handleReDirect] = useState(false);

  const validateForm = () =>
    fields.email.length &&
    fields.username.length &&
    fields.password.length &&
    fields.confirmPassword.length > 0;

  const handleSubmit = e => {
    if (fields.password === fields.confirmPassword) {
      e.preventDefault();
      const headers = new Headers({
        'Content-Type': 'application/json'
      });

      const data = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(fields)
      };
      fetch('http://localhost:8080/api/register', data)
        .then(response => response.json())
        .then(data => {
          if (data === true) {
            handleReDirect(true);
          } else {
            console.log(data);
            alert(data.message);
          }
        });
    } else {
      alert('Passwords do not match');
    }
  };

  const redirect = () => {
    if (reDirect === true) {
      return <Redirect to='/login' />;
    }
  };

  return (
    <div className='SignUp'>
      {redirect()}

      <form onSubmit={handleSubmit}>
        <FormGroup controlId='email' size='large'>
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='username' size='large'>
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type='text'
            value={fields.username}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='password' size='large'>
          <FormLabel>Password</FormLabel>
          <FormControl
            autoFocus
            type='password'
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='confirmPassword' size='large'>
          <FormLabel> Confirm password</FormLabel>
          <FormControl
            autoFocus
            type='password'
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <Button type='submit' block size='large' disabled={!validateForm()}>
          Register
        </Button>
      </form>
    </div>
  );
}
