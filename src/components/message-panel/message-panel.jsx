import React, { useEffect, useRef } from 'react';

import './message-panel.css';

import { useData } from '../../contexts/data/data';
import { Loading } from '../loading/loading';

export const MessagePanel = (props) => {
  const { renderedMessages, isFetching } = useData();
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [renderedMessages]);

  return (
    <div className='content-panel'>
      <h1> {props.tittle} </h1>
      <div className='container gap-9px' ref={messageContainerRef}>
        {!isFetching ? (
          renderedMessages.map((message, index) => (
            <React.Fragment key={index}>
              {message}
            </React.Fragment>
          ))
        ) : (
          <Loading text='Fetching messages...' />
        )}
      </div>
    </div>
  );
};
