import './user-dropdown.css';

import { logOut } from '../../config/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../button/button';
import { useAuth } from '../../contexts/auth/auth';

export const UserDropdown = (props) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState(null);
  const navigate = useNavigate();

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    path && navigate(path);
  }, [path]);

  const redirect = (path) => {
    setPath(path);
  };

  return (
    <div className='dropdown'>
      {<Button className="nav-button"
        onclick={toggle}
        text={user && user.displayName}
        icon={<i className={`fa fa-chevron-down chevron ${isOpen ? 'open' : ''}`} />}
      />}
      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {user ?
         <>
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
        </> :
        <>
          <Button className="nav-button"
            id="sign-in-button"
            text="Sign in" icon={<i className="fa-solid fa-right-to-bracket"></i>}
            onclick={() => redirect('/sign-in')}
          />
          <Button className="nav-button"
            id="sign-in-button"
            text="Sign up" icon={<i className="fa-solid fa-user-plus"></i>}
            onclick={() => redirect('/sign-up')}
          />
        </>
        }
      </div>
    </div>
  );
};
