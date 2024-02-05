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
                title='Filme' width='80%' height={width < 450 ? '50%' : '80%'} />
                <Button variant='text' onClick={handleClose}
                sx={{
                    color: '#fff',
                    marginTop: '1%'
                }}>
                    Fechar
                </Button>
                </Box>
            </Modal>
        </>
    )
}