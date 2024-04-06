import './nav-bar.css';

import { React } from 'react';

import Toggle from '../toggle/toggle';
import { UserDropdown } from '../user-dropdown/user-dropdown';

export const NavBar = (props) => {

  return (
    <div className='nav-bar'> 
      <h4> Home Aut </h4>
        <div className='row'>
          <Toggle />
          <UserDropdown displayName={props.displayName} />
        </div>
    </div>
  );
};