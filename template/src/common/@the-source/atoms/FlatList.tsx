import { forwardRef } from 'react';
import { FlatList as RN_FlatList, FlatListProps } from 'react-native';

const FlatList = forwardRef((props: FlatListProps<any>, ref: any) => {
	return (
		<RN_FlatList
			ref={ref}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps='handled'
			bounces={false}
			{...props}
		/>
	);
});

export default FlatList;
