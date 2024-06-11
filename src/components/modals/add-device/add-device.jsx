
import { arrayIncludes } from '../../../config/database';

import { useState } from 'react';

import { GenericModal } from "../modal";
import { useData } from '../../../contexts/data/data';

export const AddDeviceModal = (props) => {
  const { addToggle } = useData();
  const [toggleName, setToggleName] = useState(null);
  const handleAddDevice = async (e) => {
    if (e.key === 'Enter') {
      const includes = await arrayIncludes(`${props.path}/toggles`, toggleName);
      if (includes) {
        props.setToastMessage(`${toggleName} is already used.`);
      } else {
        const event = () => {
          return async () => {
            await addToggle(toggleName);
            props.setToastMessage(`Device ${toggleName.toLocaleLowerCase()} added.`);
            e.target.value = null;
          };  
        };
        props.setConfirmEvent(event);
        props.setConfirmMessage(`Add ${toggleName}?`);
      }
    }
  }

  return (
    <GenericModal
      headerTitle='Add device'
      closeModal={props.closeModal}
      active={props.active}
      content={<input placeholder='Device name' enterKeyHint='enter'
        onChange={(e) => {setToggleName(e.target.value)}}
        onKeyUp={(e) => handleAddDevice(e)}
      ></input>}
    />
  );
};