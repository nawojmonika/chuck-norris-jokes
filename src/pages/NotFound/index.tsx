import sadChuck from '../../assets/sad_chuck.png';

export const NotFound = (): JSX.Element => {
	return (
		<>
			<h3>Jokes on you, this page does not exist!</h3>
			<img src={sadChuck} alt='Sad Chuck image' aria-hidden={true} />
		</>
	);
};
