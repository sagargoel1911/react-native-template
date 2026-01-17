import { ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from 'src/utils/theme';

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: theme.colors.secondary_text,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

const Loader = () => {
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				alignItems: 'center',
				zIndex: 10000,
			}}>
			<View style={styles.wrapper}>
				<ActivityIndicator size='large' color={theme.colors.white} />
			</View>
		</View>
	);
};

export default Loader;
