import './guide-modal.css';

import { GenericModal } from "../modals/modal";

export const GuideModal = (props) => {
  return (
    <GenericModal
      width={'400px'}
      headerTittle={"Help"}
      closeModal={props.closeModal}
      active={props.active}
      content={
        <div className='guide-modal'>
          <h5>API key</h5>
          <p>"AIzaSyBOyiu_l_-VoxdJVgZnR-QcMLA7D2pQZmk"</p>
          <h5>Database URL</h5>
          <p>"https://homeautmicro-default-rtdb.asia-southeast1.firebasedatabase.app"</p>
          <h5>How to use</h5>
          <p>You can use the API key and database URL <br />
            with library such as ESP32FirebaseClient and <br />
            ESP8266FirebaseClient by Mobizt
          </p>
          <h5>Check out the sample Arduino code at:</h5>
          <a href="https://github.com/Dyastin-0/home-aut/blob/master/public/esp822.ino" target='blank'>ESP8266 Firebase Client</a>
        </div>
      }
    />
  );
}