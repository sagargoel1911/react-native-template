import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import _ from 'lodash';

import Text from 'src/common/@the-source/atoms/Text';
import theme from 'src/utils/theme';
import Button from 'src/common/@the-source/atoms/Button';
import BottomSheet from 'src/common/@the-source/molecules/BottomSheet';
import Modal from 'src/common/@the-source/atoms/Modal';
import Toggle from 'src/common/@the-source/atoms/Toggle';
import Label from 'src/common/@the-source/atoms/Label';
import Menu from 'src/common/@the-source/atoms/Menu';
import CheckboxWithoutController from 'src/common/@the-source/atoms/CheckboxWithoutController';
import FormBuilder from 'src/common/@the-source/molecules/FormBuilder';
import constants from 'src/utils/constants';
import device from 'src/utils/device';
import { show_generic_modal, show_toast, show_loader, hide_loader } from 'src/reducers/app';
import { useAppDispatch, useAppSelector } from 'src/store';
import utils from 'src/utils/utils';
import ScrollView from 'src/common/@the-source/atoms/ScrollView';
import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
	label_container: {
		flexDirection: 'row',
		gap: 10,
		flexWrap: 'wrap',
	},
	form_section: {
		gap: 20,
		paddingVertical: 20,
	},
	form_title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		color: theme.colors.text_900,
	},
	form_row: {
		flexDirection: device.isTablet ? 'row' : 'column',
		gap: 15,
		flexWrap: 'wrap',
	},
	modal_header: {
		paddingHorizontal: 24,
		paddingVertical: 16,
		backgroundColor: theme.colors.white,
		borderBottomWidth: 1,
		borderColor: theme.colors.border_gray,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	modal_footer: {
		paddingHorizontal: 24,
		paddingVertical: 16,
		backgroundColor: theme.colors.white,
		borderTopWidth: 1,
		borderColor: theme.colors.border_gray,
	},
});

