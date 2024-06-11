import { useLayoutEffect, useState } from 'react';
import '../App.css';

import { AccountLinkingWindow } from '../components/modals/account-linking/account-link-window';
import { NavBar } from '../components/nav-bar/nav-bar';

const AccountLinking = () => {
  const [toastMessage, setToastMessage] = useState(null);

  useLayoutEffect(() => {
    document.title = 'Sign in';
  });

  return (
    <div className="App">
      <NavBar
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
      />
      <AccountLinkingWindow
        setToastMessage={setToastMessage}
      />
    </div>
  );
}

export default AccountLinking;