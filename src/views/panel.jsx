import '../App.css';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth/auth';
import { useEffect, useState } from 'react';

import { NavBar } from '../components/nav-bar/nav-bar';
import { TogglePanel } from '../components/toggle-panel/toggle-panel';
import { MessagePanel } from '../components/message-panel/message-panel';
import { ToastMessage } from '../components/modals/toast-message/toast-message';
import { AddToggleModal } from '../components/modals/add-toggle/add-toggle';
import { ConfirmDialogModal } from '../components/modals/confirm-dialog/confirm-dialog';
import { GuideModal } from '../components/modals/guide/guide';
import { UserProfile } from '../components/modals/profile/profile';

const Panel = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userDataPath } = useAuth();

  const [isAddToggleModalOpen, setIsAddToggleModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const [confirmEvent, setConfirmEvent] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState('Welcome!');

  const closeAddToggleModal = () => setIsAddToggleModalOpen(false);
  const openAddToggleModal = () => setIsAddToggleModalOpen(true);

  const closeGuideModal = () => setIsGuideModalOpen(false);
  const openGuideModal = () => setIsGuideModalOpen(true);

  const closeUserProfile = () => setIsUserProfileOpen(false);
  const openUserProfile = () => setIsUserProfileOpen(true);

  useEffect(() => {
    !isLoggedIn && navigate('/sign-in');
  }, [isLoggedIn]);

  return (
    <div className="App">
      <NavBar 
        openAddModal={openAddToggleModal}
        openGuideModal={openGuideModal}
        openUserProfile={openUserProfile}
      /> 
       <TogglePanel tittle="ESP8266" /> 
       <MessagePanel tittle="Logs" />
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
      <GuideModal
        active={isGuideModalOpen}
        closeModal={closeGuideModal}
      />
      <UserProfile 
        active={isUserProfileOpen}
        closeModal={closeUserProfile}
      />
    </div>
  );
}

export default Panel;