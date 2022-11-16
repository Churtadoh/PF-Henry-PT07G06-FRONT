import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@mui/material';
// import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import toast from 'react-hot-toast';

export default  function Register() {

    const history = useHistory()

    const auth = getAuth();
    const [user, setUser]=React.useState({
        name: '',
        emailAddress: ' ',
        password: ' '

    })

    const handleChange=(e)=>{
        setUser({...user,
            [e.target.name]:e.target.value})
    }

    const handleOnSubmit= async(e)=> {
    
        if (user.name.length===0||user.emailAddress.length===0||user.password.length===0)  {
        alert('Complete todos los campos por favor!')
        }
        else{
            //aca a la accion de dispatch a session login
          await createUserWithEmailAndPassword(auth, user.emailAddress, user.password)
          .then((res)=>{
            const currentUser=res.user
            console.log(currentUser)
            toast.success('Usuario registrado, inicia sesión')
            history.push(`/juira/login`)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            toast.error(error.message)
          });
         }
         
       
        
      }


    const paperStyle={padding :20,height:'70vh',width:350, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const txtstyle = { margin: '10px 0', fontFamily: 'nunito', color: 'var(--primaryColor)'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle} >
                <Grid align='center' style={{marginBottom:'20px'}}>
                     <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                    <h2>Registrarse</h2>
                </Grid>
                {<TextField label='Nombre y Apellido' name='name'  onChange={handleChange} placeholder='Nombre y Apellido' style={txtstyle} fullWidth required/>}
                {<TextField label='Mail' name='emailAddress'  onChange={handleChange} placeholder='Mail' style={txtstyle} fullWidth required/>}
                {/* <TextField label='Usuario' placeholder='Usuario' style={txtstyle} fullWidth required/> */}
                <TextField label='Password' name='password'  onChange={handleChange} placeholder='Password' style={txtstyle} type='password' fullWidth required/>
                <TextField label='Repetir Password' placeholder='Repetir Password' style={txtstyle} type='password' fullWidth required/>
                {/* <FormControlLabel
                    control={
                    <Checkbox style={{ color: 'var(--primaryColor)' }}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Recuérdame"
                 /> */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth sx={

            {backgroundColor: '#23c197', '&:hover': {backgroundColor: '#138f6e'}}
          } onClick={handleOnSubmit}>Registrarse</Button>

                {/* <Typography >
                     <Link to="#" >
                        Olvidaste tu contraseña?
                </Link>
                </Typography> */}
                <Typography > Ya estás registrado?
                     <Link to="/juira/login" >
                        Iniciar Sesión 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
