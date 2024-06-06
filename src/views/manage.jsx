import '../App.css';

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';

import { NavBar } from '../components/nav-bar/nav-bar';

import { Pad } from '../components/Pad/Pad'
import { AddPanel } from '../components/manage/add-panel';

const Manage = () => {
  const [confirmEvent, setConfirmEvent] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    !isLoggedIn && navigate('/sign-in');
  }, [isLoggedIn]);

  return (
    <div className='App'>
      <NavBar
        confirmMessage={confirmMessage}
        confirmEvent={confirmEvent}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <Pad
        options={{panel: 'fex-max small', container: 'center'}}
        content={
          <h1>Manage your toggles</h1>
        } 
      />
      <AddPanel
        setToastMessage={setToastMessage}
        setConfirmEvent={setConfirmEvent}
        setConfirmMessage={setConfirmMessage}
      />
    </div>
  );
};

export default Manage;