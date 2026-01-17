import { Pressable, View } from 'react-native';
import React, { ReactNode, useEffect, useMemo, useRef } from 'react';

import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import SvgImage from 'src/common/SvgImage';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import Text from '../atoms/Text';
import _ from 'lodash';
import theme from 'src/utils/theme';

interface Props {
	children: ReactNode;
	on_close: () => void;
	is_open: boolean;

	header_text?: string;
}

const BottomSheet = ({ children, on_close, is_open, header_text }: Props) => {
	const bottom_sheet_ref = useRef<BottomSheetModal>(null);

	const snap_points = useMemo(() => ['75%'], []);

	const handle_close = () => {
		bottom_sheet_ref.current?.dismiss();

		on_close();
	};

	useEffect(() => {
		if (is_open) {
			bottom_sheet_ref.current?.present();
		}
	}, [is_open]);

	return (
		<BottomSheetModal
			ref={bottom_sheet_ref}
			index={is_open ? 0 : -1} // closed initially
			snapPoints={snap_points}
			enableDynamicSizing={false}
			backdropComponent={(props) => (
				<BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.1} onPress={handle_close} />
			)}>
			<BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottomWidth: 1,
						borderBottomColor: theme.colors.black_12,
						paddingBottom: 16,
						paddingHorizontal: 16,
					}}>
					<View>
						{!_.isEmpty(header_text) && (
							<Text style={{ fontSize: 20 }} bold>
								{header_text}
							</Text>
						)}
					</View>
					<Pressable hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} onPress={handle_close}>
						<SvgImage name={ImageLink_keys.close} />
					</Pressable>
				</View>
				{children}
			</BottomSheetScrollView>
		</BottomSheetModal>
	);
};

export default BottomSheet;
