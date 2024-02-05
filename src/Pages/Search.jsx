import Header from '../Components/Header'
import { Box, Grid, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Search(){

    const [search, setSearch] = useState() // Valor do input
    const [resultSearch, setResultSearch] = useState() // Resultado da requisição
    const [width, setWidth] = useState() // State para capturar o tamanho da janela
    const imageURL = 'https://image.tmdb.org/t/p/original';

    const width_window = () =>{
        setWidth(window.innerWidth)
    }
    setInterval(width_window, 1000)

    const handleChange = e => {
        setSearch(e.target.value)

        const search_multi = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };
          
          axios
            .request(search_multi)
            .then(function (response) {
              setResultSearch(response.data.results)
            })
            .catch(function (error) {
              console.error(error);
            });
    }

    return(
        <>
            <Box container
            sx={{
                width: '100vw'
            }}>
                <Header />
                <Grid 
                    container 
                    direction={'column'} 
                    width={'100%'} 
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                        marginTop: 
                            width < 450 ? '25%' :
                            width >= 450 && width < 520 ? '19%' : 
                            width >= 520 && width < 601 ? '16%' : 
                            width >= 601 && width < 720 ? '12%' : '9%',
                        color: '#fff'}}
                >
                    <Grid item width={width <= 600 ? '80%' : '50%'} >
                        <TextField 
                            type='text'
                            variant='outlined'
                            size='small'
                            fullWidth
                            placeholder='Encontre seus filmes e séries'
                            onChange={handleChange}
                            value={search}
                            sx={{
                                '& .MuiOutlinedInput-root' : {
                                    color: 'white',
                                    '& > fieldset' : {
                                        border: '2px solid',
                                        borderColor: '#505658',
                                        borderRadius: '10px'
                                    }
                                },
                                
                                '&:hover .MuiOutlinedInput-root' : {
                                    '& > fieldset' : {
                                        borderColor: '#505658'
                                    }
                                },
                                '& .MuiOutlinedInput-root.Mui-focused' : {
                                    '& > fieldset' : {
                                        borderColor: '#fff'
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item width={'80%'} sx={{marginTop: '5%'}}>
                        <Grid container width={'100%'} >
                            {resultSearch && search.trim().length > 0 ? resultSearch.map(items =>{
                                return(
                                    <Grid item xl={2} lg={2} md={3} xs={4} textAlign={'center'} key={items.id}>
                                        
                                        <Link to={`/${items.media_type}/${items.id}`}>
                                            <Button
                                                sx={{
                                                    width: 
                                                        width < 520 ? '25vw' :
                                                        width >= 520 && width < 540 ? '23vw' :
                                                        width >= 540 && width < 600 ? '21vw' :
                                                        width >= 600 && width < 690 ? '19vw' :
                                                        width >= 690 && width < 770 ? '17vw' :
                                                        width >= 770 && width < 840 ? '16vw' :
                                                        width >= 840 && width < 940 ? '14vw' : 
                                                        width >= 940 && width < 1040 ? '13vw' :
                                                        width >= 1040 && width < 1140 ? '12vw' :
                                                        width >= 1140 && width < 1278 ? '10vw' : '9vw',
                                                    height: '29vh',
                                                    backgroundImage: `url(${imageURL + items.poster_path})`,
                                                    margin: '5px 1px',
                                                    backgroundSize: 'cover',
                                                    ':hover' : {
                                                        transform: 'scale(1.1)'
                                                    },
                                                    transition: '0.4s ease'
                                                }}
                                            >
                                            </Button>
                                        </Link>
                                        
                                    </Grid>
                                )
                            }) : ''}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}