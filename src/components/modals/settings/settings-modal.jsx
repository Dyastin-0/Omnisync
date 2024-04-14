import { useEffect, useRef } from 'react';

import { useSettings } from '../../../contexts/settings/settings';

import { GenericModal } from '../modal';
import  Toggle  from '../../toggle/toggle'

export const SettingsModal = (props) => {
  const { theme, toggleTheme, toggleIncludeDevice, areDevicesIncluded} = useSettings();
  const themeToggleRef = useRef(null);
  const includeDevicesRef = useRef(null);

  useEffect(() => {
    themeToggleRef.current.checked = theme === 'light' ? true : false;
  }, [theme]);

  useEffect(() => {
    includeDevicesRef.current.checked = areDevicesIncluded;
  }, [areDevicesIncluded]);

  return (
    <GenericModal
      headerTitle='Settings'
      active={props.active}
      closeModal={props.closeModal}
      content={
        <div className='modal-content-container'>
          <h5>General</h5>
          <div className='row left'>
            <Toggle 
              size='small'
              ref={themeToggleRef} 
              onchange={toggleTheme} 
            />
            <h6>{`Theme: ${theme}`}</h6>
          </div>
          <h5>Chart</h5>
          <div className='row left'>
            <Toggle
              size='small'
              ref={includeDevicesRef}
              onchange={toggleIncludeDevice}
              />
            <h6>Include devices on the chart</h6>
          </div>
        </div>
      }
    />
  );
};