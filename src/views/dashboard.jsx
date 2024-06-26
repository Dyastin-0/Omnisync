import '../App.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';
import { useEffect, useLayoutEffect, useState } from 'react';

import { NavBar } from '../components/nav-bar/nav-bar';
import { DevicePanel } from '../components/device/device-panel';
import { MessagePanel } from '../components/log/log-panel';
import { UsageChart } from '../components/insight/charts/usage-chart';
import { Pad } from '../components/Pad/Pad';
import { Insight } from '../components/insight/trend';

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
      <UsageChart />
      <Insight />
      <DevicePanel /> 
      <MessagePanel />
      <Pad options={{panel: 'flex-max small'}} />
    </div>
  );
}

export default Dashboard;