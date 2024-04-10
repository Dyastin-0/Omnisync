import './nav-bar.css';

import { React, useEffect, useRef, useState } from 'react';

import Toggle from '../toggle/toggle';
import { UserDropdown } from '../user-dropdown/user-dropdown';
import { Button } from '../button/button';
import { HelpModal } from '../modals/help/help';

import { useSettings } from '../../contexts/settings/settings';
import { InfoModal } from '../modals/info/info';

export const NavBar = (props) => {
  const [isHelpClicked, setIsHelpClicked] = useState(false);
  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const { theme, toggleTheme } = useSettings();
  const themeToggleRef = useRef(null);
  useEffect(() => {
    themeToggleRef.current.checked = theme == 'light' ? true : false;
  }, [theme]);

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

  return (
    <div className='nav-bar'> 
      <h4>Home Aut Micro</h4>
        <div className='row'>
          <Button className='nav-button'
            onclick={openInfoModal}
            icon={<i className={`fa-solid fa-circle-info fa-xl ${!isInfoClicked && `fa-shake`}`}></i>}
          />
          <Button className='nav-button' 
            onclick={openHelpModal}
            icon={<i className={`fa-solid fa-circle-question fa-xl ${!isHelpClicked && `fa-shake`}`}></i>} 
          />
          <Toggle ref={themeToggleRef} onchange={toggleTheme} />
          <UserDropdown 
            openAddModal={props.openAddModal}
            openUserProfile={props.openUserProfile}
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
    </div>
  );
};