import '../App.css';

import { useLayoutEffect } from 'react';
import { SignUpWindow } from '../components/auth/sign-up';

const SignUp = ({setToastMessage}) => {

  useLayoutEffect(() => {
    document.title = 'Sign up';
  });

  return (
    <div className='App'>
      <SignUpWindow setToastMessage={setToastMessage}  />
    </div>
  );
};

export default SignUp;