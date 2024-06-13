
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
          <h3>What is omnisync?</h3>
          <p>It is an automation tool that you can use on your personal projects;
            all you need is a microcontroller that supports Wi-Fi to start, you can check the
            sample Arduino code in the Help (?) modal.
          </p>
          <p>
            Omnisync is open-source, you can clone the project 
            on my Github, simply change the Firebase config with your own for further customization.
          </p>
          <div className='group'>
            <h3>Developed by</h3>
            <p>Justine Paralejas</p>
          </div>
          <h3>Socials</h3>
          <div className="row left">
              <a href='https://github.com/Dyastin-0' rel="nonreferrer" target='_blank'><i className="fa-brands fa-github fa-lg"></i></a>
              <a href='https://www.facebook.com/dyastinparalejas' rel="nonreferrer" target='_blank'><i className="fa-brands fa-facebook fa-lg"></i></a>
          </div>
            <h3>Project Stack</h3>
            <p>ReactJS, Firebase Authentication & Real-time Database</p>
        </div>
      }
    />
  );
};