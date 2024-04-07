import '../App.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';
import { useEffect, useState } from 'react';

import { NavBar } from '../components/nav-bar/nav-bar';
import { TogglePanel } from '../components/toggle-panel/toggle-panel';
import { MessagePanel } from '../components/message-panel/message-panel';
import { ToastMessage } from '../components/toast-message/toast-message';
import { AddToggleModal } from '../components/add-toggle/add-toggle';
import { ConfirmDialogModal } from '../components/confirm-dialog/confirm-dialog';

const Panel = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const { user } = useAuth();

  const [isAddToggleModalOpen, setIsAddToggleModalOpen] = useState(false);

  const [confirmEvent, setConfirmEvent] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState('Welcome!');

  const closeAddToggleModal = () => setIsAddToggleModalOpen(false);
  const openAddToggleModal = () => setIsAddToggleModalOpen(true);

  useEffect(() => {
    !loggedIn && navigate('/sign-in');
  }, [loggedIn]);

  return (
    <div className="App">
      {loggedIn && <NavBar 
        openAddModal={openAddToggleModal} 
        displayName={user.displayName}
      /> }
      { loggedIn && <TogglePanel tittle="ESP8266" /> }
      { loggedIn && <MessagePanel tittle="Logs" /> }
      { loggedIn && 
        <AddToggleModal 
          active={ isAddToggleModalOpen } 
          closeModal={ closeAddToggleModal }
          setToastMessage={ setToastMessage }
          displayName={ user.displayName }
          setConfirmEvent={ setConfirmEvent }
          setConfirmMessage= { setConfirmMessage }
      /> }
      { loggedIn && 
        <ConfirmDialogModal
          setToastMessage={ setToastMessage }
          event={ confirmEvent }
          message={ confirmMessage }
      /> }
      <ToastMessage message={ toastMessage } setToastMessage={setToastMessage} />
    </div>
  );
}

export default Panel;