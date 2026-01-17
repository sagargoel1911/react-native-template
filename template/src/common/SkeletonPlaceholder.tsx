import RNSkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonPlaceholder = ({ children, ...rest }: any) => {
	return (
		<RNSkeletonPlaceholder speed={1600} {...rest}>
			{children}
		</RNSkeletonPlaceholder>
	);
};

export default SkeletonPlaceholder;
