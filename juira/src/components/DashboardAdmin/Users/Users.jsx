import React, { useEffect, useState } from 'react';
import styles from './Users.module.css';
import EnhancedTable from './EnhancedUsersTable';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import DashCard from './DashCard'
import axios from 'axios';
import { API_URL_BACKEND } from '../../../api/apiRoute';
// const users = require('./users.json')



const theme = createTheme();

const useStyles = makeStyles({
    root: {
    color: theme.palette.primary.main,
  }
, 
    palette: {
    type: 'light',
    primary: {
      main: '#23c197',
    },
    secondary: {
      main: '#19d6c6',
    },
    text: {
      primary: 'rgba(179,0,0,0.87)',
    },
  },

  });
  
  
  export default function Users() {
    const classes = useStyles();
   
    const [users, setUsers] = useState([])
    // let resp = []
    // axios.get(`${API_URL_BACKEND}users`)
    // .then(response => resp = response.data)
    // .then(() => !users.length && setUsers(resp))
    // .catch( error => console.log(error))

    useEffect(() => {
      axios.get(`${API_URL_BACKEND}users`)
      .then((response) => setUsers(response.data))
      .catch(error => console.log(error))
    },[])


    let totalUsers = users.length
    let activeUsers = 0
    let inactiveUsers = 0
    
    users.forEach( user => user.status === 'active' ? activeUsers += 1 : inactiveUsers += 1)

    return (
        <div className={styles.dashWrapper}>
          
            <Container className={classes.root} 
            sx={{ width: "100%", height: "100%", /* backgroundColor:"#444", */
                boxShadow: '0 8px 15px 5px #cccccc55', padding: '2rem', borderRadius: '.8rem' }} >

                <Container sx={{display:"Flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap: "wrap"}}>

                  <DashCard title="Total usuarios" value={totalUsers} info1={totalUsers} info2={`de ${totalUsers}`} />
                  
                  <DashCard title="Usuarios activos" value={activeUsers} info1={activeUsers} info2={`de ${totalUsers}`} />

                  <DashCard title="Usuarios inactivos" value={inactiveUsers} info1={inactiveUsers} info2={`de ${totalUsers}`} />

                </Container>

                <EnhancedTable users={users} className={classes.palette} setUsers={setUsers}/>
                
            </Container>
          
        </div>
      );
  }

