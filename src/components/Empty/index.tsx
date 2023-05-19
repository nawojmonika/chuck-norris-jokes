import sadChuck from '../../assets/sad_chuck.png';

export type EmptyProps = {
	children?: React.ReactNode;
};

export const Empty = ({ children }: EmptyProps): JSX.Element => {
	return (
		<>
			<h3>{children || 'This section looks empty!'}</h3>
			<img src={sadChuck} alt='Sad Chuck image' aria-hidden />
		</>
	);
};
