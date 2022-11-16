import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: '#fff',
    border: '0px solid #000',
    borderColor: 'primary.main',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};


const Img = styled("img")({
    margin: "auto",
    display: "block",
    height: '100%',
    border: 0,
    position: 'relative',
});

export default function ImageView(props) {
    const { image, openModal, closeModal } = props;
    return (
        <div>
            <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Img alt="complex" src={image} />

                    <Button onClick={() => closeModal()} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                        <CloseIcon />
                    </Button>

                </Box>

            </Modal>
        </div>
    )
}
