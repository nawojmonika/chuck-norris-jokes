import { Box, CircularProgress } from '@mui/material';
import happyChuck from '../../assets/happy_chuck.png';
import styles from './Loading.module.css';

export const Loading = (): JSX.Element => {
	return (
		<Box data-testid='Loading' className={styles.container}>
			<CircularProgress size={120} sx={{ color: 'var(--primary-color)' }} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<img
					className={styles.chuck}
					src={happyChuck}
					alt='Happy Chuck image'
					aria-hidden
				/>
			</Box>
		</Box>
	);
};
