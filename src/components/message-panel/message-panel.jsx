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
      <h2> {props.title} </h2>
      <div className='container' ref={messageContainerRef}>
        {!isFetching && renderedMessages.length > 0 ? (
          renderedMessages.map((message, index) => (
            <div key={index}>
              {message}
            </div>
          ))
        ) : (
          <Loading text='No logs to display.' />
        )}
      </div>
    </div>
  );
};
