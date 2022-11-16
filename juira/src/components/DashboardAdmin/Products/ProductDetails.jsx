import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { Tooltip, IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
//   width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: 600
  }));

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxHeight: 500,
  });

export default function ProductDetails(props) {
    const {name, status, description, image, categories} = props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
        <Tooltip title="Ver detalles del producto" arrow>
            <IconButton
                size="large"
                onClick={handleOpen}
            >
                <ArticleRoundedIcon />
            </IconButton>
        </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Item>
                        <Img src={`${image}`}></Img>
                    </Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    {/* <Item> */}
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Descripción:<br></br>
                            {description}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Categorías:
                            <ul>
                        {
                            categories.map( e => <li>{e.name}</li>)
                        }
                        </ul>
                        </Typography>
                    {/* </Item> */}
                </Grid>
            </Grid>
            
        </Box>
      </Modal>
    </div>
  );
}
