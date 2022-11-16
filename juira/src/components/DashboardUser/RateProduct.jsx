import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Rate from './Rate'
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL_BACKEND } from '../../api/apiRoute.js';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function RateProduct({productId, clicked, setClicked}) {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(2);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSumbit = async () => {
    try{
        const rate = await axios.post(`${API_URL_BACKEND}reviews`, {stars: value , productReviewed: productId})
        toast.success("Gracias por calificar tu producto")
        setOpen(false);
        setClicked(!clicked)
    } catch (error) {
        toast.error(error.message)
    }
  };

  return (
    <div>
      <Button variant="contained" sx={{ color: "white", fontSize: ".8rem" }} onClick={handleClickOpen}>
        Puntúa el producto
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Puntúa el producto
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          Tu opinión es muy importante para nosotros. La reputación de nuestros usuarios es vital, 
          y la comunidad de Juira puede seguir creciendo gracias a tu puntaje. No seas tímido 😆
          </Typography>
          <Rate productId={productId} setValue = {setValue} value = {value}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSumbit}>
            Puntuar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}