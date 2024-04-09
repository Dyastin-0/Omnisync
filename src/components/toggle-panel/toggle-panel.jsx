import '../content-panel.css';

import React from 'react';

import { useData } from '../../contexts/data/data';

import { Loading } from '../loading/loading';

export const TogglePanel = (props) => {
  const { renderedToggles, isFetching } = useData();
  
  return (
    <div className='content-panel'>
      <h1> {props.tittle} </h1>
      <div className='container'>
        {!isFetching ? (
          renderedToggles.map((toggle, index) => (
            <React.Fragment key={index}>
              {toggle}
            </React.Fragment>
          ))
        ) : (
          <Loading text='Fetching toggles...' />
        )}
      </div>
    </div>
  );
};