const FORM_ELEMENTS = {
	// Text Input Types
	email: 'email',
	text: 'text',
	number: 'number',
	url: 'url',
	percentage: 'percentage',

	// Multiline Text Types
	long_text: 'long_text',
	textarea: 'textarea',

	// Select Types
	select: 'select',
	single_select: 'single_select',
	multi_select: 'multi_select',
	multi_select_array: 'multi_select_array',
	country_single_select: 'country_single_select',
	state_single_select: 'state_single_select',
	payment_terms: 'payment_terms',

	// Checkbox Type
	checkbox: 'checkbox',

	// Not yet implemented in FormBuilder
	password: 'password',
} as const;

const constants = {
	FORM_ELEMENTS,
} as const;

export default constants;
