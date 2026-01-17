import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_ORIENTATION = {
	LANDSCAPE: 'LANDSCAPE',
	PORTRAIT: 'PORTRAIT',
};

export const get_device_info = ({ width, height }: { width: number; height: number }) => {
	const new_device = {
		width: 0,
		height: 0,
		isTablet: false,
		isTabletPortrait: false,
		isTabletLandscape: false,
	};
	new_device.isTablet = DeviceInfo.isTablet();
	new_device.width = width;
	new_device.height = height;
	new_device.isTabletPortrait = width < height;
	new_device.isTabletLandscape = width > height;

	return new_device;
};

let device = get_device_info({ width, height });

export const set_device_info = ({ width, height }: { width: number; height: number }) => {
	device = get_device_info({ width, height });
};

// device is used for isTablet as it stays same throughout the lifecycle of the app and because we want to write styles within
// Stylesheet.create method. If we use redux_device_info, it will not be able to write styles within Stylesheet.create method.
export default device;
