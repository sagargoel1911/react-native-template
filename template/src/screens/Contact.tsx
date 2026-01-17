import { StyleSheet, View } from 'react-native';
import React from 'react';

import Text from 'src/common/@the-source/atoms/Text';
import theme from 'src/utils/theme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.white,
	},
});

const Home = () => {
	return (
		<View style={styles.container}>
			<Text>Contact</Text>
		</View>
	);
};

export default Home;
