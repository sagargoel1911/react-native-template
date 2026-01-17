import _ from 'lodash';

const onlyDigitsRegex = /^\d+$/;
const digitsWithDecimal = /^\d+(\.\d{0,2})?$/;
const onlyCharactersRegex = /^[A-Za-z]+$/;

export interface ValidationProps {
	name?: string;
	label?: string;
	required?: boolean;
	email?: boolean;
	maxLength?: number;
	minLength?: number;
	number?: boolean;
	character?: boolean;
	custom_error_label?: string;
	allow_digits?: boolean;
	minValue?: number;
	uniqueValue?: any[];
	phone_e164?: boolean;
	min_file_selection?: number;
	max_file_selection?: number;
	pattern?: {
		source: string;
		message: string;
	};
}

const apply_validations = ({
	character,
	required,
	email,
	name,
	maxLength,
	minLength,
	number,
	label,
	custom_error_label,
	allow_digits,
	minValue,
	uniqueValue,
	phone_e164,
	min_file_selection,
	max_file_selection,
	pattern,
}: ValidationProps) => {
	let rules: any = {
		validate: {},
		pattern: {},
	};

	rules = {
		...rules,
		validate: {
			...rules.validate,
			matchPattern: async (v: string) => {
				let response: any = undefined;
				if (email) {
					if (!v) {
						return Promise.resolve(true);
					}
					response = Promise.resolve(
						/^(?!.*\.\.)(?!\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?<!\.)@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i.test(
							v,
						) || 'Email address must be a valid address',
					);

					if (_.isString(response)) {
						return Promise.resolve(response);
					}
				}

				if (response !== undefined) {
					return Promise.resolve(response);
				}
			},
		},
	};

	if (required) {
		rules = {
			...rules,
			required: `${custom_error_label || label || name} is required`,
		};
	} else {
		rules = {
			...rules,
			required: false,
		};
	}

	if (character) {
		rules = {
			...rules,
			pattern: {
				...rules.pattern,
				value: onlyCharactersRegex,
				message: 'This field should have only characters are allowed',
			},
		};
	}

	if (number) {
		rules = {
			...rules,
			pattern: {
				...rules.pattern,
				value: allow_digits ? digitsWithDecimal : onlyDigitsRegex,
				message: allow_digits ? 'This field should have only upto 2 decimal places' : 'This field should have only digits',
			},
		};
	}

	if (minLength) {
		rules = {
			...rules,
			validate: {
				...rules.validate,
				minLength: (v: string) => {
					if (!v) return true;
					return v.length >= minLength || `Minimum ${minLength} characters required`;
				},
			},
		};
	}

	if (maxLength) {
		rules = {
			...rules,
			validate: {
				...rules.validate,
				maxLength: (v: string) => {
					if (!v) return true;
					return v.length <= maxLength || `Maximum ${maxLength} characters allowed`;
				},
			},
		};
	}

	if (minValue !== undefined) {
		rules = {
			...rules,
			validate: {
				...rules.validate,
				minValue: (v: string) => {
					if (!v) return true;
					return parseFloat(v) > minValue || `This field must be greater than ${minValue}`;
				},
			},
		};
	}

	if (uniqueValue !== undefined) {
		rules = {
			...rules,
			validate: {
				...rules.validate,
				uniqueValue: (v: string) =>
					_.reduce(
						uniqueValue,
						(result, item) => {
							return _.lowerCase(item) === _.lowerCase(v) ? false : result;
						},
						true,
					) || `${custom_error_label || label || name} already exists`,
			},
		};
	}

	if (phone_e164) {
		rules = {
			...rules,
			pattern: {
				...rules.pattern,
				value: /^\+[1-9]\d{1,14}$/,
				message: 'Phone number is not valid',
			},
		};
	}

	if (min_file_selection !== undefined) {
		rules = {
			...rules,
			validate: {
				...rules.validate,
				min_file_selection: (v: any) => {
					if (!v || _.isEmpty(v)) return true;
					return v.length >= min_file_selection || `Select at least ${min_file_selection} files`;
				},
			},
		};
	}

	if (max_file_selection !== undefined) {
		rules = {
			...rules,
			validate: {
				...rules.validate,
				max_file_selection: (v: any) => {
					if (!v || _.isEmpty(v)) return true;
					return v.length <= max_file_selection || `Select up to ${max_file_selection} files only`;
				},
			},
		};
	}

	if (pattern?.source) {
		rules = {
			...rules,
			pattern: {
				...rules.pattern,
				value: new RegExp(pattern.source),
				message: pattern.message,
			},
		};
	}

	return rules;
};

export default apply_validations;
