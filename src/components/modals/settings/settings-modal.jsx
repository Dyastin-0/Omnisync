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
          <p className='description'>General</p>
          <div className='row left'>
            <Toggle 
              size='small'
              ref={themeToggleRef} 
              onchange={toggleTheme} 
            />
            <p>Dark mode</p>
          </div>
          <p className='description'>Chart</p>
          <div className='row left'>
            <Toggle
              size='small'
              ref={includeDevicesRef}
              onchange={toggleIncludeDevice}
              />
            <p>Include devices</p>
          </div>
          <div className='row left'>
            <Toggle
              size='small'
              ref={includeInactiveDaysRef}
              onchange={toggleIncludeInactiveDays}
              />
            <p>Include inactive days</p>
          </div>
          <p className='description'>Microcontroller</p>
        </div>
      }
    />
  );
};