import './sign-in.css';
import { useEffect, useState } from 'react';

import { Button } from '../button/button';

import { signIn } from '../../config/auth';
import { useAuth } from '../../contexts/auth/auth';
import { useNavigate } from 'react-router-dom';

export const SignInWindow = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loggedIn && navigate('/panel');
  }, [loggedIn]);

  const onClick = async () => {
    if (!signingIn) {
      setSigningIn(true);
      await signIn(email, password).catch((error) => console.error(error))
    }
  };

  return (
    <div className='auth'>
      <h2>Home Aut</h2>
      <h4> Sign in to access the panel </h4>
      <input placeholder="Email"
        onChange={(e) => {setEmail(e.target.value)}}
      ></input>
      <input placeholder="Password" type="password"
        onChange={(e) => {setPassword(e.target.value)}}
      ></input>
      <Button onclick={onClick} text="Sign in" className="nav-button center" />
    </div>
  );
};