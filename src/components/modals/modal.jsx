import './modal.css';

import { Button } from '../button/button';
import { useEffect, useState } from 'react';

export const GenericModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.active);
  }, [props.active]);

  return (
    <>
      <div className={`modal-overlay ${isOpen && `open`}`} onClick={ props.closeModal }></div>
      <div className={`modal ${isOpen && `open`}`}>
        <div className='modal-header'>
          <h5> {props.headerTittle} </h5>
          <Button className="nav-button"
            onclick={ props.closeModal }
            icon={ <i className='fa-solid fa-xmark'></i> }
          />
        </div>
        <div className='modal-content'>
          { props.content }
        </div>
      </div>
    </>
  );
};