import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { UserContext } from '../App/UserProvider';
import { useFormFields } from '../../libs/hooksLib';
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import './Login.css';

export default function Login(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });

  const [reDirect, handleReDirect] = useState(false);

  const [user, setUser] = useContext(UserContext);

  const validateForm = () => fields.email.length && fields.password.length > 0;

  const login = e => {
    e.preventDefault();
    const credentials = {
      email: fields.email,
      password: fields.password
    };

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const loginData = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(credentials)
    };
    fetch('http://localhost:8080/api/login', loginData)
      .then(response => response.json())
      .then(
        data => {
          console.log(data);
          if (data.success === true) {
            setUser(data.user);
            handleReDirect(true);
          } else {
            console.log('test');
          }
        },
        error => {
          alert('You shall not pass');
        }
      );
  };
  const redirect = () => {
    if (reDirect === true) {
      return <Redirect to='/home' />;
    }
  };
  return (
    <Container>
      <Row>
        <Col id='loginWelcome'></Col>
        <Col>
          <div className='Login'>
            {redirect()}
            <form onSubmit={login}>
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
              <Button
                block
                size='large'
                disabled={!validateForm()}
                type='submit'
              >
                Login
              </Button>
            </form>
            <div className='toRegister'>
              <p>Don't have an account yet ?</p>
              <Link to='/register'>Click here to register</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
