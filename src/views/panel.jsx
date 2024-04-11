import '../App.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';
import { useEffect, useLayoutEffect, useState } from 'react';

import { NavBar } from '../components/nav-bar/nav-bar';
import { TogglePanel } from '../components/toggle-panel/toggle-panel';
import { MessagePanel } from '../components/message-panel/message-panel';
import { UsageChart } from '../components/charts/usage-chart';
import { Pad } from '../components/Pad/Pad';

const Panel = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    !isLoggedIn && navigate('/sign-in');
  }, [isLoggedIn]);

  useLayoutEffect(() => {
    document.title = 'Panel';
  });

  return (
    <div className="App">
      <NavBar
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <Pad options={{panel: 'flex-max small', container: 'center'}} content={
        <>
          {user && <h1>{`${user.displayName}${user.displayName && `${user.displayName.charAt(user.displayName.length - 1) == 's' ? `\'` : `\'s`}`} Panel`}</h1>}
        </>
      } />
      <UsageChart title="Usage in the last 7 days" />
      <TogglePanel title="ESP8266" /> 
      <MessagePanel title="Logs" />
      <Pad options={{panel: 'flex-max small'}} />
    </div>
  );
}

export default Panel;