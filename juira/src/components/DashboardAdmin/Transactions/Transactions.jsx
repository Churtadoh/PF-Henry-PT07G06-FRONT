import React, { useEffect, useState, useRef } from 'react';
import styles from './Transactions.module.css';
import EnhancedTable from './EnhancedTransactionTable';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import DashCard from './DashCard';
import { API_URL_BACKEND } from '../../../api/apiRoute';
import axios from 'axios';


const theme = createTheme();

const useStyles = ({
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

    const [transactions, setTransactions] = useState([])

    const [balance, setBalance] = useState({})

    const [clicked, setClicked] = useState(false)

    useEffect(() => {
      axios.get(`${API_URL_BACKEND}transactions`)
      .then((response) => setTransactions(response.data))
      .then(() => axios.get(`${API_URL_BACKEND}balance`))
      .then((response) => setBalance(response.data))
      .catch(error => console.log(error))
    },[clicked])

    let totalAmount = 0
    let ordersQty = 0
    let totalAmountPending = 0
    let ordersPendingQty = 0
    let totalAmountCompleted = 0
    let ordersCompletedQty = 0

    // transactions.forEach( transactions => {totalAmount += transactions.total; transactionssQty += 1} )
    // transactions.forEach( transactions => {if (transactions.state === 'pending') totalAmountPending += transactions.total; ordersPendingQty += 1} )
    // transactions.forEach( transactions => {if (transactions.state === 'approved') totalAmountCompleted += transactions.total; ordersCompletedQty += 1} )

    
    return (
        <div className={styles.dashWrapper}>
          
            <Container className={classes.root} 
            sx={{ width: "100%", height: "100%", /* backgroundColor:"#444", */
                boxShadow: '0 8px 15px 5px #cccccc55', padding: '2rem', borderRadius: '.8rem' }} >

                <Container sx={{display:"Flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap: "wrap"}}>

                  <DashCard title="Balance disponible" value={`$ ${balance.total ? balance.total?.toLocaleString('de-DE') : 0}`} info1={ordersQty} info2={`de ${ordersQty}`} />
                  
                  {/* <DashCard title="Órdenes pendientes" value={`$ ${totalAmountPending.toLocaleString('de-DE')}`} info1={ordersPendingQty} info2={`de ${ordersQty}`} />

                  <DashCard title="Órdenes completadas" value={`$ ${totalAmountCompleted.toLocaleString('de-DE')}`} info1={ordersCompletedQty} info2={`de ${ordersQty}`} /> */}

                </Container>

                {/* <ProductsTable/> */}

                <EnhancedTable transactions={transactions} setClicked={setClicked} clicked={clicked} setTransactions={setTransactions} className={classes.palette} />
                
            </Container>
          
        </div>
      );
  }
