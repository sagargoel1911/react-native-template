import _ from 'lodash';
import React, { forwardRef } from 'react';
import { Pressable, StyleSheet, TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import theme from 'src/utils/theme';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
	},
});

interface Props extends TextInputProps {
	show_clear_button?: boolean;
	left_comp?: React.ReactElement;
	right_comp?: React.ReactElement | null;
	text_input_styles?: any;
}

const CustomTextInput = forwardRef(
	(
		{ style, onChangeText, value, show_clear_button = false, left_comp, text_input_styles, right_comp, ...rest }: Props,
		ref: any,
	) => {
		const handle_clear = () => {
			onChangeText?.('');
		};

		return (
			<View style={[styles.container, style]}>
				{left_comp ? left_comp : null}
				<TextInput
					ref={ref}
					style={[
						{
							fontFamily: theme.fonts.satoshi_regular,
							flex: 1,
							color: theme.colors.black,
							height: '100%',
						},
						text_input_styles,
					]}
					value={value}
					onChangeText={(text) => {
						if (text === ' ') {
							return;
						}
						onChangeText?.(text);
					}}
					autoFocus={false}
					showSoftInputOnFocus={true}
					autoCorrect={false}
					returnKeyType='done'
					{...rest}
				/>
				{show_clear_button && !_.isEmpty(value) && (
					<Pressable onPress={handle_clear}>
						<SvgImage name={ImageLink_keys.cross} width={30} height={30} />
					</Pressable>
				)}
				{right_comp ? right_comp : null}
			</View>
		);
	},
);

export default CustomTextInput;
