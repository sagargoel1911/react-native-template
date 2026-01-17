import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';
import _ from 'lodash';

import { get_device_info } from 'src/utils/device';

const { width, height } = Dimensions.get('window');

const initial_toast_details = {
	is_open: false,
	title: '',
	message: '',
	type: '',
	duration: 3000,
};

export const inital_generic_modal_details = {
	is_open: false,
	header_text: '',
	body_text: '',
	on_confirm: _.noop,
	on_secondary: _.noop,
	secondary_btn_text: '',
	primary_btn_text: '',
	secondary_btn_styles: undefined,
	secondary_btn_text_styles: undefined,
	primary_btn_styles: undefined,
	primary_btn_text_styles: undefined,
	body_comp: null,
	should_close: true,
	wrapper_styles: undefined,
	show_footer: true,
	custom_modal_wrapper_styles: undefined,
	body_component_styles: undefined,
	footer_styles: undefined,
	header_comp: null,
	on_close: _.noop,
};

const initialState = {
	is_loading: false,
	redux_device_info: get_device_info({ width, height }),
	toast_details: _.cloneDeep(initial_toast_details),
	generic_modal_details: _.cloneDeep(inital_generic_modal_details),
};

const app = createSlice({
	name: 'app',
	initialState,
	reducers: {
		show_loader: (state) => {
			state.is_loading = true;
		},
		hide_loader: (state) => {
			state.is_loading = false;
		},
		update_device_info: (state, action) => {
			state.redux_device_info = get_device_info(action.payload);
		},
		show_toast: (state, action) => {
			state.toast_details = {
				..._.cloneDeep(initial_toast_details),
				..._.cloneDeep(action.payload),
				is_open: true,
			};
		},
		hide_toast: (state) => {
			state.toast_details = _.cloneDeep(initial_toast_details);
		},
		show_generic_modal: (state, action) => {
			state.generic_modal_details = {
				..._.cloneDeep(inital_generic_modal_details),
				..._.cloneDeep(action.payload),
				is_open: true,
			};
		},
		hide_generic_modal: (state) => {
			state.generic_modal_details = _.cloneDeep(inital_generic_modal_details);
		},
	},
});

export const { show_loader, hide_loader, update_device_info, show_toast, hide_toast, show_generic_modal, hide_generic_modal } =
	app.actions;
export default app.reducer;
