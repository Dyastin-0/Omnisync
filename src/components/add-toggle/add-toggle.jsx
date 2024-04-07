
import { arrayIncludes, pushInArray } from '../../config/database';
import { currentDateTime } from '../../utils/time';

import { useState } from 'react';

import { GenericModal } from "../modals/modal";

export const AddToggleModal = (props) => {
  const [toggleName, setToggleName] = useState(null);

  const handleAddToggle = async (e) => {
    if (e.key === 'Enter') {
      const includes = await arrayIncludes('/toggles/names', toggleName);
      if (includes) {
        props.setToastMessage(`${toggleName} is already used.`);
      } else {
        const event = () => {
          return async () => {
            await pushInArray("toggles/names", toggleName);
            await pushInArray("/messages", {
              sentBy: props.displayName,
              message: `Added a toggle named ${toggleName.toLowerCase()}.`,
              timeSent: currentDateTime()
            });
            props.setToastMessage(`Toggle ${toggleName.toLocaleLowerCase()} added.`);
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
      headerTittle='Add toggle'
      closeModal={props.closeModal} 
      active={props.active} 
      content={ <input placeholder='Toggle name' enterKeyHint='enter'
        onChange={ (e) => {setToggleName(e.target.value)} }
        onKeyUp={(e) => handleAddToggle(e)}
      ></input> }
    />
  );
};