import '../content-panel.css';

import React from 'react';

import { useData } from '../../contexts/data/data';

import { Loading } from '../loading/loading';
import { Button } from '../button/button';

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
          <Loading text='No toggles to display.'
            content={
              <div className='row'>
                <p>Click this <i className="fa-solid fa-arrow-right"></i></p>
                <Button className='nav-button'
                  onclick={props.buttonEvent}
                  icon={<i className="fa-solid fa-square-plus"></i>}
                />
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};