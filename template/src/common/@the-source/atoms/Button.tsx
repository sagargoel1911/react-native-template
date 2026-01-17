import { StyleSheet, TextStyle, StyleProp, ActivityIndicator } from 'react-native';
import { TouchableRipple, TouchableRippleProps } from 'react-native-paper';

import theme from 'src/utils/theme';
import Text from './Text';

const styles = StyleSheet.create({
	solid: {
		borderRadius: 8,
		paddingHorizontal: 24,
		alignItems: 'center',
		justifyContent: 'center',
		height: 42,
	},
	solid_text: {
		fontSize: 14,
	},
});

interface Props extends Omit<TouchableRippleProps, 'children'> {
	bg?: string;
	full?: boolean;
	is_loading?: boolean;
	title?: string;
	outline?: boolean;
	text_style?: StyleProp<TextStyle>;
	width?: number;
	text_props?: any;
	children?: any;
}

const Button = ({
	is_loading,
	title,
	children,
	bg,
	full,
	outline,
	style,
	text_style,
	disabled,
	width,
	text_props,
	...rest
}: Props) => {
	let default_button_styles: any = {
		backgroundColor: bg || theme.colors.primary_500,
		width: full ? '100%' : width,
		borderColor: bg || theme.colors.primary_500,
		borderWidth: 1,
	};

	let disabled_btn_styles = {
		backgroundColor: theme.colors.grey_500,
		borderColor: theme.colors.grey_500,
	};

	let loader_color = theme.colors.white;

	let default_text_styles: TextStyle = {
		color: theme.colors.white,
	};

	let disabled_text_styles = {
		color: theme.colors.white,
	};

	if (outline) {
		default_button_styles = {
			...default_button_styles,
			backgroundColor: 'transparent',
			borderColor: disabled ? theme.colors.grey_500 : bg || theme.colors.primary_500,
			borderWidth: 1,
		};

		disabled_btn_styles = {
			backgroundColor: 'transparent',
			borderColor: theme.colors.grey_500,
		};

		disabled_text_styles = {
			color: theme.colors.grey_500,
		};

		default_text_styles = {
			color: bg || theme.colors.primary_500,
		};

		loader_color = bg || theme.colors.primary_500;
	}

	return (
		<TouchableRipple
			disabled={is_loading || disabled}
			style={[styles.solid, default_button_styles, style, disabled && disabled_btn_styles]}
			{...rest}>
			{is_loading ? (
				<ActivityIndicator size='small' color={loader_color} />
			) : (
				<>
					{children ? (
						children
					) : (
						<Text
							medium
							style={[styles.solid_text, default_text_styles, text_style, disabled && disabled_text_styles]}
							{...text_props}>
							{title}
						</Text>
					)}
				</>
			)}
		</TouchableRipple>
	);
};

export default Button;
