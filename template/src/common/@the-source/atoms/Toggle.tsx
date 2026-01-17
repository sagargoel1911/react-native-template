import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, TextStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

import theme from 'src/utils/theme';
import Text from './Text';

interface Props {
	is_checked: boolean;
	on_change: (value: boolean) => void;

	label?: string;
	is_disabled?: boolean;
	label_text_styles?: TextStyle;
	custom_scale?: number;
}

const SCALE = 0.7;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		paddingRight: 10,
		fontSize: 16,
		color: theme.colors.primary_text,
	},
	toggleContainer: {
		padding: 2,
		transform: [{ scaleX: SCALE }, { scaleY: SCALE }],
	},
	disabled: {
		opacity: 0.5,
	},
	track: {
		width: 51,
		height: 31,
		borderRadius: 16,
		padding: 2,
		justifyContent: 'center',
	},
	thumb: {
		width: 27,
		height: 27,
		borderRadius: 14,
		backgroundColor: theme.colors.white,
		shadowColor: theme.colors.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
	},
});

const Toggle: React.FC<Props> = ({ label, is_checked, on_change, is_disabled = false, label_text_styles = {}, custom_scale = 0 }) => {
	// Animation values
	const translateX = useSharedValue(is_checked ? 20 : 0);
	const backgroundColor = useSharedValue(is_checked ? 1 : 0);
	const scale = useSharedValue(1);

	// Update animations when is_checked changes
	useEffect(() => {
		translateX.value = withSpring(is_checked ? 20 : 0, {
			damping: 15,
			stiffness: 150,
		});
		backgroundColor.value = withTiming(is_checked ? 1 : 0, {
			duration: 200,
		});
	}, [is_checked]);

	// Animated styles for the track (background)
	const trackAnimatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: backgroundColor.value === 1 ? theme.colors.primary_500 : theme.colors.grey_300,
		};
	});

	// Animated styles for the thumb (circle)
	const thumbAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }, { scale: scale.value }],
		};
	});

	// Handle press animation
	const handle_press_in = () => {
		if (!is_disabled) {
			scale.value = withSpring(0.9, { damping: 15, stiffness: 150 });
		}
	};

	const handle_press_out = () => {
		if (!is_disabled) {
			scale.value = withSpring(1, { damping: 15, stiffness: 150 });
		}
	};

	// Handle toggle
	const handle_toggle = () => {
		if (!is_disabled) {
			runOnJS(on_change)(!is_checked);
		}
	};

	return (
		<View style={styles.container}>
			{label && <Text style={[styles.label, label_text_styles]}>{label}</Text>}
			<Pressable
				onPress={handle_toggle}
				onPressIn={handle_press_in}
				onPressOut={handle_press_out}
				disabled={is_disabled}
				style={[
					styles.toggleContainer,
					is_disabled && styles.disabled,
					custom_scale > 0 && { transform: [{ scaleX: custom_scale }, { scaleY: custom_scale }] },
				]}>
				<Animated.View style={[styles.track, trackAnimatedStyle]}>
					<Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
				</Animated.View>
			</Pressable>
		</View>
	);
};

export default Toggle;
