import axios, { AxiosRequestConfig } from 'axios';
import _ from 'lodash';

const utils = {
	request: (props: AxiosRequestConfig) => {
		const { params, timeout, ...config } = props || {};

		const timeout_value = timeout ? timeout : 10_000;

		return new Promise(async (resolve, reject) => {
			try {
				// if (_.isObject(cancel_token)) {
				// 	cancel_token.cancel = () => {
				// 		reject({ is_cancelled: true });
				// 	};
				// }

				const res = await axios.request({
					baseURL: 'base_url',
					timeout: timeout_value,
					params,
					...config,
				});

				return resolve({ ...(res.data || {}), status: res.status });
			} catch (error: any) {
				const status_code = _.get(error, 'response.status');
				const is_network_error = error.code === 'ERR_NETWORK';

				// if (
				// 	(is_network_error || !_.includes([500, 400, 401, 422, 404], status_code)) &&
				// 	retry > 0 &&
				// 	!_.includes(dont_show_error_special_error_codes, status_code)
				// ) {
				// 	await non_dependant_utils.delay((TOTAL_RETRY_COUNT - retry + 1) * 2_000);
				// 	resolve(utils.request({ ...props, retry: retry - 1, timeout: timeout_value * 1.5 }));
				// 	return;
				// }

				// let error_title = "Oops! It's not you, it's us";

				// let error_message: string = 'Please try again.';

				// if (status_code === 401) {
				// 	if (should_refresh_token) {
				// 		const { persistedUserData } = store.getState();
				// 		const auth_access_token = persistedUserData[PERSIST_REDUX_PATHS.auth_access_token];
				// 		const auth_refresh_token = persistedUserData[PERSIST_REDUX_PATHS.auth_refresh_token];

				// 		if (!_.isEmpty(auth_access_token) && !_.isEmpty(auth_refresh_token)) {
				// 			try {
				// 				await refresh_expire_token(auth_access_token, auth_refresh_token);
				// 				resolve(
				// 					utils.request({
				// 						...props,
				// 						should_refresh_token: false,
				// 					}),
				// 				);
				// 			} catch (err) {}
				// 		}
				// 	} else {
				// 		utils.logout();
				// 	}
				// }

				if (status_code !== 401 && !is_network_error) {
					utils.capture_exception(error);
				}

				return reject(error);
			}
		});
	},
	capture_exception: (err: any) => {
		console.log('Error ---->', err);
	},
	get_responsive_styles: (redux_device_info: any) => {
		const SPACE = redux_device_info.isTablet ? (redux_device_info.isTabletPortrait ? 24 : 30) : 16;
		const GAP = redux_device_info.isTablet ? 20 : 12;

		return { GAP, SPACE };
	},
};

export default utils;
