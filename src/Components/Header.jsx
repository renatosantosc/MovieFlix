import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Grid, Button, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import NotificationIcon from '@mui/icons-material/Notifications'
import CreateSharpIcon from '@mui/icons-material/CreateSharp'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HelpIcon from '@mui/icons-material/Help'
import Logouticon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import Toggle from "./Toggle";
import './Styles/Header.css'


export default function Header(){
    const [anchorEl, setAnchorEl] = useState(null) // State para abrir o modal do perfil
    const [anchorNot, setAnchorNot] = useState(null) // State para abrir o modal de notificação
    const [height, setHeight] = useState(null) // Captura o height da janela
    const [width, setWidth] = useState(window.innerWidth) // Captura o width da janela
    const [dataMovie, setDataMovie] = useState() // // Captura os dados dos filmes
    const [avatar, setAvatar] = useState() // Avatar do perfil
    const [avatar2, setAvatar2] = useState() // Avatar do filme e da série da notifiação
    const [series, setSeries] = useState() // Captura os dados das séries
    const [resultSerie, setResultSerie] = useState({}) // Array de filmes
    const [resultMovie, setResultMovie] = useState({}) // Array de séries
    const [idSerie, setIdSerie] = useState() // Caputra o id da série
    const [dataAir, setDataAir] = useState() // Data de lançamento da série
    const [transfDate, setTransfDate] = useState() // Data modificada
    const [transfDate2, setTransfDate2] = useState() // Data modificada
    const open = Boolean(anchorEl)
    const openNot = Boolean(anchorNot)
    const handleClick = e =>{ setAnchorEl(e.currentTarget) }
    const handleOpen = e =>{ setAnchorNot(e.currentTarget) }
    const handleClose = () =>{
        setAnchorEl(null)
        setAnchorNot(null)
    }
    const view_Height = () =>{
        setHeight(window.scrollY)
        setWidth(window.innerWidth)
    }
    setInterval(view_Height, 1000)

    useEffect(() => {
        const imageURL = 'https://image.tmdb.org/t/p/original';
        const now_playing = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
        }
        };

        const trending_series = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/trending/tv/week?language=pt-BR',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const data_series = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${idSerie}?language=pt-BR`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        axios
        .request(now_playing)
        .then(function (response) {
        setDataMovie(response.data)
        setResultMovie(dataMovie.results[0])
        setAvatar(imageURL + dataMovie.results[0].poster_path)
        const date = resultMovie.release_date
        const newDate = date.split('-').reverse().join('/')
        setTransfDate2(newDate)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(trending_series)
        .then(function (response) {
        setSeries(response.data)
        setResultSerie(series.results[0])
        setAvatar2(imageURL + series.results[0].poster_path)
        setIdSerie(series.results[0].id)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(data_series)
        .then(function (response) {
        setDataAir(response.data)
        const date = dataAir.last_air_date
        const newDate = date.split('-').reverse().join('/')
        setTransfDate(newDate)
        })
        .catch(function (error) {
        console.error(error);
        });

    },[dataMovie, series, dataAir, idSerie, resultMovie])

    return(
        <div className='header'>
            <Grid className='container' container alignItems={'center'} width={'100%'} height={'10vh'} 
            sx={{
                padding: '0px 20px',
                backgroundColor: height > 0 ? 'black' : 'rgba(0, 0, 0, 0.445)'
                }}>
                <Grid item lg={6} md={6} sm={6} xs={6} className='grid' 
                sx={{
                    display: 'flex', 
                    alignItems: 'center', 
                    height: '100%'
                }}>
                    {width <= 600 ? <Toggle avatar={avatar} /> : ''}
                    <Button className="Logo" variant='text'>
                        M
                    </Button>
                    <div className='links'>

                        <NavLink to='/' className='button'>
                            <Button variant='text'>Início</Button>
                        </NavLink>

                        <NavLink to='/Séries' className='button'>
                            <Button variant='text'>Séries</Button>
                        </NavLink>

                        <NavLink to='/Filmes' className='button'>
                            <Button variant='text'>Filmes</Button>
                        </NavLink>

                    </div>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={6} className='search' sx={{textAlign: 'right'}}>
                    <NavLink to='/Search' className='button'>
                        <Button variant='text'> <SearchIcon className='icon_search' /> </Button>
                    </NavLink>
                    <Button 
                        variant='text'
                        title="Lembrete"
                        id='notification-button'
                        aria-controls={openNot ? 'notification-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={openNot ? 'true' : undefined}
                        onClick={handleOpen}
                        > 
                        <NotificationIcon /> 
                    </Button>
                    <Menu
                        id='notification-menu'
                        anchorEl={anchorNot}
                        open={openNot}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'notification-button'
                        }}
                    >
                        <MenuItem 
                            className='item_menu'
                            onClick={handleClose}
                        >
                            <Link to={`/movie/${resultMovie.id}`} >
                                <Avatar variant='rounded' alt='Avatar' src={avatar} className='avatar' />
                            </Link>
                            <Grid 
                                container
                                className='grid_notification'
                                justifyContent={'center'}
                                alignItems={'flex-start'}
                                sx={{marginLeft: '10px', flexDirection: 'column', textAlign: 'left'}}
                            >
                                <Grid item> <span className='title'>Novo filme</span> </Grid>
                                <Grid item> <span className='name'>{resultMovie.title}</span> </Grid>
                                <Grid item> <span className='release'>{transfDate2}</span></Grid>
                            </Grid>

                        </MenuItem>
                        <Divider />
                        <MenuItem 
                            className='item_menu'
                            onClick={handleClose}
                        >
                            <Link to={`/tv/${idSerie}`} >
                                <Avatar variant='rounded' alt='Avatar' src={avatar2} className='avatar' />
                            </Link>
                            <Grid 
                                container
                                className='grid_notification'
                                justifyContent={'center'}
                                alignItems={'flex-start'}
                                sx={{marginLeft: '10px', flexDirection: 'column', textAlign: 'left'}}
                            >
                                <Grid item> <span className='title'>Série em lançamento</span> </Grid>
                                <Grid item> <span className='name'>{resultSerie.name}</span> </Grid>
                                <Grid item> <span className='release'>{transfDate}</span></Grid>
                            </Grid>

                        </MenuItem>
                        
                    </Menu>

                    <Button
                        variant='text'
                        title="Perfil"
                        id='basic-button'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar variant='rounded' alt='Five night' src={avatar} className='avatar' />
                    </Button>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<CreateSharpIcon fontSize="small" sx={{paddingRight: '5%'}} />}Gerenciar perfil</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<SettingsIcon fontSize="small" sx={{paddingRight: '5%'}} />}Configurações</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<AccountCircleIcon fontSize="small" sx={{paddingRight: '5%'}} />}conta</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<HelpIcon fontSize="small" sx={{paddingRight: '5%'}} />}Ajuda</MenuItem>
                        <MenuItem sx={{fontSize: '0.8rem'}} onClick={handleClose}>{<Logouticon fontSize="small" sx={{paddingRight: '5%'}} />}Sair</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </div>
    )
}