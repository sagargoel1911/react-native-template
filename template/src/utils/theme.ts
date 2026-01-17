const colors = {
	primary_50: '#E8F3EF',
	primary_100: '#D0E7DF',
	primary_200: '#A2CFBF',
	primary_300: '#73B89F',
	primary_400: '#6AB399',
	primary_500: '#16885F',
	primary_600: '#096645',
	primary_900: '#002D1D',
	primary_text: '#000000DE',
	primary_main: '#16885F',

	white: '#ffffff',
	white_70: '#FFFFFFB2',
	black: '#000000',
	black_12: '#0000001F',
	black_17: '#2D2D2D',

	text_50: '#FAFAFA',
	text_400: '#A3A3A3',
	text_500: '#737373',
	text_600: '#525252',
	text_700: '#404040',
	text_800: '#262626',
	text_900: '#171717',
	secondary_text: '#00000099',
	secondary: '#2D323A',
	sub_text: '#4F5655',

	error_50: '#FBEDE7',
	error_100: '#F7DBCF',
	error_200: '#EFB79F',
	error_300: '#E79470',
	error_400: '#DF7040',
	error_500: '#EF4444',
	error_600: '#DC2626',
	error_800: '#AE3500',
	error_main: '#D74C10',

	muted_200: '#F2F4F7',
	muted_300: '#D4D4D4',
	muted_400: '#D1D6DD',
	muted_500: '#737373',
	muted_700: '#676D77',

	grey_50: '##FAFAFA',
	grey_100: '#F7F8F8',
	grey_200: '#F2F4F7',
	grey_300: '#EEF1F7',
	grey_400: '#D1D6DD',
	grey_500: '#B5BBC3',
	grey_600: '#9AA0AA',
	grey_700: '#676D77',
	grey_800: '#4F555E',
	grey_900: '#25282D',

	info_main: '#6BA6FE',
	info_50: '#F0F6FF',
	info_100: '#E1EDFF',
	info_300: '#A6C9FE',
	info_150: '#E0F2FE',
	info_400: '#88B8FE',
	info_600: '#4578C4',
	info_700: '#0369A1',

	warnin_main: '#F0AF30',
	warning_50: '#FEF7EA',
	warning_100: '#FCEFD6',
	warning_200: '#F9DFAC',
	warning_300: '#F6CF83',
	warning_400: '#F3BF59',
	warning_600: '#AC7710',
	warning_700: '#CE921E',
	warning_800: '#8A5D05',
	warning_900: '#684500',

	success_50: '#F2F6E7',
	success_100: '#E5EDCF',
	success_300: '#B1C96E',
	success_400: '#97B73E',
	success_600: '#5B7C00',
	success_main: '#7DA50E',
	card_100: '#F0E6FD',

	purple_50: '#F6F3FD',
	purple_100: '#F2ECFF',
	purple_200: '#F2ECFF',
	purple_300: '#CDBBF0',
	purple_500: '#8859DF',
	purple_main: '#8155D9',

	gradient: ['#E8F3EF', '#EFF6E0'],

	background_paper: '#F7F8FA',

	transparent: 'transparent',

	dot: '#D9D9D9',

	pdp_chip: '#0000004D',
	border_gray: '#E1E2E2',
	border_grey100: '#E8E8E8',
	border_grey200: '#DFDFDF',
	border_grey300: '#DADADA',
	gray_3: '#E6E7E7',

	linear_gradeint_light: '#9BC91B',
	linear_gradeint_dark: '#009862',
};

const fonts = {
	satoshi_light: 'Satoshi-Light',
	satoshi_light_italic: 'Satoshi-LightItalic',

	satoshi_regular: 'Satoshi-Regular',
	satoshi_regular_italic: 'Satoshi-RegularItalic',

	satoshi_medium: 'Satoshi-Medium',
	satoshi_medium_italic: 'Satoshi-MediumItalic',

	satoshi_bold: 'Satoshi-Bold',
	satoshi_bold_italic: 'Satoshi-BoldItalic',
};

export const shadow_style = {
	shadowColor: '#000',
	shadowOffset: {
		width: 0,
		height: 4,
	},
	shadowOpacity: 0.1,
	shadowRadius: 30,
	elevation: 5,
};

const theme = { colors, fonts, shadow_style };

export default theme;
