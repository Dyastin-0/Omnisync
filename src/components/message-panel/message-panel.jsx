import './message-panel.css';
import { onValue, ref, query, limitToLast } from 'firebase/database';
import { db } from '../../config/firebase';
import { useEffect, useRef, useState } from 'react';
import { MessagePanelItem } from './message-panel-item';
import { useAuth } from '../../contexts/auth/auth';

export const MessagePanel = (props) => {
  const [messages, setMessages] = useState(null);
  const messageContainerRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const dataRef = ref(db, '/messages');
    const limitRef = query(dataRef, limitToLast(10));
    onValue(limitRef, async (snapShot) => {
      setMessages(snapShot.val());
    });
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='content-panel'>
      <h1> {props.tittle} </h1>
      <div className='message-container' ref={messageContainerRef}>
        { messages &&
          Object.entries(messages).map(([key, value]) => (
            <MessagePanelItem
              isMessageOwner={user.displayName === value.sentBy} 
              key={key}
              message={value.message}
              timeSent={value.timeSent}
              sentBy={`${value.sentBy} on ${value.timeSent}`}
            /> 
          ))
        }
      </div>
    </div>
  );
};
