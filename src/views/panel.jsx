import '../App.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';
import { useEffect, useLayoutEffect, useState } from 'react';

import { NavBar } from '../components/nav-bar/nav-bar';
import { TogglePanel } from '../components/toggle-panel/toggle-panel';
import { MessagePanel } from '../components/message-panel/message-panel';
import { ToastMessage } from '../components/modals/toast-message/toast-message';
import { AddToggleModal } from '../components/modals/add-toggle/add-toggle';
import { ConfirmDialogModal } from '../components/modals/confirm-dialog/confirm-dialog';
import { UserProfile } from '../components/modals/profile/profile';
import { UsageChart } from '../components/charts/usage-chart';
import { Pad } from '../components/Pad/Pad';

const Panel = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userDataPath, user } = useAuth();

  const [isAddToggleModalOpen, setIsAddToggleModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const [confirmEvent, setConfirmEvent] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState('Welcome!');

  const closeAddToggleModal = () => setIsAddToggleModalOpen(false);
  const openAddToggleModal = () => setIsAddToggleModalOpen(true);

  const closeUserProfile = () => setIsUserProfileOpen(false);
  const openUserProfile = () => setIsUserProfileOpen(true);

  useEffect(() => {
    !isLoggedIn && navigate('/sign-in');
  }, [isLoggedIn]);

  useLayoutEffect(() => {
    document.title = 'Panel';
  });

  return (
    <div className="App">
      <NavBar 
        openAddModal={openAddToggleModal}
        openUserProfile={openUserProfile}
      /> 
      <Pad options={{panel: 'flex-max small', container: 'center'}} content={
        <>
          {user && <h1>{`${user.displayName}${user.displayName.charAt(user.displayName.length - 1) === 's' ? '\'' : '\'s'} Panel`}</h1>}
        </>
      } />
      <UsageChart title="Usage in the last 7 days" />
      <TogglePanel buttonEvent={openAddToggleModal} title="ESP8266" /> 
      <MessagePanel title="Logs" />
      <Pad options={{panel: 'flex-max small'}} />
      <AddToggleModal 
        active={isAddToggleModalOpen} 
        closeModal={ closeAddToggleModal}
        setToastMessage={setToastMessage}
        setConfirmEvent={setConfirmEvent}
        setConfirmMessage={setConfirmMessage}
        path={userDataPath}
      /> 
      <ConfirmDialogModal
        setToastMessage={setToastMessage}
        event={confirmEvent}
        message={confirmMessage}
      /> 
      <ToastMessage message={toastMessage} setToastMessage={setToastMessage} />
      {isLoggedIn && <UserProfile 
        active={isUserProfileOpen}
        closeModal={closeUserProfile}
      />}
    </div>
  );
}

export default Panel;