import React, { useEffect } from 'react';
import styles from './Products.module.css';
import EnhancedTable from './EnhancedProductsTable';
//import ProductsTable from './ProductsTable';
import Container from '@mui/material/Container';
// import { themeOptions } from '../../ThemeColors.js'
import DashCard from './DashCard.jsx';
import { createTheme } from '@mui/material/styles';
import { API_URL_BACKEND } from '../../../api/apiRoute';
import axios from 'axios';
const theme = createTheme();


const useStyles = ({
    root: {
    color: theme.palette.primary.main,
  }
,
    /* btn: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    }, */
    
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

  // let resp = []
  // axios.get(`${API_URL_BACKEND}products`)
  // .then(response => resp = response.data)

 export default function Products() {

  const [products, setProducts] = React.useState([])
  let resp = []
  axios.get(`${API_URL_BACKEND}products`)
    .then(response => resp = response.data)
    .then(() => !products.length && setProducts(resp))
    .catch(error => console.log(error))

  // !products.length && setProducts(resp)
  
    const classes = useStyles();

    // try {

      // Card 1
      let productsTotalQuantity = products.length;
      let totalAmount = "$ " + products.reduce((prev, curr)=>prev+curr.price, 0).toLocaleString('de-DE');
      
      // Card 2 
      const publishedProducts = products.filter(p=>p.status==="Publicado");
      let productsPublishedQuantity = publishedProducts.length;
      let totalAmountPublished = "$ " + publishedProducts.reduce((prev, curr)=>prev+curr.price, 0).toLocaleString('de-DE');

      // Card 3
      const pausedProducts = products.filter(p=>p.status==="En pausa");
      let productsPausedQuantity = pausedProducts.length;
      let totalAmountPaused = "$ " + pausedProducts.reduce((prev, curr)=>prev+curr.price, 0).toLocaleString('de-DE');

      //let totalAmountSold = 0;
      //let productsSold = 0;
      //let productsDeleted = 0;
      
      /* useEffect( ()=>{

      },[]) */

      return (
        <div className={styles.dashWrapper}>
          
            <Container className={classes.root} 
            sx={{ width: "100%", height: "100%", /* backgroundColor:"#444", */
                boxShadow: '0 8px 15px 5px #cccccc55', padding: '2rem', borderRadius: '.8rem' }} >

                <Container sx={{display:"Flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap: "wrap"}}>

                  <DashCard title="Total Productos" value={totalAmount} info1={productsTotalQuantity} info2={`de ${productsTotalQuantity}`} />
                  
                  <DashCard title="Productos Publicados" value={totalAmountPublished} info1={productsPublishedQuantity} info2={`de ${productsTotalQuantity}`} />

                  <DashCard title="Productos en Pausa" value={totalAmountPaused} info1={productsPausedQuantity} info2={`de ${productsTotalQuantity}`} />

                </Container>

                {/* <ProductsTable/> */}

                <EnhancedTable products={products} className={classes.palette} setProducts={setProducts} />
                
            </Container>
          
        </div>
      );
  // }
  // catch(e) {
  //   return (null)
  // }
}

{/* <ThemeProvider theme={themeOptions}> */}
