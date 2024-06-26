
import { arrayIncludes } from '../../../config/database';

import { useState } from 'react';

import { GenericModal } from "../modal";
import { useData } from '../../../contexts/data/data';

export const AddDeviceModal = ({path, setToastMessage, setConfirmEvent, setConfirmMessage, closeModal, active}) => {
  const { addToggle } = useData();
  const [toggleName, setToggleName] = useState(null);
  const handleAddDevice = async (e) => {
    if (e.key === 'Enter') {
      const includes = await arrayIncludes(`${path}/toggles`, toggleName);
      if (includes) {
        setToastMessage(`${toggleName} is already used.`);
      } else {
        const event = () => {
          return async () => {
            await addToggle(toggleName);
            setToastMessage(`Device ${toggleName.toLocaleLowerCase()} added.`);
            e.target.value = null;
          };  
        };
        setConfirmEvent(event);
        setConfirmMessage(`Add ${toggleName}?`);
      }
    }
  }

  return (
    <GenericModal
      headerTitle='Add device'
      closeModal={closeModal}
      active={active}
      content={<input placeholder='Device name' enterKeyHint='enter'
        onChange={(e) => {setToggleName(e.target.value)}}
        onKeyUp={(e) => handleAddDevice(e)}
      ></input>}
    />
  );
};