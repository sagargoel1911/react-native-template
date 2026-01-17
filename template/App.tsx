import { Dimensions, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

import ErrorBoundary from 'src/common/ErrorBoundary';
import theme from 'src/utils/theme';
import store, { useAppDispatch } from 'src/store';
import { update_device_info } from 'src/reducers/app';
import AppStack from 'src/navigation/AppStack/AppStack';
import { get_device_info, set_device_info } from 'src/utils/device';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const PrimaryComponent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
			const updated_device_info = get_device_info({ width, height });
			set_device_info({ width, height });
			dispatch(update_device_info(updated_device_info));
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
				<AppStack />
			</SafeAreaView>
		</>
	);
};

const App = () => {
	return (
		<Provider store={store}>
			<ErrorBoundary>
				{/* used to catch errors and show a fallback UI */}
				<GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.white }}>
					<BottomSheetModalProvider>
						<NavigationContainer>
							<PaperProvider>
								<SafeAreaProvider>
									{/* Use this to get insets to get the safe area info using useSafeAreaInsets hook */}
									<StatusBar backgroundColor={theme.colors.white} barStyle={'dark-content'} />

									<PrimaryComponent />
								</SafeAreaProvider>
							</PaperProvider>
						</NavigationContainer>
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			</ErrorBoundary>
		</Provider>
	);
};

export default App;
