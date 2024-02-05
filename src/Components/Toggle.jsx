import { Button, Grid, Drawer, IconButton, Box, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import TvIcon from '@mui/icons-material/Tv';
import MovieCreationIcon from '@mui/icons-material/MovieCreation'
import './Styles/Header.css'

export default function Toggle(props){

    const [toggle, setToggle] = useState(false)
    const toggleDrawer = (anchor, open) => e =>{
        if(e.type === 'Tab'){
            return;
        }
        setToggle({ ...toggle, [anchor] : open });
    };
    const list = (anchor) =>(
        <Box
        className='box_toggle'
        sx={{ 
            width: 140, 
            overflow: 'hidden',
            height: '100vh'
        }}
        role='presentation'
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
            <Grid className='grid_toggle' container direction={'row'} sx={{height: '100%', width: '100%'}}>
                <Grid className='avatar_toggle' height={'20%'} item xs={12}>
                    <Avatar variant='rounded' alt='Avatar' src={props.avatar} className='avatar' />
                    <span>Renato Santos</span>
                </Grid>

                <Grid className='links_toggle' height={'80%'} direction={'row'} item xs={12}>
                    <NavLink to='/' className='button'>
                        <Button variant='text' startIcon={ <HomeIcon sx={{marginRight: '5%'}} /> }>Início</Button>
                    </NavLink>

                    <NavLink to='/Séries' className='button'>
                        <Button variant='text' startIcon={ <TvIcon sx={{marginRight: '5%'}} /> }>Séries</Button>
                    </NavLink>

                    <NavLink to='/Filmes' className='button'>
                        <Button variant='text' startIcon={ <MovieCreationIcon sx={{marginRight: '5%'}} /> }>Filmes</Button>
                    </NavLink>

                    <NavLink to='/Search' className='button'>
                        <Button variant='text' startIcon={ <SearchIcon sx={{marginRight: '5%'}} /> }> Buscar </Button>
                    </NavLink>
                </Grid>
            </Grid>
        </Box>
    )
    return(
        <Grid item lg={4} md={4} sm={4} xs={4} textAlign={'end'}>
            {['left'].map((anchor) => (
                <Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}> 
                        <IconButton > 
                            <MenuIcon sx={{color: '#fff'}} /> 
                        </IconButton> 
                    </Button>
                    <Drawer
                    PaperProps={{sx: 
                        {
                            backgroundColor: 'black',
                            boxShadow: '50px 0px 30px black'
                        }

                    }}
                    anchor={anchor}
                    open={toggle[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </Fragment>
            ))}
        </Grid>
    )
}