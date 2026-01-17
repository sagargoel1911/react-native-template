import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { shallowEqual } from 'react-redux';

import Loader from 'src/common/@the-source/atoms/Loader';
import RouteNames from '../RouteNames';
import { useAppSelector } from 'src/store';
import TabBar from '../Tab';
import theme from 'src/utils/theme';
import GenericModal from './components/GenericModal';
import CustomToast from 'src/common/@the-source/molecules/CustomToast';

const Stack = createNativeStackNavigator();

const AppStack = () => {
	const { is_loading } = useAppSelector(
		(state) => ({
			is_loading: state.app.is_loading,
		}),
		shallowEqual,
	);

	return (
		<>
			{is_loading ? <Loader /> : null}
			<Stack.Navigator
				initialRouteName={RouteNames.MainApp}
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.white },
					animation: 'slide_from_right',
				}}>
				<Stack.Screen component={TabBar} name={RouteNames.MainApp} />
			</Stack.Navigator>
			<GenericModal />
			<CustomToast />
		</>
	);
};

export default AppStack;
