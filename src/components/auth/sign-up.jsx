import './auth.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUp, updateUser, /*signInWithGoogle*/} from '../../config/auth';

import { Button } from '../button/button';
import { useAuth } from '../../contexts/auth/auth';

export const SignUpWindow = (props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const setToast = props.setToastMessage;

  useEffect(() => {
    isLoggedIn && navigate('/panel');
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setToast('Creating your account...');
  }, [signingUp, setToast]);

  useEffect(() => {
    setToast(errorMessage);
  }, [errorMessage, setToast]);

  const create = async () => {
    if (!email || !password || !email || !confirmedPassword) {
      setSigningUp(false);
      setErrorMessage("There's an empty field.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if ((confirmedPassword !== password)) {
      setSigningUp(false);
      setErrorMessage("Password does not match.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (password.length < 6) {
      setSigningUp(false);
      setErrorMessage("Password must be greater than 6 characters.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }
    if (!signingUp) {
      setSigningUp(true);
      const result = await signUp(email, password)
        .catch(() => {
          setErrorMessage('Sign up failed. Your email might be used or in a incorrect format.');
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
  }

  // const logInWithGoogle = async () => {
  //   if (!signingUp) {
  //     setSigningUp(true);
  //     await signInWithGoogle();
  //     props.setToastMessage("Signing in...");
  //   }
  // }

  return (
    <div className='auth'>
      <h2>Home Aut Micro</h2>
      <h5>Create an account and start <br /> setting up your own <br /> dashboard</h5>
      <input placeholder="Email" enterKeyHint='Enter'
        onChange={(e) => {setEmail(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      <input placeholder="Password" type="password" enterKeyHint='Enter'
        onChange={(e) => {setPassword(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      <input placeholder="Password" type="password" enterKeyHint='Enter'
        onChange={(e) => {setConfirmedPassword(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      <input placeholder="Display name" enterKeyHint='Enter'
        onChange={(e) => {setDisplayName(e.target.value)}}
        onKeyUp={(e) => e.key === 'Enter' && create()}
      ></input>
      <Button onclick={create} text="Sign up" icon={<i className="fa-solid fa-user-plus"></i>} className="nav-button center" />
      {/* <h6>or sign up with</h6> */}
      {/* <Button onclick={logInWithGoogle}  text="Google" icon={<i className="fa-brands fa-google"></i>} className="nav-button center" /> */}
      <div className="row">
        <p>Already have an account?</p>
        <a href="/sign-in">Sign in</a>
      </div>
    </div>
  );
}