import { useLayoutEffect, useState } from 'react';
import '../App.css';

import { SignInWindow } from '../components/auth/sign-in';
import { NavBar } from '../components/nav-bar/nav-bar';

const SignIn = () => {
  const [toastMessage, setToastMessage] = useState(null);

  useLayoutEffect(() => {
    document.title = 'Sign in';
  });

  return (
    <div className="App">
      <NavBar
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <SignInWindow setToastMessage={setToastMessage} />
    </div>
  );
}

export default SignIn;