import './user-dropdown.css';

import { logOut } from '../../config/auth';
import { useState } from 'react';

import { Button } from '../button/button';

export const UserDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='dropdown'>
      {
        props.displayName &&
          <Button className="nav-button"
            onclick={toggle}
            text={props.displayName}
            icon={<i className={`fa fa-chevron-down chevron ${isOpen ? 'open' : ''}`} />}
          />
      }
      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        <Button className="nav-button"
          onclick={props.openAddModal}
          id="add-button"
          text="Add" icon={<i className='fa-solid fa-square-plus'></i>}
        />
        <Button className="nav-button"
          id="delete-button" text="Delete"
          icon={<i className='fa-solid fa-square-minus'></i>}
        />
        <Button className="nav-button"
          id="edit-button" text="Edit"
          icon={<i className='fa-solid fa-pen-to-square'></i>}
        />
        <Button className="nav-button"
          id="settings-button" text="Settings"
          icon={<i className='fa-solid fa-gear'></i>}
        />
        <Button className="nav-button"
          onclick={logOut}
          id="signout-button" text="Sign out"
          icon={<i className='fa-solid fa-right-from-bracket'></i>}
        />
      </div>
    </div>
  );
};
