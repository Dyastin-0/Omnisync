import Toggle from '../toggle/toggle';
import { Button } from '../button/button';
import { DeviceSettings } from '../modals/device-settings/device-settings'

import { useData } from '../../contexts/data/data';
import { useState } from 'react';

export const Device = ({deviceName, sentBy, className, icon, index, checked}) => {
  const { setToggleState } = useData();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const handleChange = (e) => {
    const newState = e.target.checked;
    const state = newState ? 'on' : 'off';
    const message = {
      action: state,
      name: deviceName,
      sentBy: sentBy,
      message: `turned ${state} the ${deviceName}.`,
      timeSent: new Date().getTime()
    }
    setToggleState(deviceName, newState, message);
  };

  return (
    <div className={className} >
      <div className='row'>
        <p>{`${index}.`}</p>
        <p className='description'> {deviceName} </p>
        {icon}
      </div>
      <div className='row'>
        <Toggle checked={checked} onchange={handleChange} />
        <Button className='nav-button'
          onclick={openSettings}
          icon={<i className='fa-solid fa-ellipsis-vertical'></i>}
        />
        <DeviceSettings
          index={index}
          active={isSettingsOpen}
          closeModal={closeSettings}
          deviceName={deviceName}
        />
      </div>
    </div>
  );
}