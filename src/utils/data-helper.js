import { setQuery, pushInArray } from '../config/database';

export const setDeviceState = (userDataPath, name, enabled, message) => {
	setQuery(`${userDataPath}/toggles`, 'name', name, enabled, 'enabled');
	pushInArray(`/${userDataPath}/messages`, message);
}

export const setToggleState = (userDataPath, name, state, message) => {
	setQuery(`/${userDataPath}/toggles`, 'name', name, state, 'state');
	pushInArray(`/${userDataPath}/messages`, message);
}

export const addDevice = async ({user, userDataPath, deviceName, devicePin}) => {
	await pushInArray(`/${userDataPath}/toggles`, {
		name: deviceName,
		pin: devicePin,
		enabled: false,
		state: 0
	});
	await pushInArray(`/${userDataPath}/messages`, {
		sentBy: user.displayName,
		message: `Added a toggle named ${deviceName.toLowerCase()}.`,
		timeSent: new Date().getTime()
	});
}