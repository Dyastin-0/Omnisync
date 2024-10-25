import { useSettings } from '../../../contexts/settings/settings';
import { GenericModal } from '../modal';
import Toggle from '../../toggle/toggle';

export const SettingsModal = ({ active, closeModal }) => {
  const {
    theme,
    toggleTheme,
    toggleIncludeDevice,
    areDevicesIncluded,
    toggleIncludeInactiveDays,
    areInactiveDaysIncluded
  } = useSettings();

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
              checked={theme === 'dark'}
              size='small'
              onChange={toggleTheme}
            />
            <p>Dark mode</p>
          </div>
          <p className='description'>Chart</p>
          <div className='row left'>
            <Toggle
              checked={areDevicesIncluded}
              size='small'
              onChange={toggleIncludeDevice}
            />
            <p>Include devices</p>
          </div>
          <div className='row left'>
            <Toggle
              checked={areInactiveDaysIncluded}
              size='small'
              onChange={toggleIncludeInactiveDays}
            />
            <p>Include inactive days</p>
          </div>
          <p className='description'>Microcontroller</p>
        </div>
      }
    />
  );
};