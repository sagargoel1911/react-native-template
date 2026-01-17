import { StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { shallowEqual } from 'react-redux';
import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import _ from 'lodash';

import Button from 'src/common/@the-source/atoms/Button';
import Text from 'src/common/@the-source/atoms/Text';
import { useAppDispatch, useAppSelector } from 'src/store';
import device from 'src/utils/device';
import theme from 'src/utils/theme';
import { hide_generic_modal } from 'src/reducers/app';
import Modal from 'src/common/@the-source/atoms/Modal';

const styles = StyleSheet.create({
	modal_wrapper: {
		width: device.isTablet ? 420 : '90%',
		backgroundColor: theme.colors.white,
		borderRadius: 10,
	},
	header_container: {
		borderColor: theme.colors.grey_300,
		borderBottomWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		gap: device.isTablet ? 20 : 8,
		borderColor: theme.colors.grey_300,
		borderTopWidth: 1,
		paddingHorizontal: 24,
		paddingVertical: 16,
	},
	outlined_btn: {
		borderColor: theme.colors.grey_600,
		borderWidth: 1,
		width: '47%',
	},
	outlined_btn_text: {
		fontFamily: theme.fonts.satoshi_bold,
		fontSize: device.isTablet ? 14 : 12,
		color: theme.colors.secondary,
	},
	alert_text: {
		fontSize: device.isTablet ? 14 : 12,
		color: theme.colors.text_900,
		lineHeight: 21,
	},
	alert_title: {
		fontSize: device.isTablet ? 16 : 14,
		color: theme.colors.primary_text,
		paddingRight: 20,
	},
	primary_btn: {
		width: '47%',
		paddingHorizontal: 0,
	},
	primary_btn_text: {
		fontFamily: theme.fonts.satoshi_bold,
		fontSize: device.isTablet ? 14 : 12,
		color: theme.colors.white,
	},
});

const GenericModal = () => {
	const { generic_modal_details } = useAppSelector(
		(state) => ({
			generic_modal_details: state.app.generic_modal_details,
		}),
		shallowEqual,
	);

	const {
		is_open,
		header_text,
		body_text,
		on_confirm,
		on_secondary,
		secondary_btn_text,
		primary_btn_text,
		secondary_btn_styles,
		secondary_btn_text_styles,
		primary_btn_styles,
		primary_btn_text_styles,
		body_comp,
		should_close = true,
		wrapper_styles,
		show_footer = true,
		custom_modal_wrapper_styles,
		body_component_styles,
		footer_styles,
		header_comp,
		on_close,
	} = generic_modal_details;

	const dispatch = useAppDispatch();

	const handle_close = () => {
		on_close?.();
		if (should_close) {
			dispatch(hide_generic_modal());
		}
	};

	const handle_confirm = async () => {
		handle_close();
		await on_confirm?.();
	};

	const handle_secondary = async () => {
		handle_close();
		await on_secondary?.();
	};

	if (!is_open) {
		return null;
	}

	return (
		<Modal visible={true} on_close={handle_close} style={[{ alignItems: 'center', justifyContent: 'center' }, wrapper_styles]}>
			<View style={[styles.modal_wrapper, custom_modal_wrapper_styles]}>
				<View style={styles.header_container}>
					{header_comp ? (
						header_comp
					) : (
						<Text bold style={[styles.alert_title, { flex: 1 }]}>
							{header_text}
						</Text>
					)}
					{should_close && (
						<TouchableRipple onPress={handle_close}>
							<SvgImage name={ImageLink_keys.close} />
						</TouchableRipple>
					)}
				</View>
				<View style={[{ paddingHorizontal: 16, paddingVertical: 16 }, body_component_styles]}>
					{body_comp ? body_comp : <Text style={styles.alert_text}>{body_text}</Text>}
				</View>

				{show_footer && (
					<View style={[styles.footer, footer_styles]}>
						{!_.isEmpty(secondary_btn_text) ? (
							<Button
								style={[styles.outlined_btn, secondary_btn_styles]}
								text_style={[styles.outlined_btn_text, secondary_btn_text_styles]}
								outline
								title={secondary_btn_text}
								onPress={handle_secondary}
							/>
						) : (
							<View style={{ flex: 1 }} />
						)}

						{!_.isEmpty(primary_btn_text) ? (
							<Button
								style={[styles.primary_btn, primary_btn_styles]}
								text_style={[styles.primary_btn_text, primary_btn_text_styles]}
								title={primary_btn_text}
								onPress={handle_confirm}
							/>
						) : (
							<View style={{ flex: 1 }} />
						)}
					</View>
				)}
			</View>
		</Modal>
	);
};

export default GenericModal;
