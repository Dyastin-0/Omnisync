import { useEffect, useState } from 'react';
import './toast-message.css';

export const ToastMessage = ({setToastMessage, message}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openToastMessage = () => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        setToastMessage(null);
      }, 3000);
    };
    message !== null && openToastMessage();
  }, [message, setToastMessage]);

  return (
    <div className={`toast-message ${open && `open`}`}>
      <h5 className='message-t'> {open ? message : ''} </h5>
      <button className='button'> {<i className='fa-solid fa-xmark'></i>} </button>
    </div>
  );
};