import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import _ from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';

import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import theme from 'src/utils/theme';
import apply_validations, { ValidationProps } from 'src/utils/apply_validations';
import Text from '../Text';
import Label from '../Label';
import SelectBottomSheet from './components/SelectBottomSheet';
import constants from 'src/utils/constants';
import { show_toast } from 'src/reducers/app';

const styles = StyleSheet.create({
	placeholder: {
		fontSize: 16,
		color: theme.colors.text_400,
	},
	value: {
		color: theme.colors.text_900,
	},
	label: {
		fontSize: 14,
		color: theme.colors.text_600,
		marginBottom: 4,
		fontFamily: theme.fonts.satoshi_regular,
		lineHeight: 21,
	},
	error: {
		fontSize: 14,
		color: theme.colors.error_500,
		textTransform: 'capitalize',
	},
	chips: {
		flexDirection: 'row',
		gap: 5,
		flexWrap: 'wrap',
		width: '90%',
	},
	disabled_input: {
		fontFamily: theme.fonts.satoshi_regular,
		color: theme.colors.text_900,
		fontSize: 16,
	},
});

interface Props {
	options: any[];
	name: string;

	style?: any;
	type?: string;
	validations?: ValidationProps;
	custom_error_label?: string;
	label?: string;
	placeholder?: string;
	defaultValue?: string;
	disabled?: boolean;
	after_change?: (name: string, value: any) => void;
	hidden?: boolean;
	custom_header_text?: string;
	show_clear?: boolean;
	on_blur?: (name: string, value: any) => void;
	container_style?: any;
}

const Select = ({
	name,
	custom_error_label,
	label,
	placeholder,
	options,
	validations,
	type = constants.FORM_ELEMENTS.select,
	defaultValue,
	disabled = false,
	container_style,
	style,
	after_change,
	hidden,
	custom_header_text,
	show_clear = true,
	on_blur = _.noop,
}: Props) => {
	const [is_open, set_is_open] = React.useState(false);

	const is_single_select = _.includes(
		[
			constants.FORM_ELEMENTS.select,
			constants.FORM_ELEMENTS.single_select,
			constants.FORM_ELEMENTS.country_single_select,
			constants.FORM_ELEMENTS.state_single_select,
			constants.FORM_ELEMENTS.payment_terms,
		],
		type,
	);

	const { control } = useFormContext();

	const final_label = label || custom_header_text;

	const handle_close = (value: any) => {
		set_is_open(false);
		on_blur?.(name, value);
	};

	const handle_open = () => {
		if (type === constants.FORM_ELEMENTS.state_single_select && _.isEmpty(options)) {
			show_toast({
				title: 'Please select country',
				type: 'warning',
			});
			return;
		}
		set_is_open(true);
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={apply_validations({ name, label, custom_error_label, ...validations })}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				let selected_value: string | string[] = type === constants.FORM_ELEMENTS.multi_select ? [] : '';

				if (is_single_select) {
					selected_value = _.get(
						_.find(options, (item) => item.value === value),
						'label',
						value,
					);
				} else {
					const values = _.split(value, ',') ?? [];
					_.forEach(options, (item) => {
						const selected_item_value = _.find(values, (selected_option) => selected_option === item.value);
						if (selected_item_value) {
							selected_value = [...selected_value, item.label];
						}
					});
				}

				return (
					<View style={container_style}>
						{!_.isEmpty(label) && (
							<Text style={styles.label}>
								{label}
								{validations?.required && <Text style={{ color: theme.colors.error_main }}>*</Text>}
							</Text>
						)}

						<Pressable
							onPress={handle_open}
							disabled={disabled}
							style={[disabled && { opacity: 0.6 }, hidden && { display: 'none' }]}>
							<View
								style={[
									{
										backgroundColor: theme.colors.white,
										alignItems: 'center',
										flexDirection: 'row',
										justifyContent: 'space-between',
										borderColor: error ? theme.colors.error_500 : theme.colors.grey_400,
										borderRadius: 8,
										borderWidth: 1,
										paddingHorizontal: 8,
										height: 40,
									},
									style,
								]}>
								<View style={{ flex: 1, marginRight: 5 }}>
									{!selected_value || selected_value.length === 0 ? (
										<Text style={styles.placeholder}>{placeholder}</Text>
									) : (
										<>
											{typeof selected_value === 'string' ? (
												<Text style={[styles.placeholder, selected_value ? styles.value : {}]}>
													{selected_value}
												</Text>
											) : (
												<View style={styles.chips}>
													{_.map(selected_value, (text, key) => (
														<Label show_dot={false} key={`label${key}`} text={text} />
													))}
												</View>
											)}
										</>
									)}
								</View>
								<SvgImage name={ImageLink_keys.chevron_down} />
							</View>
						</Pressable>

						{is_open && (
							<SelectBottomSheet
								header_text={final_label ? `Select ${final_label}` : undefined}
								is_single_select={is_single_select}
								options={options}
								value={value}
								type={type}
								close={handle_close}
								on_done={(new_value: any) => {
									onChange(new_value);
									after_change?.(name, new_value);
								}}
								show_clear={show_clear}
							/>
						)}

						{error ? <Text style={styles.error}>{error?.message || ''}</Text> : null}
					</View>
				);
			}}
		/>
	);
};

export default Select;
