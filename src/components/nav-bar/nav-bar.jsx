import './nav-bar.css';

import { React, useEffect, useRef } from 'react';

import Toggle from '../toggle/toggle';
import { UserDropdown } from '../user-dropdown/user-dropdown';
import { useSettings } from '../../contexts/settings/settings';

export const NavBar = (props) => {
  const { theme, toggleTheme } = useSettings();
  const themeToggleRef = useRef(null);
  
  useEffect(() => {
    themeToggleRef.current.checked = theme == 'light' ? true : false;
  }, [theme]);

  return (
    <div className='nav-bar'> 
      <h4> Home Aut </h4>
        <div className='row'>
          <Toggle ref={themeToggleRef} onchange={toggleTheme} />
          <UserDropdown openAddModal={props.openAddModal} displayName={props.displayName} />
        </div>
    </div>
  );
};