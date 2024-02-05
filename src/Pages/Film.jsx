import axios from 'axios';
import './Styles/Home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Modal from '../Components/Modal';
import Slider from '../Components/Slides';
import Footer from  '../Components/Footer';
import { Box, Button, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

export default function Film(){

    const [nowPlaying, setNowPlaying] = useState() // Filmes em lançamento
    const [actionMovie, setActionMovie] = useState() // Filmes de ação
    const [romanceMovie, setRomanceMovie] = useState() // Filmes de romance
    const [terrorMovie, setTerrorMovie] = useState() // Filmes de terror
    const [fictionMovie, setFictionMovie] = useState() // Filmes de ficção científica
    const [back, setBack] = useState() // State do background
    const [alt, setAlt] = useState() // State do background alternativo para dispositivos móveis
    const [open, setOpen] = useState(false) // state para abrir e fechar o modal
    const [videoURL, setVideoURL] = useState() // State de todos os videos relacionado ao background
    const [length, setLength] = useState(0) // State para verificar o tamanho do state videoURL
    const [idVideo, setIdVideo] = useState(null) // key do trailer
    const [foundVideo, setFoundVideo] = useState({}) // State do video encontrado como trailer
    const width = window.innerWidth

    const handleOpen = () =>{ setOpen(true) }

    useEffect(()=>{ 
        const imageURL = 'https://image.tmdb.org/t/p/original';

        const now_playing = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

        const romance = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=10749&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const action = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=28%2C12&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const terror ={
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=27&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const fiction ={
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=878&with_original_language=en',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };

        const video = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${idVideo}/videos?language=pt-BR&page=1`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
      };

        axios
        .request(now_playing)
        .then(function (response) {
        setNowPlaying(response.data)
        setBack(imageURL + nowPlaying.results[0].backdrop_path)
        setAlt(imageURL + nowPlaying.results[0].poster_path)
        setIdVideo(nowPlaying.results[0].id)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(video)
        .then(function (response) {
          setVideoURL(response.data)
          setLength(videoURL.results.length)
          setFoundVideo(videoURL.results.find((item) => item.name === 'Trailer Oficial Dublado' || item.type === 'Trailer'))
        })
        .catch(function (error) {
          console.error(error);
        });


        axios
        .request(action)
        .then(function (response) {
        setActionMovie(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(romance)
        .then(function (response) {
        setRomanceMovie(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(terror)
        .then(function (response) {
        setTerrorMovie(response.data)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(fiction)
        .then(function (response) {
          setFictionMovie(response.data)
        })
        .catch(function (error) {
          console.error(error);
        });

    },[nowPlaying, actionMovie, romanceMovie, terrorMovie, fictionMovie, videoURL, idVideo, foundVideo])

    return(
        <>
        <Box className='body' width={'100vw'} height={'85vh'} sx={{backgroundImage: width > 450 ? `url(${back})` : `url(${alt})`}}>
            <Header />
            {open ? 
              <Modal setOpen={setOpen} open={open} id={foundVideo.key} />
            : '' }
            {nowPlaying && actionMovie && romanceMovie && terrorMovie && fictionMovie ? 
            <div className='title'>
              <div className='right'>
                {nowPlaying ?
                  <div className='description'>  
                    <h1>{nowPlaying.results[0].title}</h1>
                    <p>{nowPlaying.results[0].overview}</p>   
                  </div>
                : ''}

                  <div className='button_footer'>
                    {videoURL && length > 0 ?
                        <Button variant='outlined' onClick={handleOpen} startIcon={ <PlayArrowIcon /> }>
                            Trailer
                        </Button>
                    : 
                        <Link to={`/movie/${nowPlaying.results[0].id}`} className='link'>
                          <Button variant='outlined' startIcon={ <InfoIcon sx={{paddingBottom: '3px'}} /> }>
                              Detalhes
                          </Button>
                        </Link>
                      }

                    <Button variant='contained' startIcon={ <AddIcon /> } >
                      Minha Lista
                    </Button>
                  </div>
              </div>

                <div className='left'>
                  
                </div>

            </div>
            : <Box width='100vw' height='100vh' sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CircularProgress sx={{color: 'red'}} />
              </Box> }
        </Box>
        {nowPlaying ? 
          <Slider movies={nowPlaying.results} title='Lançamentos' category={'movie'} />
        : '' }

        {actionMovie ? 
          <Slider movies={actionMovie.results} title='Filmes de ação e aventura' category={'movie'} />
        : '' }

        {romanceMovie ? 
          <Slider movies={romanceMovie.results} title='Filmes de romance' category={'movie'} />
        : '' }

        {terrorMovie ? 
          <Slider movies={terrorMovie.results} title='Filmes de terror' category={'movie'} />
        : '' }

        {fictionMovie ? 
          <Slider movies={fictionMovie.results} title='Filmes de ficção científicas' category={'movie'} />
        : '' }
        
        {nowPlaying && actionMovie && romanceMovie && terrorMovie && fictionMovie ? <Footer /> : ''} 
      </>
    )
}