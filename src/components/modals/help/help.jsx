import { GenericModal } from "../modal";

export const HelpModal = (props) => {
  return (
    <GenericModal
      width={'364px'}
      headerTitle={"Help"}
      closeModal={props.closeModal}
      active={props.active}
      content={
        <div className='modal-content-container'>
          <div className="group">
            <h6>API key</h6>
            <p>"AIzaSyBOyiu_l_-VoxdJVgZnR-QcMLA7D2pQZmk"</p>
          </div>
          <div className="group">
            <h6>Database URL</h6>
            <p>"https://homeautmicro-default-rtdb.asia-southeast1.firebasedatabase.app"</p>
          </div>
          <div className='group'>
            <h6>How to use</h6>
            <p>You'll need a microcontroller that supports Wi-Fi such as ESP32, ESP8266.</p>
            <p>Connect your McU by using stable Firebase library such as ESP32/ESP8266FirebaseClient
              by Mobizt.</p>
          </div>
          <div className="group">
            <h6>Check out the sample Arduino code at:</h6>
            <a href="https://github.com/Dyastin-0/home-aut/blob/master/public/esp822.ino"
              target='blank'>ESP8266 Firebase Client</a>  
          </div>  
        </div>
      }
    />
  );
}