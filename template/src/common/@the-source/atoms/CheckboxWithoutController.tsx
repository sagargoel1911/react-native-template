import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import theme from 'src/utils/theme';
import Text from './Text';

const styles = StyleSheet.create({
	checkbox: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		fontSize: 16,
		color: theme.colors.primary_text,
		marginLeft: 8,
		lineHeight: 20,
	},
});

interface Props {
	label: string;
	onPress: () => void;
	status: 'unchecked' | 'checked' | 'indeterminate';

	checkbox_wrapper_styles?: StyleProp<ViewStyle>;
	size?: number;
	label_style?: StyleProp<TextStyle>;
	disabled?: boolean;
}

const CheckboxWithoutController = ({
	label,
	onPress,
	status,
	checkbox_wrapper_styles,
	label_style,
	size = 20,
	disabled = false,
}: Props) => {
	let Comp: any;

	switch (status) {
		case 'indeterminate':
			Comp = <SvgImage name={ImageLink_keys.checkbox_partial} width={size} height={size} />;
			break;

		case 'checked':
			Comp = <SvgImage name={ImageLink_keys.checkbox_active} width={size} height={size} />;
			break;

		default:
			Comp = <SvgImage name={ImageLink_keys.checkbox} width={size} height={size} />;
			break;
	}

	if (disabled) {
		Comp = <SvgImage name={ImageLink_keys.checkbox_disabled} width={size} height={size} />;
	}

	return (
		<Pressable onPress={onPress} style={[styles.checkbox, checkbox_wrapper_styles]} disabled={disabled}>
			{Comp}
			<Text style={[styles.label, label_style]}>{label}</Text>
		</Pressable>
	);
};

export default CheckboxWithoutController;
