import { useAuth } from '../../../contexts/auth/auth'; 

import { GenericModal } from '../modal';

export const  UserProfile = (props) => {
  const { user } = useAuth();
  
  return (
    <GenericModal
      headerTitle={user.displayName}
      closeModal={props.closeModal}
      active={props.active}
      content={
        <div className='modal-content-container'>
          <div className='group'>
            <h5>Display name</h5>
            <p>{user.displayName}</p>
          </div>
          <div className="group">
            <h5>Email</h5>
            <p>{user.email}</p>
          </div>
          <div className="group">
            <h5>Unique ID</h5>
            <p>{user.uid}</p>
          </div>
        </div>
      }
    />
  );
}