import { setQuery, pushInArray } from '../config/database';

export const setDeviceState = (userDataPath, name, enabled, message) => {
	setQuery(`${userDataPath}/devices`, 'name', name, enabled, 'enabled');
	pushInArray(`/${userDataPath}/messages`, message);
}

export const setToggleState = (userDataPath, name, state, message) => {
	setQuery(`/${userDataPath}/devices`, 'name', name, state, 'state');
	pushInArray(`/${userDataPath}/messages`, message);
}

export const addDevice = async ({user, userDataPath, deviceName, devicePin}) => {
	await pushInArray(`/${userDataPath}/devices`, {
		name: deviceName,
		pin: devicePin,
		enabled: false,
		state: 0
	});
	await pushInArray(`${userDataPath}/messages`, {
		sentBy: user.displayName,
		message: `Added a device named ${deviceName.toLowerCase()}.`,
		timeSent: new Date().getTime()
	});
}