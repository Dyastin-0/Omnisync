import '../App.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';
import { useEffect, useLayoutEffect, useState } from 'react';

import { Button } from '../components/button/button';
import { NavBar } from '../components/nav-bar/nav-bar';
import { TogglePanel } from '../components/toggle-panel/toggle-panel';
import { MessagePanel } from '../components/message-panel/message-panel';
import { UsageChart } from '../components/charts/usage-chart';
import { Pad } from '../components/Pad/Pad';
import { Insight } from '../components/insight/insight';

const Dashboard = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  useEffect(() => {
    !isLoggedIn && navigate('/sign-in');
  }, [isLoggedIn, navigate]);

  useLayoutEffect(() => {
    document.title = `Omnisync/${ user && user.displayName}`;
  });

  return (
    <div className="App">
      <NavBar
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <Pad options={{panel: 'flex-max small', container: 'center'}} content={
        <>
          {user && user.displayName && <h2>{`${user.displayName}${user.displayName && `${user.displayName.charAt(user.displayName.length - 1) === 's' ? `'` : `'s`}`} Dashboard`}</h2>}
        </>
      } />
      <UsageChart title="Usage in the last 7 days" />
      <Insight title="Insights" />
      <TogglePanel title="Devices" /> 
      <MessagePanel title="Logs" />
      <Pad options={{panel: 'flex-max small'}} />
    </div>
  );
}

export default Dashboard;