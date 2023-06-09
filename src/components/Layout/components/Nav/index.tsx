import { StarOutlined } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export const Nav = (): JSX.Element => {
	return (
		<AppBar
			data-testid='Nav'
			position='static'
			sx={{ backgroundColor: 'var(--primary-color)' }}>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					<Link className={styles.link} to='/'>
						Chuck Norris jokes
					</Link>
				</Typography>
				<Button color='inherit' component={Link} to='/'>
					Home
				</Button>
				<Button
					color='inherit'
					component={Link}
					to='/favorites'
					startIcon={<StarOutlined />}>
					Favorites
				</Button>
			</Toolbar>
		</AppBar>
	);
};
