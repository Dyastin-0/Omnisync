import '../App.css';

import { useLayoutEffect, useState } from 'react';

import { NavBar } from "../components/nav-bar/nav-bar";
import { SignUpWindow } from '../components/auth/sign-up';

const SignUp = () => {
  const [toastMessage, setToastMessage] = useState(null);

  useLayoutEffect(() => {
    document.title = 'Sign up';
  });

  return (
    <div className='App'>
      <NavBar
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <SignUpWindow setToastMessage={setToastMessage}  />
    </div>
  );
};

export default SignUp;