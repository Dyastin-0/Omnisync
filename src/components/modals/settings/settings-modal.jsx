import { useEffect, useRef } from 'react';

import { useSettings } from '../../../contexts/settings/settings';

import { GenericModal } from '../modal';
import  Toggle  from '../../toggle/toggle'

export const SettingsModal = ({active, closeModal}) => {
  const { theme, toggleTheme,
    toggleIncludeDevice, areDevicesIncluded,
    toggleIncludeInactiveDays, areInactiveDaysIncluded} = useSettings();
  const themeToggleRef = useRef(null);
  const includeDevicesRef = useRef(null);
  const includeInactiveDaysRef = useRef(null);

  useEffect(() => {
    themeToggleRef.current.checked = theme === 'dark' ? true : false;
  }, [theme]);

  useEffect(() => {
    includeDevicesRef.current.checked = areDevicesIncluded;
  }, [areDevicesIncluded]);

  useEffect(() => {
    includeInactiveDaysRef.current.checked = areInactiveDaysIncluded;
  }, [areInactiveDaysIncluded]);

  return (
    <GenericModal
      width={'224px'}
      headerTitle='Settings'
      active={active}
      closeModal={closeModal}
      content={
        <div className='modal-content-container'>
          <h5>General</h5>
          <div className='row left'>
            <Toggle 
              size='small'
              ref={themeToggleRef} 
              onchange={toggleTheme} 
            />
            <h5>Dark mode</h5>
          </div>
          <h5>Chart</h5>
          <div className='row left'>
            <Toggle
              size='small'
              ref={includeDevicesRef}
              onchange={toggleIncludeDevice}
              />
            <h5>Include devices</h5>
          </div>
          <div className='row left'>
            <Toggle
              size='small'
              ref={includeInactiveDaysRef}
              onchange={toggleIncludeInactiveDays}
              />
            <h5>Include inactive days</h5>
          </div>
        </div>
      }
    />
  );
};