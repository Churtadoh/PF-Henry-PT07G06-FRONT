import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {
    Avatar,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
import { styled } from '@mui/material/styles';
import { getAuth, signOut } from "firebase/auth";
import {logoOutAction, getUser, editUser } from '../../redux/actions/app.actions'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import Badge from '@mui/material/Badge';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import Loading from '../Loading/Loading'



export default function PerfilUser() {
  let u = useSelector((state) => state.app.user)
  const dispatch=useDispatch()
  const history = useHistory();
  const auth = getAuth();

  useEffect(()=>{

    dispatch(getUser());
  },[dispatch])

  useEffect(()=>{
    setUserData(u)
  },[u])
  
const [dis,setDis]=useState(true)
let userToken = useSelector((state) => state.app.token.token)
const [userData, setUserData]=useState(u)
const [previewSource, setPreviewSource]= useState()

let handleFileInputChange=(e)=>{
  
  const file=e.target.files[0]
  previewFile(file)
  handleImage(file)
  
}

const previewFile=(file)=>{
  const reader= new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    setPreviewSource(reader.result)
  }
}

let handleImage=async(file)=>{

 
  const formData=new FormData()
  formData.append('file', file)
  formData.append("upload_preset",'DB_PF_USERS' )
  delete axios.defaults.headers.common["Authorization"];
  await axios.post('https://api.cloudinary.com/v1_1/duq1tcwjw/image/upload', 
  formData).then((response)=>{
    setUserData({...userData, image: response.data.secure_url})
  })
  .finally( axios.defaults.headers.common["Authorization"] = userToken)
  
}
 

    const handleLogOut=async()=>{
      dispatch(logoOutAction())
      setUserData({name: '',
      image: '',
      emailAddress: "",
      rating:0,
      homeAddress:"",
      city: "",
      region: "",
      phoneNumber : "",
     })
        await signOut(auth)
        .catch(error=> console.log(`Error ${error.code}: ${error.message}`))
       
        history.push(`/juira/login`)

    }
   
    const handleOnChange=(e)=>{
          setUserData({
            ...userData,
            [e.target.name]: e.target.value,
          });}


    const handleEdit = () => {
      setDis(!dis)
    };

    const handleSubmit=async()=>{
      await dispatch(editUser(u.id,userData))
      handleEdit()
      
      history.push(`/juira/login`)
    }

  return (
    ( u.emailAddress || userData.emailAddress )?
      <div>
         <Card sx={{ maxWidth: 1, my:3,mx:8, p:3, alignContent:'center', justifyContent: 'center'}}>
      <CardHeader
        avatar={
          <Badge anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }} badgeContent={<IconButton  disabled={dis} sx={{color:'var(--primaryColor)'}}/* color="success" */ aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" id="upload_widget" onChange={handleFileInputChange} />
          <AddAPhotoIcon  />
        </IconButton>
            }>
            <Avatar sx={{width:150, height:150}} aria-label="User" src={previewSource || u.image ||userData.image || 'https://res.cloudinary.com/duq1tcwjw/image/upload/v1667600965/DB_PF_USERS/user_sin_imagen_htrvzg.png'}/>
          
          </Badge>
          
        }
        action={
          <IconButton aria-label="settings" onClick={handleEdit}>
            <EditIcon  />
          </IconButton>
        }
        title={
          <TextField  name='name'
        onChange={handleOnChange}
        inputProps={{style: {fontSize: 35}}} 
        sx={ {m:5}} 
        disabled={dis}
        value={(userData.name )?.toUpperCase()} 
        variant='standard'/>
          }
        subheader={
        <div style={{display: "flex", flexDirection: "column"}}>
        <Rating sx={{ml: 5}} name="read-only" precision={0.5} value={u.rating|| 0} readOnly />
        <label style={{marginLeft: "40px", color: "#c8c8ca"}}>{u.userReviewed?.length ? `En base a ${u.userReviewed.length} reviews` : "No hay reviews aún"}</label>
        </div>
        }
      />

<Typography paragraph align='left' sx={{m:5, fontSize:25, textDecoration: 'underline' }}>
          Mis Datos Personales:
        </Typography>
<CardContent sx={{m:2, display:'flex', justifyContent: 'space-around', textAlign: 'center'}}>
        <Box>
        <Box sx={{display:'flex'}}>
          <Typography paragraph sx={{mb:4, fontSize:20}}>
           Dirección: 
          </Typography>
          <TextField  name='homeAddress'
          onChange={handleOnChange} 
          sx={{ml:2}} 
          inputProps={{style: {fontSize: 20}}}
          disabled={dis} value={userData.homeAddress}
          variant='standard'/>
          </Box>
          <Box sx={{display:'flex'}}>
          <Typography paragraph sx={{mb:4, fontSize:20}}>
           Correo electronico: 
          </Typography>
          <TextField  name='emailAddress'
          onChange={handleOnChange} 
          sx={{ml:2}} 
          inputProps={{style: {fontSize: 20}}}
          disabled={true} value={userData.emailAddress || u.emailAddress}
          variant='standard'/>
          </Box>
                  <Box  sx={{display:'flex'}}>
         <Typography paragraph sx={{fontSize: 20}}>
           Teléfono:
          </Typography>
          <TextField 
          name='phoneNumber'
          onChange={handleOnChange} 
          sx={{ml:2}} inputProps={{style: {fontSize: 20}}}
          disabled={dis} value={userData.phoneNumber}
          variant='standard'/>
         </Box>
         
        </Box>

        <Box>
        <Box  sx={{display:'flex'}}>
        <Typography paragraph sx={{mb:4, fontSize:20}}>
           Ciudad:
          </Typography>
          <TextField
          name='city'
          onChange={handleOnChange} 
          sx={{ml:2}} 
          inputProps={{style: {fontSize: 20}}} 
          disabled={dis} value={userData.city} 
          variant='standard'/>
        </Box>
        <Box  sx={{display:'flex'}}>
        <Typography sx={{fontSize: 20}}>
          Region:
          </Typography>
          <TextField 
          name='region'
          onChange={handleOnChange}  
          sx={{ml:2}} 
          inputProps={{style: {fontSize: 20}}} 
          disabled={dis} value={userData.region} 
          variant='standard'/>
        </Box>
         
        </Box>
        </CardContent>
    <Box sx={{display: 'flex', justifyContent:'space-around', mt:5}}>
      <Button onClick={ handleLogOut}>Salir</Button>
      {(dis===false)&&<Button onClick={handleSubmit}> Save Changes</Button>}

    </Box>
      
    </Card>
     
    </div> :
    <div>
    <Loading/>
    </div>
    
    
    
  
    
  )
}
