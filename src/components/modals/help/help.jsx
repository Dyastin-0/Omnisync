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
          <h3>API key</h3>
          <p>AIzaSyBuP81YRh3hUpo1Hv4fWYwnXlODsSOIr98</p>
          <h3>Database URL</h3>
          <p>https://omnisynchronize-default-rtdb.asia-southeast1.firebasedatabase.app</p>
          <h3>How to use</h3>
          <p>You'll need a microcontroller that supports Wi-Fi such as ESP32 & ESP8266.</p>
          <p>Connect your McU by using stable Firebase library such as FirebaseClient
            by Mobizt.</p>
          <h3>Check out the sample Arduino code at</h3>
          <a href="https://github.com/Dyastin-0/home-aut/blob/master/public/sample/sample.ino"
            target='blank'>ESP32 Firebase Client</a>  
        </div>
      }
    />
  );
}