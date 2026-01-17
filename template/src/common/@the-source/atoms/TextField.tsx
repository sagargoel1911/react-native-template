import _ from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';

import apply_validations, { ValidationProps } from 'src/utils/apply_validations';
import constants from 'src/utils/constants';
import theme from 'src/utils/theme';
import Text from './Text';

const styles = StyleSheet.create({
	input: {
		fontFamily: theme.fonts.satoshi_regular,
		color: theme.colors.text_900,
		fontSize: 16,
		borderWidth: 1,
		paddingHorizontal: 8,
	},
	label: {
		fontSize: 14,
		color: theme.colors.text_600,
		fontFamily: theme.fonts.satoshi_regular,
		lineHeight: 21,
		marginBottom: 5,
	},
	error: {
		fontSize: 14,
		color: theme.colors.error_500,
		textTransform: 'capitalize',
	},
});

interface Props extends TextInputProps {
	name: string;

	type?: any;
	validations?: ValidationProps;
	label?: string;
	inputProps?: any;
	defaultValue?: string;
	disabled?: boolean;
	input_height?: number;
	on_blur?: (id: string, text: string) => void;
	on_change?: (text: string) => void;
	left_element?: React.ReactElement | null;
	is_phone?: boolean;
	default_selected_country?: string;
	on_country_code_select?: (params: any) => void;
	custom_error_label?: string;
	hidden?: boolean;
	error_style?: any;
	on_focus?: (id: string) => void;
	container_style?: any;
}
const TextField = ({
	name,
	placeholder,
	validations,
	type = 'text',
	label,
	multiline,
	inputProps = {},
	style = {},
	container_style,
	defaultValue,
	disabled = false,
	input_height,
	on_blur,
	on_change,
	left_element = null,
	custom_error_label,
	hidden,
	error_style = {},
	on_focus = _.noop,
}: Props) => {
	const { control } = useFormContext();

	const handle_blur = (onBlur: any, value: string) => {
		onBlur();
		on_blur?.(name, value);
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={_.toString(defaultValue)}
			rules={apply_validations({
				name,
				label,
				custom_error_label,
				number: _.includes([constants.FORM_ELEMENTS.number, constants.FORM_ELEMENTS.percentage], type),
				allow_digits: _.includes([constants.FORM_ELEMENTS.percentage], type),
				...validations,
			})}
			render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
				const handle_change = (text: string) => {
					if (_.trim(text) === '' && _.size(text) > 0) {
						return;
					}
					let final_text: any = text;

					if (_.includes([constants.FORM_ELEMENTS.number, constants.FORM_ELEMENTS.percentage], type) && !_.isEmpty(text)) {
						if (final_text.length > 1) {
							final_text = text.replace(/^0+(?=\d)/, '');
						}
					}

					onChange(final_text);
					on_change?.(final_text);
				};
				return (
					<View style={[style, container_style, hidden && { display: 'none' }]}>
						{!_.isEmpty(label) && (
							<Text style={styles.label}>
								{label}
								{validations?.required && <Text style={{ color: theme.colors.error_main }}>*</Text>}
							</Text>
						)}

						<View style={{ width: '100%' }}>
							<TextInput
								ref={ref}
								value={value}
								onBlur={() => {
									handle_blur(onBlur, value);
								}}
								onChangeText={(text: string) => {
									handle_change(text);
								}}
								leftElement={left_element}
								isDisabled={disabled}
								isReadOnly={disabled}
								scrollEnabled={true}
								keyboardType={
									_.includes([constants.FORM_ELEMENTS.number, constants.FORM_ELEMENTS.percentage], type)
										? 'numeric'
										: 'default'
								}
								placeholder={placeholder}
								placeholderTextColor={theme.colors.text_400}
								focusOutlineColor={theme.colors.primary_600}
								style={[styles.input, { textAlignVertical: 'top' }]}
								borderRadius={6}
								autoCapitalize='sentences'
								showSoftInputOnFocus={true}
								size='lg'
								color={theme.colors.text_900}
								variant='outline'
								width={'100%'}
								borderColor={theme.colors.grey_400}
								height={input_height ? input_height : multiline ? 96 : 40}
								multiline={multiline}
								{...(!multiline && { returnKeyType: 'done' })}
								onFocus={() => {
									on_focus?.(name);
								}}
								autoCorrect={false}
								{...inputProps}
							/>
						</View>

						{error && <Text style={[styles.error, error_style]}>{error.message}</Text>}
					</View>
				);
			}}
		/>
	);
};

export default TextField;
