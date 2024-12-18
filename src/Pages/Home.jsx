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
  const [dataMovie0, setDataMovie0] = useState({})
  const [discover, setDiscover] = useState() // State das séries
  const [back, setBack] = useState() // State da imagem do background
  const [alt, setAlt] = useState() // State da imagem do background alternativo para dispositivos móveis
  const [open, setOpen] = useState(false) // State para abrir e fechar o modal
  const [videoURL, setVideoURL] = useState() // State de todos os videos relacionado ao filme do background
  const [length, setLength] = useState(0) // State para verificar o tamanho da state videoURL
  const [idVideo, setIdVideo] = useState(null) // key do video do trailer
  const [foundVideo, setFoundVideo] = useState({}) // State dos videos encontrados como trailer dublado
  const [foundVideo2, setFoundVideo2] = useState({}) // State dos videos encontrados como trailer disponível
  const [backVideo, setBackVideo] = useState(false)
  const [checkWindow, setCheckWindow] = useState()
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
    axios
    .request(options)
    .then(function (response) {
      setDataMovie(response.data.results)
      setDataMovie0(response.data.results[0])
      setBack(imageURL + response.data.results[0].backdrop_path)
      setAlt(imageURL + response.data.results[0].poster_path)
      setIdVideo(response.data.results[0].id)

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
          setVideoURL(response.data.results)
          setLength(response.data.results.length)
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
  const discover_movie = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/trending/tv/week?language=pt-BR',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGNhMDkwOTYyYjlkY2YxZjYyNzhjNjQ3YWI1YzhmNSIsInN1YiI6IjY1MzdlZmUxNDFhYWM0MDBhYTA4MTIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T0YHaxg5E2HUn_wnrvxue_wwmqslufrrwZOJ10jgcjo'
        }
      };

    axios
    .request(discover_movie)
    .then(function (response) {
      setDiscover(response.data.results)
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
      {dataMovie && discover && videoURL && back ?
        <Box className='body' 
            width={'100vw'} 
            height={ backVideo && checkWindow >= 1500 ? '90vh' : backVideo && checkWindow < 1500 && checkWindow > 1100 ? '70vh' : '85vh'} 
            sx={{backgroundImage: backVideo && checkWindow > 1100 ? 'none' :
                                  checkWindow > 450 && height > 450 ? `url(${back})` : 
                                  checkWindow > 450 && height < 500 ? 'none' : `url(${alt})`}}>
            <Header />
            {/* {videoURL ? 
              <Modal setOpen={setOpen} open={open} id={foundVideo.key} />
            : '' } */}
            <Grid container className='title' sx={{ gridTemplateColumns: backVideo && checkWindow > 1100 ? '0% 100%' : '30% 70%' }}>

              {backVideo && checkWindow > 1100 ?
              <Grid item className='right-next'>
                {dataMovie && backVideo && checkWindow > 1100 ?
                    <div className='description'>
                      {height > 450 ? 
                      <h1>{dataMovie0.title}</h1> :
                      <h3>{dataMovie0.title}</h3>
                      }
                      {backVideo ? '' : <p>{dataMovie0.overview}</p> } 
                    </div>
                    : ''
                  }
                    <div className='button_footer' style={{ display: 'flex', flexDirection: checkWindow > 600 && checkWindow < 1100 ? 'column' : 'row' }}>
                        <Link to={`/movie/${dataMovie0.id}`} className='link'>
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
              <Grid item className='right'>
                {dataMovie && backVideo && checkWindow > 1100 ? '' :
                  <div className='description'>
                    {height > 450 ? 
                    <h1>{dataMovie0.title}</h1> :
                    <h3>{dataMovie0.title}</h3>
                    }
                    {backVideo && checkWindow > 1100 ? '' : <p>{dataMovie0.overview}</p> } 
                  </div>
                }
                  {backVideo && checkWindow > 1100 ? '' :
                  <div className='button_footer' style={{ display: 'flex', flexDirection: checkWindow > 600 && checkWindow < 1100 ? 'column' : 'row' }}>
                      <Link to={`/movie/${dataMovie0.id}`} className='link'>
                        <Button variant='outlined' startIcon={ <InfoIcon sx={{paddingBottom: '3px'}} /> }>
                            Detalhes
                        </Button>
                      </Link>

                    <Button variant='contained' startIcon={ <AddIcon /> } sx={{ margin: checkWindow > 600 && checkWindow < 1100 ? '5%' : 0 }}>
                      Minha Lista
                    </Button>
                  </div>
                  }
              </Grid>
              }

                <Grid item className='left' style={{ display: backVideo && checkWindow > 1100 ? 'block' : checkWindow < 450 ? 'flex' : height < 500 ? 'flex' : 'none' }} sx={{backgroundImage: height < 500 ? `url(${back})` : 'none'}}>
                  {foundVideo && foundVideo.key && backVideo && checkWindow > 1100 || foundVideo2 && foundVideo2.key && backVideo && checkWindow > 1100 ? 
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
        {dataMovie && videoURL && back ? 
          <Slider movies={dataMovie} title='Filmes em alta' category={'movie'} />
        : '' }

        {discover && videoURL && back ? 
          <Slider movies={discover} title='Séries em alta' category={'tv'} />
        : '' }
        
        {dataMovie && discover && videoURL && back ? <Footer /> : ''} 
        
      </>    
    )
  }