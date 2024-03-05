import { Box, IconButton, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useRef, useState, useEffect } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Styles/Slides.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Slide_Movies(props){

    const imageURL = 'https://image.tmdb.org/t/p/original';
    const carousel = useRef(null)
    const [arrow, setArrow] = useState(false)
    const [box, setBox] = useState(false)
    const width= window.innerWidth
    const height = window.screen.height
    const handleLeft = () =>{ carousel.current.scrollLeft -= carousel.current.offsetWidth }
    const handleRight = () =>{ carousel.current.scrollLeft += carousel.current.offsetWidth }
    useEffect(()=>{
        if(props.movies){
            props.movies.length > 10 ? setArrow(true) : setArrow(false)
            props.movies.length > 0 ? setBox(true) : setBox(false)
        }
        if(props.cast){
            props.cast.length > 10 ? setArrow(true) : setArrow(false)
            props.cast.length > 0 ? setBox(true) : setBox(false)
        }
    },[props.cast, props.movies])

    return(
        <div>
            {box ? 
            <Box className='box'
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <span id='title'>{props.title}</span>
                    <ul ref={carousel}>
                {props.movies ?
                    props.movies.map(item =>{
                        const img = imageURL + item.poster_path
                        return(
                            <li key={item.id}>
                                <Button className='card'
                                sx={{
                                    width: 
                                        width < 420 ? '27vw' :
                                        width >= 420 && width < 520  ? '25vw' :
                                        width >= 520 && width < 540 ? '23vw' :
                                        width >= 540 && width < 600 ? '21vw' :
                                        width >= 600 && width < 690 ? '19vw' :
                                        width >= 690 && width < 770 ? '17vw' :
                                        width >= 770 && width < 840 ? '15vw' :
                                        width >= 840 && width < 940 ? '13vw' : 
                                        width >= 940 && width < 1040 ? '12vw' :
                                        width >= 1040 && width < 1140 ? '11vw' :
                                        width >= 1140 && width < 1278 ? '10vw' : '9vw',
                                    height:
                                        height >= 1000 && height < 1200 && width < 950 ? '21vh' :
                                        height >= 1200 && width < 950 ? '14vh' :
                                        height <= 1000 && height > 780 && width > 950 ? '22vh' :
                                        height <= 950 && height >= 805 && width < 450 ? '19vh' :
                                        height < 805 && height >= 620 && width <= 450 ? '20vh' :
                                        height < 620 && width < 450 ? '22vh' : 
                                        height < 450 ? '55vh' : '28vh',
                                    padding: '0px'
                                }}
                                >
                                    <div className='play'>
                                        <Link to={`/${props.category}/${item.id}`} className='link'>
                                            <Button className='play_movie' variant='contained' size='small'>
                                                <PlayArrowIcon />
                                            </Button>
                                        </Link>
                                    </div>
                                    <LazyLoadImage
                                        src={img}
                                        effect='blur'
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </Button>
                            </li>
                            )})
                            : '' }
                            {props.cast ?
                                props.cast.map(items =>{
                                    const img2 = imageURL + items.profile_path
                                    return(
                                        <li key={items.id}>
                                            <Button className='card'
                                            sx={{
                                                width:
                                                    width < 420 ? '27vw' :
                                                    width >= 420 && width < 520  ? '25vw' :
                                                    width >= 520 && width < 540 ? '23vw' :
                                                    width >= 540 && width < 600 ? '21vw' :
                                                    width >= 600 && width < 690 ? '19vw' :
                                                    width >= 690 && width < 770 ? '17vw' :
                                                    width >= 770 && width < 840 ? '15vw' :
                                                    width >= 840 && width < 940 ? '13vw' : 
                                                    width >= 940 && width < 1040 ? '12vw' :
                                                    width >= 1040 && width < 1140 ? '11vw' :
                                                    width >= 1140 && width < 1278 ? '10vw' : '9vw',
                                                height: 
                                                    height >= 1000 && height < 1200 && width < 950 ? '16vh' :
                                                    height >= 1000 && height >= 1200 && width < 950 ? '14vh' :
                                                    height <= 1000 && height > 780 && width > 950 ? '22vh' :
                                                    height <= 950 && height >= 805 && width < 450 ? '19vh' :
                                                    height < 805 && height >= 620 && width <= 450 ? '18vh' :
                                                    height < 620 && width < 450 ? '22vh' : 
                                                    height < 450 ? '55vh' : '28vh',
                                                padding: '0px'
                                            }}
                                            >
                                                <div className='character'>
                                                    <span className='name'>Personagem:</span>
                                                    <span className='character_name'>
                                                        {props.name === 'movie' ? items.character
                                                        : items.roles[0].character}
                                                    </span>
                                                </div>
                                                <LazyLoadImage
                                                    src={img2}
                                                    effect='blur'
                                                    width={'100%'}
                                                    height={'100%'}
                                                />
                                            </Button>
                                            <span className='cast_name'>{items.name}</span>
                                        </li>
                                )}) : ''}
                                
                    </ul>
                    {arrow && width > 450 ?
                        <Box className='button' 
                        sx={{top: '-140px'}}>
                            <IconButton className='buttons' size='large' onClick={handleLeft}>
                                <KeyboardArrowLeft fontSize='inherit' />
                            </IconButton>

                            <IconButton className='buttons' size='large' onClick={handleRight}>
                                <KeyboardArrowRight fontSize='inherit'/>
                            </IconButton>
                        </Box> 
                        : ''}
            </Box>
        : ''}
        </div>
    )
}