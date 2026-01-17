import { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleProp, View, ViewStyle } from 'react-native';
import { Modal as RN_Paper_Modal, ModalProps, Portal } from 'react-native-paper';

interface Props extends ModalProps {
	children: any;
	on_close: () => void;

	style?: StyleProp<ViewStyle>;
	is_dismissable?: boolean;
}

const ModalComp = ({ children, visible, on_close, is_dismissable = true, style, ...rest }: Props) => {
	const [is_keyboard_open, set_is_keyboard_open] = useState(false);

	const onKeyboardChange = (_: any, is_showing: boolean) => {
		set_is_keyboard_open(is_showing);
	};

	useEffect(() => {
		const sub1 = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', (e) =>
			onKeyboardChange(e, false),
		);
		const sub2 = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', (e) =>
			onKeyboardChange(e, true),
		);

		return () => {
			sub1.remove();
			sub2.remove();
		};
	}, []);

	return (
		<Portal>
			<RN_Paper_Modal
				dismissable={is_dismissable && !is_keyboard_open}
				visible={visible}
				onDismiss={on_close}
				contentContainerStyle={[{ alignItems: 'center', justifyContent: 'center' }]}
				{...rest}>
				<View style={style}>{children}</View>
			</RN_Paper_Modal>
		</Portal>
	);
};

const Modal = ({ children, visible, ...rest }: Props) => {
	if (!visible) {
		return null;
	}

	return (
		<ModalComp visible={true} {...rest}>
			{children}
		</ModalComp>
	);
};

export default Modal;
