import React from 'react';
import { useFormFields } from '../../libs/hooksLib';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import './Login.css';

export default function Login(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });

  const validateForm = () => fields.email.length && fields.password.length > 0;

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className='Login'>
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
        <FormGroup controlId='password' size='large'>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={fields.password}
            onChange={handleFieldChange}
            type='password'
          />
        </FormGroup>
        <Button block size='large' disabled={!validateForm()} type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
}
