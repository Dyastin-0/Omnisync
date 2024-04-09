import '../App.css';

import { useState } from 'react';

import { NavBar } from "../components/nav-bar/nav-bar";
import { SignUpWindow } from '../components/auth/sign-up';
import { ToastMessage } from '../components/toast-message/toast-message';

const SignUp = () => {
  const [toastMessage, setToastMessage] = useState(null);
  return (
    <div className='App'>
      <NavBar />
      <SignUpWindow setToastMessage={setToastMessage}  />
      <ToastMessage message={toastMessage} setToastMessage={setToastMessage} />
    </div>
  );
};

export default SignUp;