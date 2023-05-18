import { StarOutlined } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Nav = (): JSX.Element => {
	return (
		<AppBar position='static' sx={{ backgroundColor: '#f15b23;' }}>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					Chuck Norris jokes
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
