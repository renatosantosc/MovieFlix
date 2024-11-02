import axios from 'axios';
import './Styles/Home.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Modal from '../Components/Modal';
import Slider from '../Components/Slides';
import Footer from  '../Components/Footer'
import { Box, Button, CircularProgress, Grid } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'


export default function Serie(){

    const [trendingTV, setTrendingTV] = useState() // Dados dos filmes em tedências
    const [dataMovie0, setDataMovie0] = useState({})
    const [actionTV, setActionTV] = useState() // Dados dos filmes de ação
    const [animationTV, setAnimationTV] = useState() // Dados dos filmes em animação
    const [crimeTV, setCrimeTV] = useState() // Dados dos filmes de crime
    const [fantasyTV, setFantasyTV] = useState() // Dados dos filmes de fantasia
    const [back, setBack] = useState() // State que guarda a imagem do background
    const [alt, setAlt] = useState() // State que guada a imagem do background alternativo para dispositivos móveis
    const [open, setOpen] = useState(false) // State para abrir e fechar o modal
    const [videoURL, setVideoURL] = useState() // State de todos os video 
    const [length, setLength] = useState(0) // Olhar o tamanho do state videoURL
    const [idVideo, setIdVideo] = useState(null) // key do video (trailer)
    const [foundVideo, setFoundVideo] = useState({}) // Array de trailers dublados
    const [foundVideo2, setFoundVideo2] = useState({}) // Array de trailers disponível
    const [backVideo, setBackVideo] = useState(false)
    const [checkWindow, setCheckWindow] = useState()
    const width = window.innerWidth
    const height = window.screen.height

    const handleOpen = () =>{ setOpen(true) }

    useEffect(()=>{ 
        const imageURL = 'https://image.tmdb.org/t/p/original';

        const trending = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/trending/tv/week?language=pt-BR',
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
          }
        };
  
        axios
        .request(trending)
        .then(function (response) {
        setTrendingTV(response.data.results)
        setDataMovie0(response.data.results[0])
        setBack(imageURL + response.data.results[0].backdrop_path)
        setAlt(imageURL + response.data.results[0].poster_path)
        setIdVideo(response.data.results[0].id)

        if(idVideo){
          const video = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${idVideo}/videos?language=pt-BR&page=1`,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
            }
          };

          axios
          .request(video)
          .then(function (response) {
            setVideoURL(response.data.results)
            setLength(response.data.length)
            setFoundVideo(response.data.results.find((item) => item.name === 'Trailer Oficial Dublado' || item.name === 'Teaser Trailer Dublado' || item.name === 'Trailer Final Dublado'))
            setFoundVideo2(response.data.results.find((item) => item.type === 'Trailer'))
        })
        .catch(function (error) {
          console.error(error);
        });
        }
        })
        .catch(function (error) {
        console.error(error);
        });

    },[idVideo])

    useEffect(()=>{

    const animation = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=16&with_original_language=en',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
        }
    };

    const action = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=10759&with_original_language=en',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
        }
    };

    const crime ={
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=80&with_original_language=en',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
        }
    };

    const fantasy ={
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=10765&with_original_language=en',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
        }
    };

    axios
        .request(action)
        .then(function (response) {
        setActionTV(response.data.results)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(animation)
        .then(function (response) {
        setAnimationTV(response.data.results)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(crime)
        .then(function (response) {
        setCrimeTV(response.data.results)
        })
        .catch(function (error) {
        console.error(error);
        });

        axios
        .request(fantasy)
        .then(function (response) {
          setFantasyTV(response.data.results)
        })
        .catch(function (error) {
          console.error(error);
        });
    },[])

    const viewWidth = () =>{ setCheckWindow(window.innerWidth) }

    const videoBack = () => { foundVideo && foundVideo.key || foundVideo2 && foundVideo2.key ? setBackVideo(true) : setBackVideo(false) }
    setTimeout(videoBack, 7000)
    setInterval(viewWidth, 1000)
    return(
        <>
        {trendingTV && actionTV && animationTV && crimeTV && fantasyTV ? 
        <Box 
        className='body' 
        width={'100vw'} 
        height={ backVideo && checkWindow >= 1500 ? '90vh' : backVideo && checkWindow < 1500 && checkWindow > 1100 ? '70vh' : '85vh' } 
        sx={{backgroundImage: backVideo && checkWindow > 1100 ? 'none' :
                              checkWindow > 450 && height > 450 ? `url(${back})` : 
                              checkWindow > 450 && height < 450 ? 'none' : `url(${alt})`}}>
            <Header />
            {/* {open ? 
              <Modal setOpen={setOpen} open={open} id={foundVideo.key} />
            : '' } */}
            
            <Grid className='title' sx={{ gridTemplateColumns: backVideo && checkWindow > 1100 ? '0% 100%' : '30% 70%' }}>
              {backVideo && checkWindow > 1100 ?
                <Grid className='right-next'>
                {trendingTV ?
                  <div className='description'>
                    {height > 450 ? 
                    <h1>{dataMovie0.name}</h1> :
                    <h3>{dataMovie0.name}</h3>
                    }
                    {backVideo ? '' : <p>{dataMovie0.overview}</p>} 
                  </div>
                : ''}

                  <div className='button_footer' style={{ display: 'flex', flexDirection: checkWindow > 600 && checkWindow < 1100 ? 'column' : 'row' }}>
                      <Link to={`/tv/${dataMovie0.id}`} className='link'>
                        <Button variant='outlined' startIcon={ <InfoIcon sx={{paddingBottom: '3px'}} /> }>
                            Detalhes
                        </Button>
                      </Link>

                    <Button variant='contained' startIcon={ <AddIcon /> } sx={{ margin: checkWindow > 600 && checkWindow < 1100 ? '5%' : 0 }}>
                      Minha Lista
                    </Button>
                  </div>
              </Grid>
            :
              <Grid className='right'>
                {trendingTV && backVideo && checkWindow > 1100 ? '' :
                  <div className='description'>
                    {height > 450 ? 
                    <h1>{dataMovie0.name}</h1> :
                    <h3>{dataMovie0.name}</h3>
                    }
                    {backVideo && checkWindow > 1100 ? '' : <p>{dataMovie0.overview}</p>} 
                  </div>
                }

                  <div className='button_footer' style={{ display: 'flex', flexDirection: checkWindow > 600 && checkWindow < 1100 ? 'column' : 'row' }}>
                      <Link to={`/tv/${dataMovie0.id}`} className='link'>
                        <Button variant='outlined' startIcon={ <InfoIcon sx={{paddingBottom: '3px'}} /> } >
                            Detalhes
                        </Button>
                      </Link>

                    <Button variant='contained' startIcon={ <AddIcon /> } sx={{ margin: checkWindow > 600 && checkWindow < 1100 ? '5%' : 0 }} >
                      Minha Lista
                    </Button>
                  </div>
              </Grid>
              }

                <Grid className='left'  style={{ display: backVideo && checkWindow > 1100 ? 'block' : checkWindow < 450 ? 'flex' : height < 500 ? 'flex' : 'none' }} sx={{backgroundImage: height < 450 ? `url(${back})` : 'none'}}>
                  { foundVideo && foundVideo.key && backVideo && checkWindow > 1100 || foundVideo2 && foundVideo2.key && backVideo && checkWindow > 1100 ? 
                  <iframe 
                    frameborder='0' 
                    src={`https://www.youtube.com/embed/${foundVideo ? foundVideo.key : foundVideo2.key}?autoplay=1&controls=0&showinfo=0&autohide=0&playlist=${foundVideo ? foundVideo.key : foundVideo2.key}&loop=1`}
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
        {trendingTV ? 
          <Slider movies={trendingTV} title='Tendências da semana' category={'tv'} />
        : '' }

        {actionTV ? 
          <Slider movies={actionTV} title='Séries de ação e aventura' category={'tv'} />
        : '' }

        {animationTV ? 
          <Slider movies={animationTV} title='Animação' category={'tv'} />
        : '' }

        {crimeTV ? 
          <Slider movies={crimeTV} title='Séries de crime' category={'tv'} />
        : '' }

        {fantasyTV ? 
          <Slider movies={fantasyTV} title='Séries de ficção científica e fantasia' category={'tv'} />
        : '' }
        
        {trendingTV && actionTV && animationTV && crimeTV && fantasyTV ? <Footer /> : ''} 
      </>
    )
}