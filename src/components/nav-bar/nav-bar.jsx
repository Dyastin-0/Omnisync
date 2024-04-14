import './nav-bar.css';

import { React, useEffect, useRef, useState } from 'react';

import Toggle from '../toggle/toggle';
import { UserDropdown } from '../user-dropdown/user-dropdown';
import { Button } from '../button/button';
import { HelpModal } from '../modals/help/help';
import { UserProfile } from '../modals/profile/profile';
import { ToastMessage } from '../modals/toast-message/toast-message';
import { ConfirmDialogModal } from '../modals/confirm-dialog/confirm-dialog'

import { useSettings } from '../../contexts/settings/settings';
import { InfoModal } from '../modals/info/info';
import { useAuth } from '../../contexts/auth/auth';
import { SettingsModal } from '../modals/settings/settings-modal';

export const NavBar = (props) => {
  const { isLoggedIn } = useAuth();
  const [isHelpClicked, setIsHelpClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleHelpClick = () => {
    localStorage.setItem('isHelpClicked', true);
    setIsHelpClicked(true);
  };
  const closeHelpModal = () => setIsHelpModalOpen(false);
  const openHelpModal = () => {
    setIsHelpModalOpen(true);
    handleHelpClick();
  };
  useEffect(() => {
    setIsHelpClicked(localStorage.getItem('isHelpClicked'));
  }, []);

  const handleInfoClick = () => {
    localStorage.setItem('isInfoClicked', true);
    setIsInfoClicked(true);
  };
  const closeInfoModal = () => setIsInfoModalOpen(false);
  const openInfoModal = () => {
    setIsInfoModalOpen(true);
    handleInfoClick();
  };
  useEffect(() => {
    setIsInfoClicked(localStorage.getItem('isInfoClicked'));
  }, []);

  const closeUserProfile = () => setIsUserProfileOpen(false);
  const openUserProfile = () => setIsUserProfileOpen(true);

  const closeSettings = () => setIsSettingsModalOpen(false);
  const openSettings = () => setIsSettingsModalOpen(true);

  return (
    <div className='nav-bar'> 
      <i className="fa-solid fa-toggle-on fa-2x"></i>
        <div className='row'>
          <div className='row no-gap'>
            <Button className='nav-button round'
              onclick={openInfoModal}
              icon={<i className={`fa-solid fa-circle-info fa-xl ${!isInfoClicked && `fa-bounce`}`}></i>}
            />
            <Button className='nav-button round'
              onclick={openHelpModal}
              icon={<i className={`fa-solid fa-circle-question fa-xl ${!isHelpClicked && `fa-bounce`}`}></i>} 
            />
          </div>

          <UserDropdown 
            openSettings={openSettings}
            openUserProfile={openUserProfile}
          />
        </div>
        <HelpModal
          active={isHelpModalOpen}
          closeModal={closeHelpModal}
        />
        <InfoModal 
          active={isInfoModalOpen}
          closeModal={closeInfoModal}
        />
        {isLoggedIn && <UserProfile 
          active={isUserProfileOpen}
          closeModal={closeUserProfile}
        />}
        <ConfirmDialogModal
          active={props.isComfirmModalOpen}
          closeModal={() => false}
          setToastMessage={props.setToastMessage}
          event={props.confirmEvent}
          message={props.confirmMessage}
        /> 
      <ToastMessage
        message={props.toastMessage}
        setToastMessage={props.setToastMessage}
      />
      <SettingsModal
        active={isSettingsModalOpen}
        closeModal={closeSettings}
      />
    </div>
  );
};