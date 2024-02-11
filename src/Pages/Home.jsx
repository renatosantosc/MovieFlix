import axios from 'axios';
import '../App.css';
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


export default function Home(){

  const [dataMovie, setDataMovie] = useState() // State dos filmes
  const [discover, setDiscover] = useState() // State das séries
  const [back, setBack] = useState() // State da imagem do background
  const [alt, setAlt] = useState() // State da imagem do background alternativo para dispositivos móveis
  const [open, setOpen] = useState(false) // State para abrir e fechar o modal
  const [videoURL, setVideoURL] = useState() // State de todos os videos relacionado ao filme do background
  const [length, setLength] = useState(0) // State para verificar o tamanho da state videoURL
  const [idVideo, setIdVideo] = useState(null) // key do video do trailer
  const [foundVideo, setFoundVideo] = useState({}) // State dos videos encontrados como trailer
  const width = window.innerWidth
  const height = window.screen.height

  const handleOpen = () =>{ setOpen(true) }

  useEffect(()=>{ 
    const imageURL = 'https://image.tmdb.org/t/p/original';
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
      }
    };

    const discover_movie = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/tv/week?language=pt-BR',
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
    .request(options)
    .then(function (response) {
      setDataMovie(response.data)
      setBack(imageURL + dataMovie.results[0].backdrop_path)
      setAlt(imageURL + dataMovie.results[0].poster_path)
      setIdVideo(dataMovie.results[0].id)
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
    .request(discover_movie)
    .then(function (response) {
      setDiscover(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });

  },[dataMovie, discover, videoURL, idVideo, foundVideo])

    return(
      <>
        <Box className='body' 
            width={'100vw'} 
            height={'85vh'} 
            sx={{backgroundImage: width > 450 && height > 450 ? `url(${back})` : 
                                  width > 450 && height < 450 ? 'none' : `url(${alt})`}}>
            <Header />
            {videoURL ? 
              <Modal setOpen={setOpen} open={open} id={foundVideo.key} />
            : '' }
            {dataMovie && discover && videoURL && foundVideo && back ? 
            <Grid container className='title'>
              <Grid item className='right'>
                {dataMovie ?
                  <div className='description'>
                    {height > 450 ? 
                    <h1>{dataMovie.results[0].title}</h1> :
                    <h3>{dataMovie.results[0].title}</h3>
                    }
                    <p>{dataMovie.results[0].overview}</p>   
                  </div>
                : ''}

                  <div className='button_footer'>
                    {videoURL && length > 0 ?
                      <Button variant='outlined' onClick={handleOpen} startIcon={ <PlayArrowIcon /> }>
                        Trailer
                      </Button>
                    :
                      <Link to={`/movie/${dataMovie.results[0].id}`} className='link'>
                        <Button variant='outlined' startIcon={ <InfoIcon sx={{paddingBottom: '3px'}} /> }>
                            Detalhes
                        </Button>
                      </Link>
                    }

                    <Button variant='contained' startIcon={ <AddIcon /> }>
                      Minha Lista
                    </Button>
                  </div>
              </Grid>

                <Grid item className='left' sx={{backgroundImage: height < 450 ? `url(${back})` : 'none'}}>
                  
                </Grid>

            </Grid>
            : <Box width='100vw' height='100vh' sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CircularProgress sx={{color: 'red'}} />
              </Box> }
        </Box>
        {dataMovie && videoURL && foundVideo && back ? 
          <Slider movies={dataMovie.results} title='Filmes em alta' category={'movie'} />
        : '' }

        {discover && videoURL && foundVideo && back ? 
          <Slider movies={discover.results} title='Séries em alta' category={'tv'} />
        : '' }
        
        {dataMovie && discover && videoURL && foundVideo && back ? <Footer /> : ''} 
      </>    
    )
}