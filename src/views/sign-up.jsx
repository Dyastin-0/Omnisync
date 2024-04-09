import '../App.css';

import { useState } from 'react';

import { NavBar } from "../components/nav-bar/nav-bar";
import { SignUpWindow } from '../components/auth/sign-up';
import { ToastMessage } from '../components/toast-message/toast-message';
import { GuideModal } from '../components/guide-modal/guide-modal';

const SignUp = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const closeGuideModal = () => setIsGuideModalOpen(false);
  const openGuideModal = () => setIsGuideModalOpen(true);

  return (
    <div className='App'>
      <NavBar
       openGuideModal={openGuideModal}
      />
      <SignUpWindow setToastMessage={setToastMessage}  />
      <ToastMessage message={toastMessage} setToastMessage={setToastMessage} />
      <GuideModal
        active={isGuideModalOpen}
        closeModal={closeGuideModal}
      />
    </div>
  );
};

export default SignUp;