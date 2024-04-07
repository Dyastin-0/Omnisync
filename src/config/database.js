import { db } from '../config/firebase';
import { ref, set, onValue, push, get, query, limitToLast } from 'firebase/database';

export async function setData(dataPath, data) {
  const dataRef = ref(db, dataPath);
  await set(dataRef, data)
  .catch((error) => {
    console.error(error);
  });
}

export async function getData(dataPath) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const data = await snapShot.val();
  console.log(data);
  return data;
}

export function listenToChangesOn(dataPath) {
  const dataRef = ref(db, dataPath);
  var newData = null;
  onValue(dataRef, (snapshot) => {
    newData = snapshot.val();
  });

  return newData;
}

export async function pushInArray(dataPath, data) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const messages = await snapShot.val() || [];
  messages.push(data);
  set(dataRef, messages);
}

export async function arrayIncludes(dataPath, data) {
  const dataRef = ref(db, dataPath);
  const snapShot = await get(dataRef);
  const loads = await snapShot.val() || [];
  return loads.includes(data);
}