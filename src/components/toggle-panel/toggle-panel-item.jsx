import { useState, useEffect } from 'react';

import Toggle from '../toggle/toggle';
import { currentDateTime } from '../../utils/time';

import { pushInArray,
  setData } from '../../config/database';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase';

export const TogglePanelItem = (props) => {
  const [isOn, setIsOn] = useState(false);

useEffect(() => {
  const dataRef = ref(db, props.path);
  onValue(dataRef, async (snapshot) => {
    const data = await snapshot.val();
    setIsOn(data);
  });
}, []);


  const handleChange = async (e) => {
    const newState = e.target.checked;
    setIsOn(newState);
    setData(props.path, newState);
    const state = newState ? "on" : "off";
    await pushInArray("/messages", {
      sentBy: props.sentBy,
      message: `Turned ${state} the ${props.toggleName.toLowerCase()}.`,
      timeSent: currentDateTime()
    });
  }

  return (
    <div className={props.className} >
      <h4> {props.toggleName} </h4>
      {isOn !== null && <Toggle checked={isOn} onchange={handleChange} />}
    </div>
  );
}