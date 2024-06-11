import './nav-bar.css';

import { React, useEffect, useState } from 'react';

import { UserDropdown } from '../user-dropdown/user-dropdown';
import { Button } from '../button/button';
import { HelpModal } from '../modals/help/help';
import { UserProfile } from '../modals/profile/profile';
import { ToastMessage } from '../modals/toast-message/toast-message';
import { ConfirmDialogModal } from '../modals/confirm-dialog/confirm-dialog'

import { InfoModal } from '../modals/info/info';
import { useAuth } from '../../contexts/auth/auth';
import { SettingsModal } from '../modals/settings/settings-modal';
import { AccountLinking } from '../modals/account-linking/account-linking';

export const NavBar = (props) => {
  const { isLoggedIn, isLinked } = useAuth();
  const [isHelpClicked, setIsHelpClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAccountLinkingOpen, setIsAccountLinkingOpen] = useState(false);
  const [accountLinkReminder, setAccountLinkReminder] = useState(0);

  const closeAccountLinking = () => {
    setIsAccountLinkingOpen(false);
  };

  const setLinkReminder = () => {
    const currentDate = new Date().getTime();
    const reminder = currentDate + (2 * 60 * 60 * 1000);
    localStorage.setItem('accountLinkReminder', String(reminder));
    setIsAccountLinkingOpen(false);
  }

  useEffect(() => {
    const reminder = localStorage.getItem('accountLinkReminder');
    reminder && setAccountLinkReminder(parseInt(reminder));
  }, []);

  useEffect(() => {
    setIsAccountLinkingOpen(!isLinked);
  }, [isLinked, setIsAccountLinkingOpen]);

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
        {isLoggedIn && <SettingsModal
          active={isSettingsModalOpen}
          closeModal={closeSettings}
        />}
        {!(new Date().getTime() < accountLinkReminder) && isLoggedIn && !isLinked 
            && <AccountLinking
          closeModal={closeAccountLinking}
          setToastMessage={props.setToastMessage}
          active={isAccountLinkingOpen}
        />}
    </div>
  );
};