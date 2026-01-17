import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import _ from 'lodash';
import { shallowEqual } from 'react-redux';

import { TabRoutes } from './RouteNames';
import { ImageLink_keys } from 'src/assets/images/ImageLinks';
import SvgImage from 'src/common/SvgImage';
import Text from 'src/common/@the-source/atoms/Text';
import theme from 'src/utils/theme';
import device from 'src/utils/device';
import Home from 'src/screens/Home';
import Contact from 'src/screens/Contact';
import About from 'src/screens/About';
import { useAppSelector } from 'src/store';
import utils from 'src/utils/utils';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
	wrapper: {
		shadowColor: theme.colors.black,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 30,
		elevation: 5,
		paddingBottom: 5,

		backgroundColor: theme.colors.white,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 8,
	},
	item_wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
	},
	item: {
		flexDirection: device.isTablet ? 'row' : 'column',
		alignItems: 'center',
		gap: 4,
	},
	text: {
		color: theme.colors.grey_500,
		fontSize: device.isTablet ? 14 : 10,
	},
	text_active: {
		color: theme.colors.primary_500,
	},
});

interface Props extends BottomTabBarProps {
	redux_device_info: any;
	user_permissions: any;
}

const TabView = ({ state, navigation }: Props) => {
	const { redux_device_info } = useAppSelector(
		(redux_state) => ({
			redux_device_info: redux_state.app.redux_device_info,
		}),
		shallowEqual,
	);

	const handle_click = (tabRoute: any, isFocused: boolean) => {
		if (!isFocused) {
			navigation.navigate(tabRoute.name);
		}
	};

	const { SPACE } = utils.get_responsive_styles(redux_device_info);

	return (
		<SafeAreaView>
			<View style={[styles.wrapper, { paddingHorizontal: SPACE }]}>
				{_.map(state.routes, (tabRoute: any, index: number) => {
					const isFocused = state.index === index;
					let Icon;
					let label = tabRoute.name;
					let on_press = () => handle_click(tabRoute, isFocused);

					switch (tabRoute.name) {
						case TabRoutes.Home: {
							Icon = isFocused ? ImageLink_keys.home_filled : ImageLink_keys.home;
							label = 'Home';
							break;
						}

						case TabRoutes.Contact: {
							Icon = isFocused ? ImageLink_keys.products_filled : ImageLink_keys.products;
							label = 'Contacts';
							break;
						}

						case TabRoutes.About:
							Icon = isFocused ? ImageLink_keys.buyer_filled : ImageLink_keys.buyer;
							label = 'About';
							break;
					}

					if (!Icon) {
						return null;
					}

					return (
						<Pressable style={styles.item_wrapper} key={tabRoute.key} onPress={on_press}>
							<View style={styles.item}>
								<SvgImage name={Icon} height={24} width={24} />
								<Text
									numberOfLines={1}
									bold={device.isTablet}
									medium={!device.isTablet}
									style={[styles.text, isFocused ? styles.text_active : {}]}>
									{label}
								</Text>
							</View>
						</Pressable>
					);
				})}
			</View>
		</SafeAreaView>
	);
};

const TabBar = () => {
	return (
		<Tab.Navigator
			initialRouteName={TabRoutes.Home}
			screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
			tabBar={(props: any) => <TabView {...props} />}>
			<Tab.Screen name={TabRoutes.Home} component={Home} />
			<Tab.Screen name={TabRoutes.Contact} component={Contact} />
			<Tab.Screen name={TabRoutes.About} component={About} />
		</Tab.Navigator>
	);
};

export default TabBar;
