import Toggle from '../toggle/toggle';
import { Button } from '../button/button';
import { DeviceSettings } from '../modals/device-settings/device-settings'

import { setToggleState, setDeviceState } from '../../utils/data-helper';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth/auth';

export const Device = ({deviceName, enabled, devicePin, sentBy, icon, index, checked, setToastMessage}) => {
  const { userDataPath } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [state, setState] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const handleStateChange = (e) => {
    if (!enabled) {
      setToastMessage(`${deviceName} is disabled.`);
      return;
    }
    const newState = e.target.checked;
    setState(newState);
    const action = newState ? 'on' : 'off';
    const message = {
      action: action,
      name: deviceName,
      sentBy: sentBy,
      message: `turned ${action} the ${deviceName}.`,
      timeSent: new Date().getTime()
    }
    setToggleState(userDataPath, deviceName, newState, message);
  };

  const handleDeviceState = (e) => {
    if (state) {
      setToastMessage(`${deviceName} is on, turn it off first.`);
      return;
    }
    const newState = e.target.checked;
    const action = newState ? 'enabled' : 'disabled';
    const message = {
      action: action,
      name: deviceName,
      sentBy: sentBy,
      message: `${action} the ${deviceName}.`,
      timeSent: new Date().getTime()
    }
    setDeviceState(userDataPath, deviceName, newState, message);
  }

  return (
    <div className='sub-container' >
      <div className='row'>
        <p>{`${index}.`}</p>
        <p className='description'> {deviceName} </p>
        {icon}
      </div>
      <div className='row'>
        <Toggle checked={checked} onchange={handleStateChange} />
        <Button className='nav-button'
          onclick={openSettings}
          icon={<i className='fa-solid fa-ellipsis-vertical'></i>}
        />
        <DeviceSettings
          handleDeviceState={handleDeviceState}
          enabled={enabled}
          devicePin={devicePin}
          index={index}
          active={isSettingsOpen}
          closeModal={closeSettings}
          deviceName={deviceName}
        />
      </div>
    </div>
  );
}