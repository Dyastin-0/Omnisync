import React, { createContext, useContext, useEffect, useState } from 'react';

import { onValue, ref, query, orderByChild, startAt } from 'firebase/database';

import { db } from '../../config/firebase';
import { pushInArray, setQuery } from '../../config/database';
import { useAuth } from '../auth/auth';
import { constructData } from '../../utils/chart-helper';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ( {children} ) => {
  const { user, userDataPath } = useAuth();
  const [isFetching, setIsFetching] = useState(true);
  const [toggles, setToggles] = useState(null);
  const [messages, setMessages] = useState(null);
  const [chartData, setChartData] = useState([]);

  const setToggleState = (name, state, message) => {
    setQuery(`/${userDataPath}/toggles`, 'name', name, state);
    pushInArray(`/${userDataPath}/messages`, message);
  }

  const addToggle = async (toggleName) => {
    await pushInArray(`/${userDataPath}/toggles`, {
      name: toggleName,
      state: 0
    });
    await pushInArray(`/${userDataPath}/messages`, {
      sentBy: user.displayName,
      message: `Added a toggle named ${toggleName.toLowerCase()}.`,
      timeSent: new Date().getTime()
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const togglesRef = ref(db, `/${userDataPath}/toggles`);
      onValue(togglesRef, (snapshot) => {
        setToggles(snapshot.val() || []);
      });
  
      const currentTimestamp = Date.now();
      const sevenDaysAgoTimestamp = currentTimestamp - (7 * 24 * 60 * 60 * 1000);
      const messagesRef = ref(db, `/${userDataPath}/messages`);
      const queryRef = query(
        messagesRef,
        orderByChild('timeSent'),
        startAt(sevenDaysAgoTimestamp)
      );
    
      onValue(queryRef, (snapshot) => {
        setMessages(snapshot.val() || []);
      });
    };

    user && fetchData();
  }, [user, userDataPath]);

  useEffect(() => {
    if ((toggles !== null) && (messages !== null)) setIsFetching(false);
  }, [toggles, messages]);

  useEffect(() => {
    if (messages) {
    const data = constructData(messages);
    setChartData(data);
    }
  }, [messages]);

  const value = {
    toggles,
    messages,
    setToggleState,
    addToggle,
    isFetching,
    chartData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};