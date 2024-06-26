import './auth.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUp, updateUser, signInWithGoogle } from '../../config/auth';

import { Button } from '../button/button';
import { useAuth } from '../../contexts/auth/auth';

import { evaluatePasswordStrength } from '../../utils/passwordMeter';

export const SignUpWindow = ({setToastMessage}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({strength: 0, color: 'red', text: 'Very weak'});

  const setToast = setToastMessage;

  useEffect(() => {
    isLoggedIn && navigate('/dashboard');
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    signingUp && setToast('Creating your account...');
  }, [signingUp, setToast]);

  useEffect(() => {
    setToast(errorMessage);
  }, [errorMessage, setToast]);

  useEffect(() => {
    password && setPasswordStrength(evaluatePasswordStrength(password));
  }, [password]);

  const create = async () => {
    if (!email || !password || !confirmedPassword || !displayName) {
      setSigningUp(false);
      setErrorMessage("There's an empty field.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (confirmedPassword !== password) {
      setSigningUp(false);
      setErrorMessage("Passwords do not match.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (password.length < 7) {
      setSigningUp(false);
      setErrorMessage("Password must be greater than 7 characters.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (!signingUp) {
      setSigningUp(true);
      const result = await signUp(email, password)
        .catch(() => {
          setErrorMessage('Sign up failed. Your email might be used or in incorrect format.');
        })
        .finally(() => {
          setSigningUp(false);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
      await updateUser(result.user, {
        displayName: displayName
      });
    }
  };

  const logInWithGoogle = async () => {
    if (!signingUp) {
      setSigningUp(true);
      await signInWithGoogle();
      setToast("Signing in...");
    }
  };

  return (
    <div className='auth'>
      <h2>Omnisync</h2>
      <h4>Create an account and start <br /> setting up your own <br /> dashboard</h4>
      <p>Make sure to use an active email</p>
      <input placeholder="Email" enterKeyHint='Enter' required
        onChange={(e) => {setEmail(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      <input placeholder="Password" type="password" enterKeyHint='Enter' required
        onChange={(e) => {setPassword(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      { password && <div className="password-strength-container">
        <progress className={`${'password-strength ' + passwordStrength.color}`} value={passwordStrength.strength} max="100"></progress>
        <h6 className='right'>{passwordStrength.text}</h6>
      </div>}
      <input placeholder="Confirm Password" type="password" enterKeyHint='Enter' required
        onChange={(e) => {setConfirmedPassword(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      <input placeholder="Display name" enterKeyHint='Enter'
        onChange={(e) => {setDisplayName(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      <Button onclick={create} text="Sign up" icon={<i className="fa-solid fa-user-plus"></i>} className="nav-button center" />
      { <h6>or continue with</h6> }
      { <Button onclick={logInWithGoogle}  text="Google" icon={<i className="fa-brands fa-google"></i>} className="nav-button center" /> }
      <div className="row">
        <p>Already have an account?</p>
        <Button onclick={() => navigate('/sign-in')} text='Sign in' className='nav-button link' />
      </div>
    </div>
  );
};