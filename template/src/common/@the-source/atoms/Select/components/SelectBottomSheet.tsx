import _ from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { shallowEqual } from 'react-redux';
import RadioButton from '../../RadioButton';

import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import BottomSheet from 'src/common/@the-source/molecules/BottomSheet';
import { useAppSelector } from 'src/store';
import constants from 'src/utils/constants';
import device from 'src/utils/device';
import theme from 'src/utils/theme';
import Button from '../../Button';
import Checkbox from '../../Checkbox';
import FlatList from '../../FlatList';
import Text from '../../Text';
import utils from 'src/utils/utils';

const SELECTION_STATE = {
	all_selected: 'all_selected',
	partially_selected: 'partially_selected',
	none: 'none',
};

interface Props {
	value: any;
	close: (value: any) => void;
	on_done: (param: any) => void;
	type: string;
	options: any;
	is_single_select: boolean;
	show_clear: boolean;

	header_text?: string;
}

interface SelectBottomSheetCompProps {
	options: any;
	is_single_select: boolean;
	SPACE: number;
	is_all_selected: string;
	select_all_products: () => void;
	show_clear: boolean;
	handle_reset_form: () => void;
	handle_done: () => void;
}

const styles = StyleSheet.create({
	footer: {
		borderTopColor: theme.colors.black_12,
		borderTopWidth: 1,
		alignItems: 'flex-end',
		paddingVertical: device.isTablet ? 10 : 8,
		justifyContent: 'flex-end',
		columnGap: 20,
		flexDirection: 'row',
	},
});

const SelectBottomSheetComp = ({
	options,
	is_single_select,
	SPACE,
	is_all_selected,
	select_all_products,
	show_clear,
	handle_reset_form,
	handle_done,
}: SelectBottomSheetCompProps) => {
	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={options}
				scrollEnabled={false}
				ListHeaderComponent={
					<>
						{!is_single_select && (
							<Pressable
								onPress={select_all_products}
								style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
								{is_all_selected === SELECTION_STATE.all_selected ? (
									<SvgImage
										name={ImageLink_keys.checkbox_active}
										width={22}
										height={22}
										style={{ marginRight: 8 }}
									/>
								) : is_all_selected === SELECTION_STATE.partially_selected ? (
									<SvgImage
										name={ImageLink_keys.checkbox_partial}
										width={22}
										height={22}
										style={{ marginRight: 8 }}
									/>
								) : (
									<SvgImage name={ImageLink_keys.checkbox} width={22} height={22} style={{ marginRight: 8 }} />
								)}
								<Text bold>Select all</Text>
							</Pressable>
						)}
					</>
				}
				style={{
					paddingHorizontal: SPACE,
					marginVertical: 20,
				}}
				renderItem={({ item }) => {
					return is_single_select ? (
						<RadioButton
							name={'value'}
							defaultValue={''}
							radiobox_value={item.value}
							label={item.label}
							container_styles={[{ paddingVertical: 10 }]}
							dont_allow_uncheck={true}
						/>
					) : (
						<Checkbox
							name={'value'}
							defaultValue={[]}
							checkbox_wrapper_styles={[{ paddingVertical: 10 }]}
							is_array={true}
							checkbox_value={item.value}
							label={item.label}
							size={22}
						/>
					);
				}}
			/>

			{show_clear || !is_single_select ? (
				<View style={[styles.footer, { paddingHorizontal: SPACE }]}>
					{show_clear && (
						<Button
							title='Clear'
							width={166}
							style={[
								{ height: 45, backgroundColor: theme.colors.primary_50, borderWidth: 0 },
								!device.isTablet && { flex: is_single_select ? 0 : 1 },
							]}
							text_style={{ fontSize: 16, color: theme.colors.primary_main }}
							text_props={{ medium: false, bold: true }}
							onPress={handle_reset_form}
						/>
					)}
					{!is_single_select && (
						<Button
							title='Done'
							width={166}
							style={[{ height: 45 }, !device.isTablet && { flex: 1 }]}
							text_style={{ fontSize: 16 }}
							text_props={{ medium: false, bold: true }}
							onPress={handle_done}
						/>
					)}
				</View>
			) : null}
		</View>
	);
};

const SelectBottomSheet = (props: Props) => {
	const { header_text, close, value, type, options, is_single_select, on_done, show_clear } = props;

	const is_mounted = useRef(false);

	const { redux_device_info } = useAppSelector(
		(state) => ({
			redux_device_info: state.app.redux_device_info,
		}),
		shallowEqual,
	);

	const methods = useForm({
		defaultValues: {
			value: type === constants.FORM_ELEMENTS.multi_select ? (_.isEmpty(value) ? [] : value.split(',')) : value,
		},
	});

	const { handleSubmit, watch, reset } = methods;

	const form_value = watch('value');

	const handle_done = handleSubmit((data: any) => {
		const final_value = type === constants.FORM_ELEMENTS.multi_select ? data.value.join(',') : data.value;
		on_done(final_value);
		close(final_value);
	});

	const handle_reset_form = () => {
		reset({
			value: type === constants.FORM_ELEMENTS.multi_select ? [] : '',
		});
	};

	useEffect(() => {
		if (!is_mounted.current) {
			return;
		}

		if (!is_single_select) {
			return;
		}

		handle_done();
	}, [form_value]);

	const is_all_selected = useMemo(() => {
		if (_.size(options) === _.size(form_value)) {
			return SELECTION_STATE.all_selected;
		}

		if (_.size(form_value) > 0) {
			return SELECTION_STATE.partially_selected;
		}
		return SELECTION_STATE.none;
	}, [form_value]);

	const select_all_products = () => {
		reset({
			value: is_all_selected === SELECTION_STATE.all_selected ? [] : options.map((option: any) => option.value),
		});
	};

	useEffect(() => {
		is_mounted.current = true;
		Keyboard.dismiss();
	}, []);

	const { SPACE } = utils.get_responsive_styles(redux_device_info);

	return (
		<BottomSheet is_open={true} on_close={() => close(value)} header_text={header_text}>
			<FormProvider {...methods}>
				<SelectBottomSheetComp
					options={options}
					is_single_select={is_single_select}
					SPACE={SPACE}
					is_all_selected={is_all_selected}
					select_all_products={select_all_products}
					show_clear={show_clear}
					handle_reset_form={handle_reset_form}
					handle_done={handle_done}
				/>
			</FormProvider>
		</BottomSheet>
	);
};

export default SelectBottomSheet;
