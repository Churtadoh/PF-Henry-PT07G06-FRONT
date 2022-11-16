import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast';

export default function Contact() {
  const form = React.useRef();  

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_bwbqp56', 'template_fopi37i', form.current, 'pXB0Xww8WQPwt1hTj')
      .then((result) => {
    
          setInput(initialInput);
          setOpen(false)
          toast.success('Tu mensaje ha sido enviado con exito')
      }, (error) => {
          console.log(error.text);
          setOpen(false)
          toast.error('Intenta nuevamente')
      });
  };

  const [open, setOpen] = React.useState(false);

  const initialInput =  {
    name: '',
    email: '',
    message:''
  }; 

  const[input,setInput] = React.useState(initialInput)

  function handleInputChange(e) {
    const newInput = {
        ...input,
        [e.target.name] : e.target.value
    }
    setInput(newInput)
 };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInput(initialInput)
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Contáctanos
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enviar Mensaje</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para enviarnos un mensanje por favor escribe tu nombre, correo
            y mensaje. Responderemos a tu mensjae lo mas pronto posible.
          </DialogContentText>
          <form  ref={form} onSubmit={sendEmail}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value = {input.name}
            onChange = {handleInputChange}
            label="Nombre"
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            value = {input.email}
            onChange = {handleInputChange}
            label="Correo electronico"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            multiline
            margin="dense"
            name="message"
            value = {input.message}
            onChange = {handleInputChange}
            label="Mensaje"
            type="string"
            fullWidth
            variant="standard"
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={sendEmail}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


