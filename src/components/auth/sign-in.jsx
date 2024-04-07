import './sign-in.css';
import { useEffect, useState } from 'react';

import { Button } from '../button/button';

import { signIn } from '../../config/auth';
import { useAuth } from '../../contexts/auth/auth';
import { useNavigate } from 'react-router-dom';

export const SignInWindow = (props) => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    loggedIn && navigate('/panel');
  }, [loggedIn]);

  const logIn = async () => {
    if (!signingIn) {
      setSigningIn(true);
      await signIn(email, password)
      .catch(() => setErrorMessage("Incorrect email or password."))
      .finally(() => setSigningIn(false));
    }
  };

  useEffect(() => {
    props.setToastMessage(errorMessage);
  }, [errorMessage]);

  return (
    <div className='auth'>
      <h2>Home Aut</h2>
      <h4> Sign in to access the panel </h4>
      <input placeholder="Email" enterKeyHint='enter'
        onChange={ (e) => {setEmail(e.target.value)} }
        onKeyUp={ (e) => e.key == 'Enter' && logIn() }
      ></input>
      <input placeholder="Password" type="password" enterKeyHint='enter'
        onChange={ (e) => {setPassword(e.target.value)} }
        onKeyUp={ (e) => e.key == 'Enter' && logIn() }
      ></input>
      <Button onclick={ logIn } text="Sign in" className="nav-button center" />
    </div>
  );
};