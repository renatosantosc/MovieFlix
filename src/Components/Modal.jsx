import { Modal, Box, Button } from '@mui/material'

export default function Modal_Video(props){
    const handleClose = () =>{ props.setOpen(false) }
    const width = window.innerWidth
    return(
        <>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                sx={{
                    boder: 'none'             
                }}
            >
                <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <iframe src={`https://www.youtube.com/embed/${props.id}?autoplay=1&mute=1`}
                allowFullScreen="allowFullScreen"
                title='Filme' width='80%' height={width < 450 ? '50%' : '95%'} />
                <Button variant='text' onClick={handleClose}
                sx={{
                    color: '#232323',
                    marginTop: '1%',
                    backgroundColor: '#fff',
                    width: width > 470 ? '15%' : '50%',
                    '&:hover':{
                        backgroundColor: '#232323',
                        color: '#fff'
                    }
                }}>
                    Fechar trailer
                </Button>
                </Box>
            </Modal>
        </>
    )
}