import { Box, Typography, Button } from '@mui/material'
import './Styles/NotFound.css'
export default function NotFound(){

    return(
        <Box className='box_found' sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography className='logo_found'
            sx={{
                color: 'red',
                fontSize: '7rem'
            }}>
                MOVIEFLIX
            </Typography>

            <Typography className='not_found'
            sx={{
                color: 'white',
                fontSize: '1.7rem'
            }}>
                Página não encontrada :(
            </Typography>

            <Button 
            clasName='button_found' 
            variant='contained' 
            onClick={()=>{window.history.back()}}
            sx={{
                backgroundColor: 'white',
                color: 'black',
                marginTop: '5%',
                width: '15%'
            }}>
                Voltar
            </Button>
        </Box>
    )
}