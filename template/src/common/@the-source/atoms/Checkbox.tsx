import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';

import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import theme from 'src/utils/theme';
import Text from './Text';
import apply_validations, { ValidationProps } from 'src/utils/apply_validations';

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
	error: {
		fontSize: 14,
		color: theme.colors.error_500,
		textTransform: 'capitalize',
	},
});

interface Props {
	label: string;
	name: string;

	checkbox_value?: string | number | boolean;
	container_style?: any;
	is_array?: boolean;
	defaultValue?: string | number | boolean | [];
	disabled?: boolean;
	validations?: ValidationProps;
	checkbox_wrapper_styles?: StyleProp<ViewStyle>;
	size?: number;
	label_style?: StyleProp<TextStyle>;
	custom_error_label?: string;
}

const Checkbox = ({
	label,
	name,

	checkbox_value = true,
	container_style,
	is_array,
	checkbox_wrapper_styles,
	label_style,
	size = 20,
	defaultValue,
	disabled,
	validations,
	custom_error_label,
}: Props) => {
	const { control, watch } = useFormContext();
	const watch_value = watch(name);

	return (
		<Controller
			key={watch_value}
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={apply_validations({ ...validations, custom_error_label, name, label })}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				let is_checked: boolean;

				if (is_array) {
					is_checked = _.includes(value, checkbox_value);
				} else {
					is_checked = _.includes([checkbox_value, 'True', 'true'], value);
				}

				return (
					<View style={container_style}>
						<Pressable
							onPress={() => {
								if (is_array) {
									const _value = _.cloneDeep(value) || [];
									const index = _.indexOf(_value, checkbox_value);

									if (index !== -1) {
										_value.splice(index, 1);
									} else {
										_value.push(checkbox_value);
									}
									onChange(_.cloneDeep(_value));
								} else {
									const negative_checkbox_value = checkbox_value === true ? false : null;
									onChange(is_checked ? negative_checkbox_value : _.cloneDeep(checkbox_value));
								}
							}}
							style={[styles.checkbox, checkbox_wrapper_styles]}
							disabled={disabled}>
							{is_checked ? (
								disabled ? (
									<SvgImage name={ImageLink_keys.checkbox_disabled} width={size} height={size} />
								) : (
									<SvgImage name={ImageLink_keys.checkbox_active} width={size} height={size} />
								)
							) : (
								<SvgImage name={ImageLink_keys.checkbox} width={size} height={size} />
							)}

							<Text style={[styles.label, label_style]}>
								{label}
								{validations?.required && <Text style={{ color: theme.colors.error_main }}>*</Text>}
							</Text>
						</Pressable>
						{error && <Text style={styles.error}>{error.message}</Text>}
					</View>
				);
			}}
		/>
	);
};

export default Checkbox;
