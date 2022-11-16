import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import QA from './QA.jsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderColor: 'primary.main',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

export default function UserDashViewQA(props) {
    const { product, openModal, closeModal } = props;

    return (
        <div>

            <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {`Preguntas y Respuestas de tu producto ${product.name} (id ${product.id})`}
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    <QA id={product.id} />
                </Box>
            </Modal>

        </div >
    );
}
