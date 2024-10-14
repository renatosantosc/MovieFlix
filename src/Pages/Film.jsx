import axios from 'axios';
import './Styles/Home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Modal from '../Components/Modal';
import Slider from '../Components/Slides';
import Footer from  '../Components/Footer';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

export default function Film(){

    const [nowPlaying, setNowPlaying] = useState() // Filmes em lançamento
    const [dataMovie0, setDataMovie0] = useState({})
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
    const [backVideo, setBackVideo] = useState(false)
    const [checkWindow, setCheckWindow] = useState()
    const width = window.innerWidth
    const height = window.screen.height

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

        axios
        .request(now_playing)
        .then(function (response) {
        setNowPlaying(response.data.results)
        setDataMovie0(response.data.results[0])
        setBack(imageURL + dataMovie0.backdrop_path)
        setAlt(imageURL + dataMovie0.poster_path)
        setIdVideo(dataMovie0.id)

        if(idVideo){
          const video = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${idVideo}/videos?language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };
          axios
          .request(video)
          .then(function (response) {
            setVideoURL(response.data)
            setLength(response.data.results.length)
            setFoundVideo(response.data.results.find((item) => item.name === 'Trailer Oficial Dublado' || item.type === 'Trailer'))
          })
          .catch(function (error) {
            console.error(error);
          });
        }

        })
        .catch(function (error) {
        console.error(error);
        });

    },[idVideo, back, alt])

    useEffect(()=>{

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

      axios
        .request(action)
        .then(function (response) {
        setActionMovie(response.data.results)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(romance)
        .then(function (response) {
        setRomanceMovie(response.data.results)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(terror)
        .then(function (response) {
        setTerrorMovie(response.data.results)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(fiction)
        .then(function (response) {
          setFictionMovie(response.data.results)
        })
        .catch(function (error) {
          console.error(error);
        });
    },[])

    const viewWidth = () =>{ setCheckWindow(window.innerWidth) }
    const videoBack = () => { foundVideo.key ? setBackVideo(true) : setBackVideo(false) }

    setTimeout(videoBack, 7000)
    setInterval(viewWidth, 1000)

    return(
        <>
        {nowPlaying && actionMovie && romanceMovie && terrorMovie && fictionMovie ?
        <Box 
        className='body' 
        width={'100vw'} 
        height={ backVideo && checkWindow > 1200 ? '70vh' : '85vh' } 
        sx={{backgroundImage: backVideo && checkWindow > 1200 ? 'none' :
                              checkWindow > 450 && height > 450 ? `url(${back})` : 
                              checkWindow > 450 && height < 450 ? 'none' : `url(${alt})`}}>
            <Header />
            {open ? 
              <Modal setOpen={setOpen} open={open} id={foundVideo.key} />
            : '' }
 
            <Grid className='title'>
              <Grid className='right'>
                {nowPlaying ?
                  <div className='description'>
                    {height > 450 ?
                    <h1>{dataMovie0.title}</h1> : 
                    <h3>{dataMovie0.title}</h3>
                    }
                    { backVideo && checkWindow > 1200 ? '' : <p>{dataMovie0.overview}</p> }  
                  </div>
                : ''}

                  <div className='button_footer'>
                        <Link to={`/movie/${dataMovie0.id}`} className='link'>
                          <Button variant='outlined' startIcon={ <InfoIcon sx={{paddingBottom: '3px'}} /> }>
                              Detalhes
                          </Button>
                        </Link>

                    <Button variant='contained' startIcon={ <AddIcon /> } >
                      Minha Lista
                    </Button>
                  </div>
              </Grid>

                <Grid className='left' style={{ display: backVideo && checkWindow > 1200 ? 'block' : checkWindow < 450 ? 'flex' : 'none' }} sx={{backgroundImage: height < 450 ? `url(${back})` : 'none'}}>
                  {foundVideo.key && backVideo && checkWindow > 1200 ? <iframe frameborder='0' src={`https://www.youtube.com/embed/${foundVideo.key}?autoplay=1&controls=0&showinfo=0&autohide=0&playlist=${foundVideo.key}&loop=1`}
                    allowFullScreen="allowFullScreen"
                    title='Filme' width='100%' height={checkWindow < 450 ? '50%' : '100%'} /> : ''}
                </Grid>

            </Grid>
        </Box>
        : 
        <Box width='100vw' height='100vh' sx={{
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CircularProgress sx={{color: 'red'}} />
        </Box> }
        {nowPlaying ? 
          <Slider movies={nowPlaying} title='Lançamentos' category={'movie'} />
        : '' }

        {actionMovie ? 
          <Slider movies={actionMovie} title='Filmes de ação e aventura' category={'movie'} />
        : '' }

        {romanceMovie ? 
          <Slider movies={romanceMovie} title='Filmes de romance' category={'movie'} />
        : '' }

        {terrorMovie ? 
          <Slider movies={terrorMovie} title='Filmes de terror' category={'movie'} />
        : '' }

        {fictionMovie ? 
          <Slider movies={fictionMovie} title='Filmes de ficção científicas' category={'movie'} />
        : '' }
        
        {nowPlaying && actionMovie && romanceMovie && terrorMovie && fictionMovie ? <Footer /> : ''} 
      </>
    )
}