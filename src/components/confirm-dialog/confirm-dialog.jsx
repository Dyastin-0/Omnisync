import './confirm-dialog.css';

import { useEffect, useState } from "react";
import { Button } from "../button/button";
import { GenericModal } from "../modals/modal";

export const ConfirmDialogModal = (props) => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (props.event) {
      setEvent(() => props.event);
      setOpen(true);
    }
  }, [props.event]); 

  const handleOkay = () => {
    event && event();
    setEvent(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setEvent(null);
    setOpen(false);
  };

  return (
    <GenericModal
    active={open}
    headerTittle = 'Confirm'
    closeModal={ props.closeModal }
    content={
      <div className='confirm-container'>
        <p className='p'> {props.message} </p>
        <div className='wrapper'>
          <Button className='nav-button'
            onclick={handleOkay}
            text="Yes"
          />
          <Button className='nav-button red'
            onclick={ handleCancel}
            text="No"
          />
        </div>
      </div>
    }/>
  );
};