import { ImageLinks } from 'src/assets/images/ImageLinks';

const SvgImage = ({ name, ...rest }: { name: keyof typeof ImageLinks } & any) => {
	const ImageComp = ImageLinks[name]?.();

	if (!ImageComp) {
		return null;
	}

	return <ImageComp {...rest} />;
};

export default SvgImage;
