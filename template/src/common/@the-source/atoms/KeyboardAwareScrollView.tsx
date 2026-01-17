import { forwardRef } from 'react';
import {
	KeyboardAwareScrollView as RN_KeyboardAwareScrollView,
	// eslint-disable-next-line import/named
	KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { Platform } from 'react-native';

const KeyboardAwareScrollView = forwardRef((props: KeyboardAwareScrollViewProps, ref: any) => {
	return (
		<RN_KeyboardAwareScrollView
			ref={ref}
			enableOnAndroid={true}
			extraScrollHeight={Platform.OS === 'ios' ? 0 : 120}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			keyboardOpeningTime={300}
			{...props}>
			{props.children}
		</RN_KeyboardAwareScrollView>
	);
});

export default KeyboardAwareScrollView;