const Home = () => {
	const { redux_device_info } = useAppSelector(
		(state) => ({
			redux_device_info: state.app.redux_device_info,
		}),
		shallowEqual,
	);

	const [is_bottom_sheet_open, set_is_bottom_sheet_open] = useState<boolean>(false);
	const [is_modal_open, set_is_modal_open] = useState<boolean>(false);
	const [is_toggle_checked, set_is_toggle_checked] = useState<boolean>(false);
	const [checkbox_status, set_checkbox_status] = useState<'unchecked' | 'checked' | 'indeterminate'>('unchecked');
	const [show_form, set_show_form] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	// Form setup for FormBuilder demonstration
	const form_methods = useForm({
		defaultValues: {
			email: '',
			text: '',
			number: '',
			url: '',
			percentage: '',
			long_text: '',
			textarea: '',
			select: '',
			single_select: '',
			multi_select: '',
			multi_select_array: '',
			country_single_select: '',
			state_single_select: '',
			payment_terms: '',
			checkbox: false,
		},
	});

	// Sample attributes demonstrating all FormBuilder types
	const form_attributes = [
		{
			id: 'email',
			name: 'Email Address',
			type: constants.FORM_ELEMENTS.email,
			required: true,
			value: '',
			options: [],
			disabled: false,
		},
		{
			id: 'text',
			name: 'Text Input',
			type: constants.FORM_ELEMENTS.text,
			required: true,
			value: '',
			options: [],
			disabled: false,
		},
		{
			id: 'number',
			name: 'Number Input',
			type: constants.FORM_ELEMENTS.number,
			required: false,
			value: '',
			options: [],
			disabled: false,
		},
		{
			id: 'url',
			name: 'URL Input',
			type: constants.FORM_ELEMENTS.url,
			required: false,
			value: '',
			options: [],
			disabled: false,
		},
		{
			id: 'percentage',
			name: 'Percentage',
			type: constants.FORM_ELEMENTS.percentage,
			required: false,
			value: '',
			options: [],
			disabled: false,
		},
		{
			id: 'long_text',
			name: 'Long Text',
			type: constants.FORM_ELEMENTS.long_text,
			required: false,
			value: '',
			options: [],
			disabled: false,
		},
		{
			id: 'textarea',
			name: 'Textarea',
			type: constants.FORM_ELEMENTS.textarea,
			required: false,
			value: '',
			options: [],
			disabled: false,
		},
		{
			id: 'select',
			name: 'Select Dropdown',
			type: constants.FORM_ELEMENTS.select,
			required: false,
			value: '',
			options: [
				{ label: 'Option 1', value: 'option1' },
				{ label: 'Option 2', value: 'option2' },
				{ label: 'Option 3', value: 'option3' },
			],
			disabled: false,
		},
		{
			id: 'single_select',
			name: 'Single Select',
			type: constants.FORM_ELEMENTS.single_select,
			required: false,
			value: '',
			options: [
				{ label: 'Choice A', value: 'choice_a' },
				{ label: 'Choice B', value: 'choice_b' },
				{ label: 'Choice C', value: 'choice_c' },
			],
			disabled: false,
		},
		{
			id: 'multi_select',
			name: 'Multi Select',
			type: constants.FORM_ELEMENTS.multi_select,
			required: false,
			value: '',
			options: [
				{ label: 'Item 1', value: 'item1' },
				{ label: 'Item 2', value: 'item2' },
				{ label: 'Item 3', value: 'item3' },
				{ label: 'Item 4', value: 'item4' },
			],
			disabled: false,
		},
		{
			id: 'multi_select_array',
			name: 'Multi Select Array',
			type: constants.FORM_ELEMENTS.multi_select_array,
			required: false,
			value: '',
			options: [
				{ label: 'Array Item 1', value: 'array_item1' },
				{ label: 'Array Item 2', value: 'array_item2' },
				{ label: 'Array Item 3', value: 'array_item3' },
			],
			disabled: false,
		},
		{
			id: 'country_single_select',
			name: 'Country Select',
			type: constants.FORM_ELEMENTS.country_single_select,
			required: false,
			value: '',
			options: [
				{ label: 'United States', value: 'us' },
				{ label: 'Canada', value: 'ca' },
				{ label: 'United Kingdom', value: 'uk' },
				{ label: 'India', value: 'in' },
			],
			disabled: false,
		},
		{
			id: 'state_single_select',
			name: 'State Select',
			type: constants.FORM_ELEMENTS.state_single_select,
			required: false,
			value: '',
			options: [
				{ label: 'California', value: 'ca' },
				{ label: 'New York', value: 'ny' },
				{ label: 'Texas', value: 'tx' },
			],
			disabled: false,
		},
		{
			id: 'payment_terms',
			name: 'Payment Terms',
			type: constants.FORM_ELEMENTS.payment_terms,
			required: false,
			value: '',
			options: [
				{ label: 'Net 30', value: 'net_30' },
				{ label: 'Net 60', value: 'net_60' },
				{ label: 'Due on Receipt', value: 'due_on_receipt' },
			],
			disabled: false,
		},
		{
			id: 'checkbox',
			name: 'Checkbox Field',
			type: constants.FORM_ELEMENTS.checkbox,
			required: false,
			value: false,
			options: [],
			disabled: false,
		},
	];

	const handle_form_submit = (data: any) => {
		dispatch(
			show_toast({
				title: 'Form Submitted',
				message: JSON.stringify(data, null, 2),
				type: 'success',
			}),
		);
	};

	const handle_open_bottom_sheet = () => {
		set_is_bottom_sheet_open(true);
	};

	const handle_close_bottom_sheet = () => {
		set_is_bottom_sheet_open(false);
	};

	const handle_open_generic_modal = () => {
		dispatch(
			show_generic_modal({
				header_text: 'Generic Modal',
				body_text: 'This is a generic modal',
				on_confirm: () => {},
				on_secondary: () => {},
				primary_btn_text: 'Confirm',
				secondary_btn_text: 'Cancel',
				primary_btn_styles: {},
				secondary_btn_styles: {},
			}),
		);
	};

	const handle_open_toast = () => {
		dispatch(
			show_toast({
				title: 'Toast',
				message: 'This is a toast',
			}),
		);
	};

	const handle_show_loader = () => {
		dispatch(show_loader());
		setTimeout(() => {
			dispatch(hide_loader());
		}, 2000);
	};

	const handle_open_modal = () => {
		set_is_modal_open(true);
	};

	const handle_close_modal = () => {
		set_is_modal_open(false);
	};

	const handle_open_success_toast = () => {
		dispatch(
			show_toast({
				title: 'Success',
				message: 'This is a success toast',
				type: 'success',
			}),
		);
	};

	const handle_open_error_toast = () => {
		dispatch(
			show_toast({
				title: 'Error',
				message: 'This is an error toast',
				type: 'error',
			}),
		);
	};

	const handle_open_warning_toast = () => {
		dispatch(
			show_toast({
				title: 'Warning',
				message: 'This is a warning toast',
				type: 'warning',
			}),
		);
	};

	const handle_checkbox_press = () => {
		if (checkbox_status === 'unchecked') {
			set_checkbox_status('checked');
		} else if (checkbox_status === 'checked') {
			set_checkbox_status('indeterminate');
		} else {
			set_checkbox_status('unchecked');
		}
	};

	const menu_items = [
		{
			title: 'Option 1',
			on_press: () => {
				dispatch(show_toast({ title: 'Menu', message: 'Option 1 selected' }));
			},
		},
		{
			title: 'Option 2',
			on_press: () => {
				dispatch(show_toast({ title: 'Menu', message: 'Option 2 selected' }));
			},
		},
		{
			title: 'Option 3',
			on_press: () => {
				dispatch(show_toast({ title: 'Menu', message: 'Option 3 selected' }));
			},
		},
	];

	const { SPACE } = utils.get_responsive_styles(redux_device_info);

	return (
		<>
			<ScrollView
				style={[styles.container, { paddingHorizontal: SPACE }]}
				contentContainerStyle={{ rowGap: 30, paddingVertical: 30 }}>
				<Button title='Open Bottom Sheet' onPress={handle_open_bottom_sheet} />
				<Button title='Open Generic Modal' onPress={handle_open_generic_modal} />
				<Button title='Open Toast' onPress={handle_open_toast} />
				<Button title='Show Loader' onPress={handle_show_loader} />
				<Button title='Open Modal' onPress={handle_open_modal} />
				<Button title='Success Toast' onPress={handle_open_success_toast} />
				<Button title='Error Toast' onPress={handle_open_error_toast} />
				<Button title='Warning Toast' onPress={handle_open_warning_toast} />
				<Toggle label='Toggle Switch' is_checked={is_toggle_checked} on_change={set_is_toggle_checked} />
				<View style={styles.label_container}>
					<Label text='Label 1' style={{ backgroundColor: theme.colors.primary_500 }} />
					<Label text='Label 2' show_dot={false} />
					<Label text='Label 3' style={{ backgroundColor: theme.colors.info_400 }} />
				</View>
				<Menu
					menu_items={menu_items}
					anchor={
						<View style={{ padding: 10, borderRadius: 10, borderWidth: 1, alignSelf: 'flex-start' }}>
							<Text>Menu</Text>
						</View>
					}
				/>
				<CheckboxWithoutController
					label='Checkbox Without Controller'
					status={checkbox_status}
					onPress={handle_checkbox_press}
				/>
				<Button
					title={show_form ? 'Hide Form Builder Demo' : 'Show Form Builder Demo'}
					onPress={() => set_show_form(!show_form)}
				/>

				{show_form && (
					<View style={styles.form_section}>
						<Text style={styles.form_title}>FormBuilder - All Types Demonstration</Text>
						<FormProvider {...form_methods}>
							<View style={styles.form_row}>
								{_.map(form_attributes, (attribute) => (
									<FormBuilder
										key={attribute.id}
										type={attribute.type}
										name={attribute.id}
										label={attribute.name}
										placeholder={attribute.name}
										defaultValue={attribute.value}
										options={attribute.options}
										disabled={attribute.disabled}
										validations={{
											required: Boolean(attribute.required),
											email: attribute.type === constants.FORM_ELEMENTS.email,
											number: attribute.type === constants.FORM_ELEMENTS.number,
										}}
										container_style={device.isTablet ? { width: 300 } : { width: '100%' }}
									/>
								))}
							</View>
							<Button
								title='Submit Form'
								onPress={form_methods.handleSubmit(handle_form_submit)}
								style={{ marginTop: 20 }}
							/>
						</FormProvider>
					</View>
				)}
			</ScrollView>
			<BottomSheet is_open={is_bottom_sheet_open} on_close={handle_close_bottom_sheet}>
				<View style={{ padding: 20, gap: 20 }}>
					<Text>Bottom Sheet</Text>
				</View>
			</BottomSheet>
			<Modal visible={is_modal_open} on_close={handle_close_modal} style={{ width: device.isTablet ? 420 : '90%' }}>
				<View style={styles.modal_header}>
					<Text style={{ fontSize: 18 }}>Custom Modal</Text>
					<Pressable onPress={handle_close_modal}>
						<SvgImage name={ImageLink_keys.close} height={24} width={24} />
					</Pressable>
				</View>
				<View style={{ paddingHorizontal: 24, paddingVertical: 16, backgroundColor: theme.colors.white }}>
					<Text>This is a custom modal component</Text>
				</View>
				<View style={styles.modal_footer}>
					<Button title='Close' onPress={handle_close_modal} />
				</View>
			</Modal>
		</>
	);
};

export default Home;
