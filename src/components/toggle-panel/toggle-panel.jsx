import '../content-panel.css';

import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase';

import { useEffect, useState } from 'react';

import { TogglePanelItem } from './toggle-panel-item';
import { useAuth } from '../../contexts/auth/auth'; 

export const TogglePanel = (props) => {
  const [toggles, setToggles] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const dataRef = ref(db, '/toggles/names');
    onValue(dataRef, (snapshot) => {
      setToggles(snapshot.val());
    });
  }, []);

  return (
    <div className='content-panel'>
      <h1> {props.tittle} </h1>
      <div className='container'>
        {toggles &&
          Object.entries(toggles).map(([key, value], index) => (
            <TogglePanelItem className="sub-container"
              sentBy={`${user.displayName}`}
              key={key}
              toggleName={value}
              path={`/toggles/states/${index}`}
            />
          ))
        }
      </div>
    </div>
  );
};