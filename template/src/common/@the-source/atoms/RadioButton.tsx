import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

import theme from 'src/utils/theme';
import Text from './Text';
import apply_validations, { ValidationProps } from 'src/utils/apply_validations';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		fontSize: 14,
		color: theme.colors.primary_text,
		marginLeft: 8,
	},
	radio: {
		width: 18,
		height: 18,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: theme.colors.grey_600,
		marginRight: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	radio_active: {
		borderColor: theme.colors.primary_500,
	},
	inner_radio: {
		width: 11,
		height: 11,
		borderRadius: 10,
		backgroundColor: theme.colors.primary_500,
	},
	error: {
		fontSize: 14,
		color: theme.colors.error_500,
		textTransform: 'capitalize',
	},
});

interface Props {
	name: string;
	radiobox_value: string | number | boolean;

	label?: string;
	container_styles?: StyleProp<ViewStyle>;
	label_style?: StyleProp<TextStyle>;
	defaultValue?: string;
	disabled?: boolean;
	validations?: ValidationProps;
	dont_allow_uncheck?: boolean;
}

const RadioButton = ({
	label,
	container_styles,
	label_style,
	name,
	defaultValue,
	disabled,
	validations,
	radiobox_value,
	dont_allow_uncheck,
}: Props) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={apply_validations({ ...validations, name, label })}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				const is_checked = value === radiobox_value;
				return (
					<View>
						<Pressable
							onPress={() => {
								let new_value = is_checked ? false : radiobox_value;

								if (dont_allow_uncheck) {
									new_value = radiobox_value;
								}
								onChange(new_value);
							}}
							style={[styles.container, container_styles]}
							disabled={disabled}>
							<View style={[styles.radio, is_checked && styles.radio_active]}>
								{is_checked && <View style={styles.inner_radio} />}
							</View>

							{label !== undefined && <Text style={[styles.label, label_style]}>{label}</Text>}
						</Pressable>
						{error && <Text style={styles.error}>{error.message}</Text>}
					</View>
				);
			}}
		/>
	);
};

export default RadioButton;
