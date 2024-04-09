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
import { GuideModal } from '../components/guide-modal/guide-modal';

const Panel = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [isAddToggleModalOpen, setIsAddToggleModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const [confirmEvent, setConfirmEvent] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState('Welcome!');

  const closeAddToggleModal = () => setIsAddToggleModalOpen(false);
  const openAddToggleModal = () => setIsAddToggleModalOpen(true);

  const closeGuideModal = () => setIsGuideModalOpen(false);
  const openGuideModal = () => setIsGuideModalOpen(true);

  useEffect(() => {
    !isLoggedIn && navigate('/sign-in');
  }, [isLoggedIn]);

  return (
    <div className="App">
      <NavBar 
        openAddModal={openAddToggleModal}
        openGuideModal={openGuideModal}
      /> 
       <TogglePanel tittle="ESP8266" /> 
       <MessagePanel tittle="Logs" />
      <AddToggleModal 
        active={isAddToggleModalOpen} 
        closeModal={ closeAddToggleModal}
        setToastMessage={setToastMessage}
        setConfirmEvent={setConfirmEvent}
        setConfirmMessage= {setConfirmMessage}
      /> 
      <ConfirmDialogModal
        setToastMessage={setToastMessage}
        event={confirmEvent}
        message={confirmMessage}
      /> 
      <ToastMessage message={toastMessage} setToastMessage={setToastMessage} />
      <GuideModal
        active={isGuideModalOpen}
        closeModal={closeGuideModal}
      />
    </div>
  );
}

export default Panel;