//Module Imports
import React from 'react';
import { useFormFields } from '../../libs/hooksLib';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import './SignUp.css';

export default function SignUp(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () =>
    fields.email.length &&
    fields.username.length &&
    fields.password.length &&
    fields.confirmPassword.length > 0;

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <div className='SignUp'>
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
            type='text'
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId='confirmPassword' size='large'>
          <FormLabel>Confirm password</FormLabel>
          <FormControl
            autoFocus
            type='text'
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <Button block size='large' disabled={!validateForm()}>
          Register Account
        </Button>
      </form>
    </div>
  );
}
