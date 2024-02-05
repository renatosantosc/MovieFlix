import { Box, Grid, Button, IconButton, Link, Divider } from '@mui/material';
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import './Styles/Footer.css'


export default function Footer(){
    const [width, setWidth] = useState(window.innerWidth)

    const width_window = () =>{
        setWidth(window.innerWidth)
    }
    setInterval(width_window, 1000)

    return(
        <>
            <Box width={'95%'} display={'flex'} justifyContent={'center'}>
                <Divider sx={{backgroundColor: '#252525', width: '90%'}} />
            </Box>
            <Box 
            sx={{
                width: '100%',
                margin: '1% 0',
                backgroundColor: 'transparent',
                color: '#fff'
            }}>
                <Grid container xl={12} lg={12} md={12} xs={12} alignItems={'center'} className='grid_container_footer'>
                    <Grid item xl={4} lg={4} md={4} xs={width > 450 ? 3 : 4} className='grid_logo'
                    sx={{textAlign: 'center'}}>

                        <Button 
                        sx={{color: 'red',
                            fontSize: width <= 800 ? '1rem' : '1.3rem'}}>
                            MOVIEFLIX
                        </Button>

                    </Grid>
                    <Grid item container xl={4} lg={4} md={4} xs={width > 450 ? 6 : 4} className='grid_links'
                        justifyContent={'center'} 
                        alignItems={'center'} 
                        direction={'column'}>

                        <Grid item>
                            <span>Páginas</span>
                        </Grid>

                        <Grid item className='item_link'>
                            
                            <div className='link_active'>
                                <NavLink to='/' className='grid_button_link'>
                                    <Button variant='text'>Início</Button>
                                </NavLink>

                                <NavLink to='/Séries' className='grid_button_link'>
                                    <Button variant='text'>Séries</Button>
                                </NavLink>

                                <NavLink to='/Filmes' className='grid_button_link'>
                                    <Button variant='text'>Filmes</Button>
                                </NavLink>

                            </div>
                                
                        </Grid>

                    </Grid>
                    <Grid item container xl={4} lg={4} md={4} xs={width > 450 ? 3 : 4} className='grid_social'
                        justifyContent={'space-evenly'} 
                        alignItems={'center'} 
                        direction={'column'}>

                        <Grid item className='grid_span'>
                            <span>Social e Links</span>
                        </Grid>

                        <Grid item className='grid_content'>
                                <Link href='https://github.com/renatosantosc' underline='none' target='_blank' rel='noopener'>
                                    <IconButton>
                                        <GitHubIcon sx={{color: '#d1d1d1', fontSize: '1.2rem'}} />
                                    </IconButton>
                                </Link>

                            <Button variant='text'>
                                <Link href='https://www.themoviedb.org/' underline='none' target='_blank' rel='noopener' sx={{color: '#d1d1d1'}}>
                                    TMDB API
                                </Link>
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}