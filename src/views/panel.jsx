import '../App.css';

import { NavBar } from '../components/nav-bar/nav-bar';
import { TogglePanel } from '../components/toggle-panel/toggle-panel';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';
import { useEffect } from 'react';
import { MessagePanel } from '../components/message-panel/message-panel';

const Panel = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const { user } = useAuth();
  
  useEffect(() => {
    !loggedIn && navigate('/sign-in');
  }, [loggedIn]);

  return (
    <div className="App">
      { loggedIn && <NavBar displayName={user.displayName} /> }
      { loggedIn && <TogglePanel tittle="ESP8266" /> }
      { loggedIn &&  <MessagePanel tittle="Logs" /> }
    </div>
  );
}

export default Panel;