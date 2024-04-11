import '../App.css';

import { useState, useEffect } from 'react'

import { NavBar } from '../components/nav-bar/nav-bar';

import { Pad } from '../components/Pad/Pad'
import { AddPanel } from '../components/manage/AddPanel/add-panel';
import { DeletePanel } from '../components/manage/DeletePanel/delete-panel';
import { EditPanel } from '../components/manage/EditPanel/edit-panel'

const Manage = () => {
  const [confirmEvent, setConfirmEvent] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  return (
    <div className='App'>
      <NavBar
        confirmMessage={confirmMessage}
        confirmEvent={confirmEvent}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <Pad
        options={{panel: 'fex-max small', container: 'center'}}
        content={
          <h1>Manage your toggles</h1>
        } 
      />
      <AddPanel title='Add'
        setToastMessage={setToastMessage}
        setConfirmEvent={setConfirmEvent}
        setConfirmMessage={setConfirmMessage}
      />
      <DeletePanel title='Delete' />
      <EditPanel title='Edit' />
      <Pad
        options={{panel: 'fex-max small', container: 'center'}}
      />
    </div>
  );
};

export default Manage;