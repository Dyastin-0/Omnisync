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
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();

  const [isAddToggleModalOpen, setIsAddToggleModalOpen] = useState(false);

  const [confirmEvent, setConfirmEvent] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState('Welcome!');

  const closeAddToggleModal = () => setIsAddToggleModalOpen(false);
  const openAddToggleModal = () => setIsAddToggleModalOpen(true);

  useEffect(() => {
    !isLoggedIn && navigate('/sign-in');
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn && <NavBar 
        openAddModal={openAddToggleModal} 
        displayName={user.displayName}
      /> }
      { isLoggedIn && <TogglePanel tittle="ESP8266" /> }
      { isLoggedIn && <MessagePanel tittle="Logs" /> }
      { isLoggedIn && 
        <AddToggleModal 
          active={ isAddToggleModalOpen } 
          closeModal={ closeAddToggleModal }
          setToastMessage={ setToastMessage }
          displayName={ user.displayName }
          setConfirmEvent={ setConfirmEvent }
          setConfirmMessage= { setConfirmMessage }
      /> }
      { isLoggedIn && 
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