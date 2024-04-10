import '../content-panel.css';

import React from 'react';

import { useData } from '../../contexts/data/data';

import { Loading } from '../loading/loading';

export const TogglePanel = (props) => {
  const { renderedToggles, isFetching } = useData();
  
  return (
    <div className='content-panel'>
      <h2> {props.title} </h2>
      <div className='container'>
        {!isFetching && renderedToggles.length > 0 ? (
          renderedToggles.map((toggle, index) => (
            <React.Fragment key={index}>
              {toggle}
            </React.Fragment>
          ))
        ) : (
          <Loading text='No toggles to display. Add your first toggle by clicking the dropdown menu and selecting add.' />
        )}
      </div>
    </div>
  );
};