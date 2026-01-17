const ImageLinks = {
	home: () => require('./icons/home.svg').default,
	products: () => require('./icons/products.svg').default,
	buyer: () => require('./icons/buyer.svg').default,
	home_filled: () => require('./icons/home_filled.svg').default,
	products_filled: () => require('./icons/products_filled.svg').default,
	buyer_filled: () => require('./icons/buyer_filled.svg').default,
	cross_white: () => require('./icons/cross_white.svg').default,
	warning_icon: () => require('./icons/warning_icon.svg').default,
	success: () => require('./icons/success.svg').default,
	success_circle: () => require('./icons/success_circle.svg').default,
	error_filled: () => require('./icons/error_filled.svg').default,
	cross: () => require('./icons/cross.svg').default,
	checkbox: () => require('./icons/checkbox.svg').default,
	checkbox_active: () => require('./icons/checkbox_active.svg').default,
	checkbox_partial: () => require('./icons/checkbox_partial.svg').default,
	checkbox_disabled: () => require('./icons/checkbox_disabled.svg').default,
	chevron_down: () => require('./icons/chevron_down.svg').default,
	close: () => require('./icons/close.svg').default,
} as const;

const ImageLink_keys = Object.keys(ImageLinks).reduce(
	(acc, key) => {
		acc[key] = key;
		return acc;
	},
	{} as Record<keyof typeof ImageLinks, keyof typeof ImageLinks>,
);

export { ImageLinks, ImageLink_keys };
