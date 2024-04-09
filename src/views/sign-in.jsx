import { useState } from 'react';
import '../App.css';

import { SignInWindow } from '../components/auth/sign-in';
import { NavBar } from '../components/nav-bar/nav-bar';
import { ToastMessage } from '../components/modals/toast-message/toast-message'
import { GuideModal } from '../components/modals/guide/guide';

const SignIn = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const closeGuideModal = () => setIsGuideModalOpen(false);
  const openGuideModal = () => setIsGuideModalOpen(true);

  return (
    <div className="App">
      <NavBar
       openGuideModal={openGuideModal}
      />
      <SignInWindow setToastMessage={setToastMessage} />
      <ToastMessage message={toastMessage} setToastMessage={setToastMessage} />
      <GuideModal
        active={isGuideModalOpen}
        closeModal={closeGuideModal}
      />
    </div>
  );
}

export default SignIn;