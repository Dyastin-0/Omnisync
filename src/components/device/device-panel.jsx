import '../content-panel.css';

import React, {useState, useEffect} from 'react';

import { useData } from '../../contexts/data/data';

import { Loading } from '../loading/loading';
import { useAuth } from '../../contexts/auth/auth';

import { Device } from './device';

export const DevicePanel = () => {
  const { toggles, isFetching } = useData();
  const { user, userDataPath } = useAuth();
  const [renderedToggles, setRenderedToggles ] = useState([]);

  useEffect(() => {
    const renderToggles = () => {
      if (user) {
        const rendered = Object.entries(toggles).map(([key, value], index) => (
          <Device className='sub-container'
            sentBy={`${user.displayName}`}
            key={key}
            index={key}
            deviceName={value.name}
            icon={<i className={`fa-solid fa-${value.name.toLowerCase()}`}></i>}
            checked={value.state}
            path={`/${userDataPath}/toggles/${index}/state`}
          />
        ));
        setRenderedToggles(rendered);
      }
    };

    toggles && renderToggles();
  }, [toggles, user, userDataPath]);

  return (
    <div className='content-panel'>
      <h3> Devices </h3>
      <div className='container'>
        {!isFetching && renderedToggles.length > 0 ? (
          renderedToggles.map((toggle, index) => (
            <React.Fragment key={index}>
              {toggle}
            </React.Fragment>
          ))
        ) : (
          <Loading text='No devices to display.' />
        )}
      </div>
    </div>
  );
};