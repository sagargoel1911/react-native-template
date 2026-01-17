import _ from 'lodash';
import constants from 'src/utils/constants';
import Checkbox from '../atoms/Checkbox';
import Select from '../atoms/Select/Select';
import TextField from '../atoms/TextField';

const FormBuilder = (props: any) => {
	switch (props.type) {
		case constants.FORM_ELEMENTS.email:
		case constants.FORM_ELEMENTS.text:
		case constants.FORM_ELEMENTS.number:
		case constants.FORM_ELEMENTS.url:
		case constants.FORM_ELEMENTS.percentage:
			return <TextField {...props} />;
		case constants.FORM_ELEMENTS.long_text:
		case constants.FORM_ELEMENTS.textarea:
			return <TextField multiline {...props} />;
		case constants.FORM_ELEMENTS.select:
		case constants.FORM_ELEMENTS.single_select:
		case constants.FORM_ELEMENTS.multi_select:
		case constants.FORM_ELEMENTS.multi_select_array:
		case constants.FORM_ELEMENTS.country_single_select:
		case constants.FORM_ELEMENTS.state_single_select:
		case constants.FORM_ELEMENTS.payment_terms:
			return <Select {...props} />;
		case constants.FORM_ELEMENTS.checkbox:
			return <Checkbox {...props} />;

		default:
			return null;
	}
};

export default FormBuilder;
