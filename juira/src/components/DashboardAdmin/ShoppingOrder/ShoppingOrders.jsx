import React, { useEffect, useState } from 'react';
import styles from './ShoppingOrders.module.css';
import EnhancedTable from './EnhancedShoppingOrderTable';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import DashCard from './DashCard';
import { API_URL_BACKEND } from '../../../api/apiRoute';
import axios from 'axios';
// const orders = require('./orders.json')


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

export default function ShoppingOrders() {
    const classes = useStyles();

    const [orders, setOrders] = useState([])

    useEffect(() => {
      axios.get(`${API_URL_BACKEND}shoppingOrders`)
      .then((response) => setOrders(response.data))
      .catch(error => console.log(error))
    },[])

    // let resp = []
    // axios.get(`${API_URL_BACKEND}shoppingOrders`)
    // .then(response => resp = response.data)
    // .then(() => !orders.length && setOrders(resp))

    let totalAmount = 0
    let ordersQty = 0
    let totalAmountPending = 0
    let ordersPendingQty = 0
    let totalAmountCompleted = 0
    let ordersCompletedQty = 0

    orders.forEach( order => {totalAmount += order.total; ordersQty += 1} )
    orders.forEach( order => {if (order.state === 'pending') totalAmountPending += order.total; ordersPendingQty += 1} )
    orders.forEach( order => {if (order.state === 'approved') totalAmountCompleted += order.total; ordersCompletedQty += 1} )

    
    return (
        <div className={styles.dashWrapper}>
          
            <Container className={classes.root} 
            sx={{ width: "100%", height: "100%", /* backgroundColor:"#444", */
                boxShadow: '0 8px 15px 5px #cccccc55', padding: '2rem', borderRadius: '.8rem' }} >

                <Container sx={{display:"Flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap: "wrap"}}>

                  <DashCard title="Total órdenes" value={`$ ${totalAmount.toLocaleString('de-DE')}`} info1={ordersQty} info2={`de ${ordersQty}`} />
                  
                  <DashCard title="Órdenes pendientes" value={`$ ${totalAmountPending.toLocaleString('de-DE')}`} info1={ordersPendingQty} info2={`de ${ordersQty}`} />

                  <DashCard title="Órdenes completadas" value={`$ ${totalAmountCompleted.toLocaleString('de-DE')}`} info1={ordersCompletedQty} info2={`de ${ordersQty}`} />

                </Container>

                {/* <ProductsTable/> */}

                <EnhancedTable orders={orders} setOrders={setOrders} className={classes.palette} />
                
            </Container>
          
        </div>
      );
  }
