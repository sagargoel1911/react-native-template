import { forwardRef } from 'react';
import { ScrollView as RNGH_ScrollView } from 'react-native-gesture-handler';
import { ScrollViewProps } from 'react-native/types';

interface Props extends ScrollViewProps {}

const ScrollView = forwardRef(({ children, ...rest }: Props, ref: any) => {
	return (
		<RNGH_ScrollView
			ref={ref}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps='handled'
			bounces={false}
			{...rest}>
			{children}
		</RNGH_ScrollView>
	);
});

export default ScrollView;
