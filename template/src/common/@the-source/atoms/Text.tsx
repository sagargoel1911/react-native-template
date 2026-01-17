import { Text as RNText, TextProps } from 'react-native';

import theme from 'src/utils/theme';

interface Props extends TextProps {
	children: any;

	bold?: boolean;
	medium?: boolean;
}

const Text = ({ style, bold, medium, children, ...rest }: Props) => {
	let fontFamily = theme.fonts.satoshi_regular;

	if (medium) {
		fontFamily = theme.fonts.satoshi_medium;
	 }

	if (bold) {
		fontFamily = theme.fonts.satoshi_bold;
	 }

	return (
		<RNText
			style={[
				{
		 			fontSize: 14,
					fontFamily,
					color: theme.colors.black,
				},
				style,
			]}
			{...rest}>
			{children}
		</RNText>
	);
};

export default Text;
