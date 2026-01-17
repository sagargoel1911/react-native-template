import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import theme from 'src/utils/theme';
import Text from './Text';

const styles = StyleSheet.create({
	label: {
		borderRadius: 40,
		paddingHorizontal: 12,
		backgroundColor: theme.colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		borderColor: theme.colors.black_12,
		borderWidth: 1,
		paddingVertical: 3,
	},
	label_text: {
		fontSize: 14,
		color: theme.colors.primary_900,
		lineHeight: 16,
	},
	dot_styles: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginRight: 4,
	},
});

interface Props {
	text: string;

	style?: StyleProp<ViewStyle>;
	container_styles?: StyleProp<ViewStyle>;
	show_dot?: boolean;
	text_styles?: StyleProp<TextStyle>;
}

const Label = ({ text, container_styles, style, show_dot = true, text_styles }: Props) => {
	return (
		<View style={[styles.label, container_styles]}>
			{show_dot && <View style={[styles.dot_styles, style]} />}
			<Text style={[styles.label_text, text_styles]}>{text}</Text>
		</View>
	);
};

export default Label;
