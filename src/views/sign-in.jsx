import '../App.css';
import { SignInWindow } from '../components/auth/sign-in';
import { NavBar } from '../components/nav-bar/nav-bar';

const SignIn = () => {
  
  return (
    <div className="App">
      <NavBar />
      <SignInWindow />
    </div>
  );
}

export default SignIn;