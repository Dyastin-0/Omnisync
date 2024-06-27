import { useLayoutEffect } from 'react';
import '../App.css';

import { SignInWindow } from '../components/auth/sign-in';

const SignIn = ({setToastMessage}) => {

  useLayoutEffect(() => {
    document.title = 'Sign in';
  });

  return (
    <div className="App">
      <SignInWindow setToastMessage={setToastMessage} />
    </div>
  );
}

export default SignIn;