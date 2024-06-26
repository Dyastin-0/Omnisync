import './auth.css';
import { useEffect, useState } from 'react';

import { Button } from '../button/button';

import { signIn, signInWithGoogle } from '../../config/auth';
import { useAuth } from '../../contexts/auth/auth';
import { useNavigate } from 'react-router-dom';

export const SignInWindow = ({setToastMessage}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const setToast = setToastMessage;

  useEffect(() => {
    isLoggedIn && navigate('/dashboard');
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setToast('Signing in...');
  }, [signingIn, setToast]);

  useEffect(() => {
    setToast(errorMessage);
  }, [errorMessage, setToast]);

  const logIn = async () => {
    if (!email || !password) {
      setSigningIn(false);
      setErrorMessage("There's an empty field.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (!signingIn) {
      setSigningIn(true);
      await signIn(email, password)
      .catch(() => setErrorMessage("Incorrect email or password."))
      .finally(() => {
        setSigningIn(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
    }
  };

  const logInWithGoogle = async () => {
    if (!signingIn) {
      setSigningIn(true);
      await signInWithGoogle();
      setToast("Signing in...");
    }
  }

  return (
    <div className='auth'>
      <h2>Omnisync</h2>
      <h4> Sign in to access your dashboard </h4>
      <input placeholder="Email" enterKeyHint='Enter' required
        onChange={(e) => {setEmail(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && logIn()}
      ></input>
      <input placeholder="Password" type="password" enterKeyHint='Enter' required
        onChange={(e) => {setPassword(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && logIn()}
      ></input>
      <Button onclick={logIn} text="Sign in" icon={<i className="fa-solid fa-right-to-bracket"></i>} className="nav-button center" />
      { <h6>or continue with</h6> }
      <Button onclick={logInWithGoogle}  text="Google" icon={<i className="fa-brands fa-google"></i>} className="nav-button center" />
      <div className="row">
        <p>Don't have an account?</p>
        <Button onclick={() => navigate('/sign-up')} text='Sign up' className='nav-button link' />
      </div>
    </div>
  );
};