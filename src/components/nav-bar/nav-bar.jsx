import './nav-bar.css';

import { React, useEffect, useState } from 'react';

import { setTheme } from '../../contexts/settings/settings';

import Toggle from '../toggle/toggle';
import { UserDropdown } from '../user-dropdown/user-dropdown';

export const NavBar = (props) => {
  const [newTheme, setNewTheme] = useState('dark');
  
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setNewTheme(currentTheme);
  }, []);

  useEffect(() => {
    setTheme(newTheme);
  }, [newTheme]);

  const toggleTheme = (e) => {
    const newTheme = e.target.checked ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setNewTheme(newTheme);
  }

  return (
    <div className='nav-bar'> 
      <h4> Home Aut </h4>
        <div className='row'>
          <Toggle onchange={(e) => toggleTheme(e)} />
          <UserDropdown openAddModal={props.openAddModal} displayName={props.displayName} />
        </div>
    </div>
  );
};