import './nav-bar.css';

import { React, useEffect, useRef } from 'react';

import Toggle from '../toggle/toggle';
import { UserDropdown } from '../user-dropdown/user-dropdown';
import { Button } from '../button/button';

import { useSettings } from '../../contexts/settings/settings';

export const NavBar = (props) => {
  const { theme, toggleTheme } = useSettings();
  const themeToggleRef = useRef(null);
  
  useEffect(() => {
    themeToggleRef.current.checked = theme == 'light' ? true : false;
  }, [theme]);

  return (
    <div className='nav-bar'> 
      <h4>Home Aut Micro</h4>
        <div className='row'>
          <Button onclick={props.openGuideModal} className='nav-button' icon={<i className="fa-regular fa-circle-question fa-lg"></i>}></Button>
          <Toggle ref={themeToggleRef} onchange={toggleTheme} />
          <UserDropdown openAddModal={props.openAddModal} />
        </div>
    </div>
  );
};