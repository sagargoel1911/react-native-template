import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './@the-source/atoms/Text';
import utils from 'src/utils/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from 'src/utils/theme';
import Button from './@the-source/atoms/Button';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.white,
		padding: 28,
	},
	title: {
		fontSize: 20,
	},
	subtitle_one: {
		fontSize: 16,
		lineHeight: 28,
		marginTop: 8,
	},
	subtitle_two: {
		fontSize: 16,
		lineHeight: 28,
	},
	button_styles: {
		marginTop: 24,
	},
	info_text: {
		position: 'absolute',
		bottom: 60,
	},
	logo_image: {
		position: 'absolute',
		top: 60,
	},
});

class ErrorBoundaryComp extends React.Component<any, any> {
	state = { has_error: false, error: null };

	static getDerivedStateFromError(error: any) {//update the state to show the error boundary
		return { has_error: true, error };
	}

	componentDidCatch(error: any) {//capture the error and log it
		utils.capture_exception(error);
	}

	try_again = () => {//try again button
		this.setState({ has_error: false, error: null });
	};

	render() {
		if (this.state.has_error) {
			return (
				<SafeAreaView style={styles.wrapper}>

					<Text bold style={styles.title}>
						Oops! Something went wrong
					</Text>
					<Text style={styles.subtitle_one}>We’re facing some trouble navigating!</Text>
					<Text style={styles.subtitle_two}> Try restarting your journey</Text>
					<View style={{ flexDirection: 'row' }}>
						<Button title='Retry' style={styles.button_styles} onPress={this.try_again} />
						{/* <Button
							title='Logout'
							outline
							style={[styles.button_styles, { marginLeft: 10 }]}
							onPress={() => {
								utils.logout();
							}}
						/> */}
					</View>
				</SafeAreaView>
			);
		}
		return this.props.children;
	}
}

const ErrorBoundary = ({ children }: any) => {

	return (
		<ErrorBoundaryComp>
			{children}
		</ErrorBoundaryComp>
	);
};

export default ErrorBoundary;
