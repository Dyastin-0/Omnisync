
import { GenericModal } from "../modal";

export const InfoModal = (props) => {
  return (
    <GenericModal
      width='400px'
      headerTitle='Info'
      active={props.active}
      closeModal={props.closeModal}
      content={
        <div className='modal-content-container'>
          <div className="group">
            <h5>What is Home Aut Micro?</h5>
            <p>It is a home automation tool that you can use on
                several microcontrollers that supports Wi-Fi and
                has a stable Firebase Library.
            </p>
            <p>
              Home Aut Micro is open-source, you can fork the project 
              on my Github, change the Firebase config for further customization.
            </p>
          </div>
          <div className='group'>
            <h5>Developed by</h5>
            <p>Justine Paralejas</p>
          </div>
          <h5>Socials</h5>
          <div className="row left">
              <a href='https://github.com/Dyastin-0' target='_blank'><i className="fa-brands fa-github fa-lg"></i></a>
              <a href='https://www.facebook.com/dyastinparalejas' target='_blank'><i className="fa-brands fa-facebook fa-lg"></i></a>
          </div>
          <div className='group'>
            <h5>Project Stack</h5>
            <p>ReactJS, Firebase Authentication & Real-time Database</p>
          </div>
          <div className='group'>
            <h5>Credits</h5>
            <p>Mobizt - ESP8266/32FirebaseClient author.</p>
          </div>
        </div>
      }
    />
  );
};