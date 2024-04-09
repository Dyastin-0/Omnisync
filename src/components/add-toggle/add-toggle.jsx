
import { arrayIncludes } from '../../config/database';

import { useState } from 'react';

import { GenericModal } from "../modals/modal";
import { useData } from '../../contexts/data/data';

export const AddToggleModal = (props) => {
  const { addToggle } = useData();
  const [toggleName, setToggleName] = useState(null);
  
  const handleAddToggle = async (e) => {
    if (e.key === 'Enter') {
      const includes = await arrayIncludes('/toggles', toggleName);
      if (includes) {
        props.setToastMessage(`${toggleName} is already used.`);
      } else {
        const event = () => {
          return async () => {
            await addToggle(toggleName);
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
      content={<input placeholder='Toggle name' enterKeyHint='enter'
        onChange={(e) => {setToggleName(e.target.value)}}
        onKeyUp={(e) => handleAddToggle(e)}
      ></input>}
    />
  );
};