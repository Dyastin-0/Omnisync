import { useLayoutEffect, useState } from 'react';
import '../App.css';

import { SignInWindow } from '../components/auth/sign-in';
import { NavBar } from '../components/nav-bar/nav-bar';
import { ToastMessage } from '../components/modals/toast-message/toast-message'

const SignIn = () => {
  const [toastMessage, setToastMessage] = useState(null);

  useLayoutEffect(() => {
    document.title = 'Sign in';
  });

  return (
    <div className="App">
      <NavBar />
      <SignInWindow setToastMessage={setToastMessage} />
      <ToastMessage message={toastMessage} setToastMessage={setToastMessage} />
    </div>
  );
}

export default SignIn;