import './profile.css';

import { useAuth } from '../../../contexts/auth/auth'; 

import { GenericModal } from '../modal';
import { Loading } from '../../loading/loading';

export const  UserProfile = (props) => {
  const { user } = useAuth();
  
  return (
    <GenericModal
      headerTittle={"Profile"}
      closeModal={props.closeModal}
      active={props.active}
      content={
        <div className='profile'>
          <div className='group'>
            <h6>Display name</h6>
            <p>{user.displayName}</p>
          </div>
          <div className="group">
            <h6>Email</h6>
            <p>{user.email}</p>
          </div>
          <div className="group">
            <h6>Unique ID</h6>
            <p>{user.uid}</p>
          </div>
        </div>
      }
    />
  );
}