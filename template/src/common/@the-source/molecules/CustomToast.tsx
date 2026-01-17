import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import _ from 'lodash';

import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import theme from 'src/utils/theme';
import Text from '../atoms/Text';
import device from 'src/utils/device';
import { useAppSelector } from 'src/store';
import { hide_toast } from 'src/reducers/app';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		width: device.isTablet ? 400 : device.width * 0.85,
		zIndex: 10000,
		flexDirection: 'row',
		backgroundColor: theme.colors.black_17,
		padding: 20,
		borderRadius: 12,
		// position: 'absolute',
	},
	content_styles: {
		paddingLeft: 20,
		flex: 1,
	},
	title_style: {
		color: theme.colors.white,
		fontSize: device.isTablet ? 20 : 15,
		lineHeight: 26,
	},
	message_styles: {
		color: theme.colors.white,
		fontFamily: theme.fonts.satoshi_regular,
		fontSize: 15,
		lineHeight: 20,
		paddingTop: 12,
	},
	single_line: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const CustomToastComp = () => {
	console.log('first');
	const animated_offset = useSharedValue(0);

	const { toast_details } = useAppSelector(
		(state) => ({
			toast_details: state.app.toast_details,
		}),
		shallowEqual,
	);

	const { type, title, message, duration = 3000 } = toast_details;

	let Icon;

	const dispatch = useDispatch();

	switch (type) {
		case 'warning':
			Icon = ImageLink_keys.warning_icon;
			break;

		case 'success':
			Icon = ImageLink_keys.success;
			break;

		case 'simple_success':
			Icon = ImageLink_keys.success_circle;
			break;

		case 'error':
			Icon = ImageLink_keys.error_filled;
			break;

		default:
			break;
	}

	const handle_close = () => {
		dispatch(hide_toast());
	};

	const animated_style = useAnimatedStyle(() => {
		return {
			top: animated_offset.value,
		};
	});

	useEffect(() => {
		animated_offset.value = withTiming(70, { duration: 500 });
		setTimeout(() => {
			handle_close();
		}, duration);
	}, []);

	let size = _.isEmpty(message) ? 38 : 48;

	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				alignItems: 'center',
			}}>
			<Animated.View style={[styles.container, animated_style]}>
				{Icon && <SvgImage name={Icon} width={size} height={size} />}
				<View style={[styles.content_styles]}>
					<Text bold style={styles.title_style}>
						{title}
					</Text>
					{!_.isEmpty(message) && <Text style={styles.message_styles}>{message}</Text>}
				</View>
				<Pressable onPress={handle_close} style={{ marginTop: 2, marginLeft: 10 }}>
					<SvgImage name={ImageLink_keys.cross_white} />
				</Pressable>
			</Animated.View>
		</View>
	);
};

const CustomToast = () => {
	const { toast_details } = useAppSelector(
		(state) => ({
			toast_details: state.app.toast_details,
		}),
		shallowEqual,
	);

	const { is_open } = toast_details;

	if (!is_open) {
		return null;
	}

	return <CustomToastComp />;
};

export default CustomToast;
