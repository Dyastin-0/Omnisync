
import { arrayIncludes } from '../../../config/database';

import { useState } from 'react';

import { GenericModal } from "../modal";
import { addDevice } from '../../../utils/data-helper';
import { useAuth } from '../../../contexts/auth/auth';

export const AddDeviceModal = ({path, setToastMessage, setConfirmEvent, setConfirmMessage, closeModal, active}) => {
  const { user, userDataPath } = useAuth();

  const [deviceName, setDeviceName] = useState(null);
  const [devicePin, setDevicePin] = useState(null);

  const handleAddDevice = async (e) => {
    if (e.key === 'Enter') {
      if (!deviceName || !devicePin) {
        setToastMessage(`There's an empty field.`);
        return;
      }
      const includes = await arrayIncludes(`${path}/toggles`, deviceName);
      if (includes) {
        setToastMessage(`${deviceName} is already used.`);
      } else {
        const event = () => {
          return async () => {
            await addDevice({user, userDataPath, deviceName, devicePin});
            setToastMessage(`Device ${deviceName.toLocaleLowerCase()} added.`);
            e.target.value = null;
          };  
        };
        setConfirmEvent(event);
        setConfirmMessage(`Add ${deviceName}?`);
      }
    }
  }

  return (
    <GenericModal
      headerTitle='Add device'
      closeModal={closeModal}
      active={active}
      content={
        <div className='column'>
          <input 
            placeholder='Device name'
            enterKeyHint='enter'
            onChange={(e) => {setDeviceName(e.target.value)}}
            onKeyUp={(e) => handleAddDevice(e)}
          ></input>
          <input
          placeholder='Pin number'
          enterKeyHint='enter'
          onChange={(e) => {setDevicePin(e.target.value)}}
          onKeyUp={(e) => handleAddDevice(e)}
          ></input>
        </div>
      }
    />
  );
};