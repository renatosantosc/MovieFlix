import { Box, Grid, Button, Typography, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import './Styles/ViewMovie.css'
import Modal from '../Components/Modal'
import Header from '../Components/Header'
import Slides from '../Components/Slides'
import Footer from '../Components/Footer'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'

export default function ViewMovie(){

    const [dateMovie, setDateMovie] = useState(null) // state que captura os dados dos filmes e séries
    const [castMovie, setCastMovie] = useState(null) // state que captura os dados dos casts dos filmes
    const [newCastMovie, setNewCastMovie] = useState(null) // state que captura os dados do array específico dos casts
    const [castSeries, setCastSeries] = useState(null) // state que captura os dados dos casts das séries
    const [newCastSeries, setNewCastSeries] = useState(null) // state que captura os dados do array específico dos casts
    const [recommendations, setRecommendations] = useState(null) // state das recomendações
    const [open, setOpen] = useState(false) // state para abrir e fechar o modal
    const [key, setKey] = useState(null) // chave do video (trailer)
    const [release, setRelease] = useState(null) // data de lançamento do filme
    const [releaseMovie, setReleaseMovie] = useState(null) // certificação de idade
    const [minute, setMinute] = useState(null) // captura os minutos do filme
    const [hours, setHours] = useState(null) // captura as horas do filme
    const [found, setFound] = useState(null) // encontra a certificação BR
    const [reload, setReload] = useState(null) // reload da página
    const [length, setLength] = useState(0) // tamanho do array do state key
    const [foundVideo, setFoundVideo] = useState({}) // array de videos (trailer)
    const imageURL = 'https://image.tmdb.org/t/p/original';
    const { id, name } = useParams()

    const openVideo = () =>{ setOpen(true) }

      useEffect(() =>{
        const movie = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}?language=pt-BR`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const release_movie = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/release_dates`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const credits_movie = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/credits?language=pt-BR`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const credits_series = {
              method: 'GET',
              url: `https://api.themoviedb.org/3/${name}/${id}/aggregate_credits?language=pt-BR`,
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
              }
            };

          const recommendation = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/recommendations?language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          const video = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/${name}/${id}/videos?language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        axios
        .request(movie)
        .then(function (response) {
        setDateMovie(response.data)
        const movieRelease = new Date(name === 'movie' ? dateMovie.release_date : dateMovie.seasons[0].air_date)
        const ano = movieRelease.getFullYear()
        setRelease(ano)
        const hrs = Math.floor(dateMovie.runtime / 60)
        const min = dateMovie.runtime % 60
        setHours((`${hrs}`).slice(-2))
        setMinute((`${min}`).slice(-2))
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(video)
        .then(function (response) {
            setKey(response.data)
            setLength(key.results.length)
            setFoundVideo(key.results.find((item) => item.name === 'Trailer Oficial Dublado' || item.type === 'Trailer'))
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(release_movie)
        .then(function (response) {
        setReleaseMovie(response.data.results)
        setFound(releaseMovie.find((item) => item.iso_3166_1 === 'BR'))
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(credits_movie)
        .then(function (response) {
          setCastMovie(response.data.cast)
          setNewCastMovie(castMovie.slice(0, 20))
        })
        .catch(function (error) {
        console.error(error);
        });
        axios
        .request(credits_series)
        .then(function (response) {
          setCastSeries(response.data.cast)
          setNewCastSeries(castSeries.slice(0, 20))
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(recommendation)
        .then(function (response) {
          setRecommendations(response.data.results)
          setReload(id)
        })
        .catch(function (error) {
        console.error(error);
        });

      },[id, name, found, releaseMovie, dateMovie, castMovie, castSeries, recommendations, length, key, foundVideo])
    return(
        <>
            <Box className='container'
            sx={{
                width: '100vW',
                color: '#fff',
                padding: '0 10px'
            }}
            >
              
              <Header />
              {dateMovie && release && recommendations && reload === id ? 
                <Grid container className='grid_view'>
                  <Grid item className='left'>
                    <div className='certification'>
                      <span className='date'>{release} </span>
                      {found && found.release_dates[0].certification ? 
                      <Typography className='age' variant='body1'
                        sx={{
                          backgroundColor: 
                          found.release_dates[0].certification === '10' ? 'blue' : 
                          found.release_dates[0].certification === '12' ? 'rgb(204, 204, 18)' :
                          found.release_dates[0].certification === '14' ? 'orange' :
                          found.release_dates[0].certification === '16'  ? 'red' : 
                          found.release_dates[0].certification === '18' ? 'black' : 'green'
                      }}>
                        {found.release_dates[0].certification} 
                      </Typography>
                      : ''}

                      <span className='genres'>{dateMovie.genres[0] && dateMovie.genres[0].name ? dateMovie.genres[0].name : ''}{dateMovie.genres[1] && dateMovie.genres[1].name ? ' | ' + dateMovie.genres[1].name : ''}</span>
                      <span className='time'>
                        {name === 'movie' ? `${hours}h ${minute}m` :  
                         name === 'tv' && dateMovie.number_of_seasons === 1 
                          ? `${dateMovie.number_of_seasons} temporada` 
                          : `${dateMovie.number_of_seasons} temporadas`}
                      </span>
                    </div>
                    <h1 className='title'>{name === 'movie'? dateMovie.title : dateMovie.name}</h1>
                    <p className='overview'>{dateMovie.overview}</p>
                    
                    <div className='button_video'>
                      {key && length > 0 ? 
                        <Button variant='outlined' onClick={openVideo} startIcon={ <PlayArrowIcon /> } >
                        Trailer
                        </Button>
                      : ''}

                      <Button variant='contained' startIcon={ <AddIcon /> } >
                       Minha Lista
                      </Button>
                    </div>
                  </Grid>
                  
                  <Grid item className='rigth' sx={{
                    backgroundImage: `url(${imageURL + dateMovie.backdrop_path})`
                  }}>
                  </Grid>
                </Grid>
                : 
                <Box width='100vw' height='100vh' sx={{
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <CircularProgress sx={{color: 'red'}} />
                </Box> }

                {newCastMovie && reload === id && name === 'movie' ? 
                  <Slides title='Elenco' cast={newCastMovie} name={name} />
                  : ''}

                {newCastSeries && reload === id && name === 'tv' ? 
                  <Slides title='Elenco' cast={newCastSeries} name={name} />
                  : ''}

                {recommendations && name === 'movie' && reload === id ? 
                  <Slides title={`Recomendações`} movies={recommendations} category={'movie'} />
                : ''}

                {recommendations && name === 'tv' && reload === id ? 
                  <Slides title={`Recomendações`} movies={recommendations} category={'tv'} />
                : ''}

              </Box>
                {key && open ? <Modal setOpen={setOpen} open={open} id={foundVideo.key} /> : ''}
                {dateMovie && reload === id ? <Footer /> : ''}
        </>
    )
}