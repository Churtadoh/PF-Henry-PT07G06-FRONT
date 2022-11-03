import React from 'react';
import Container from '@mui/material/Container';
//import DashCard from './DashCard.jsx';
import EnhancedTable from './EnhancedTable';


// import DashCard from './DashCard.jsx';
import UserDashTable from './UserDashTable';



export default function UserDashPurchases(props) {

    // let products = useSelector((state) => state.productsReducer.allProducts);

    // const dispatch = useDispatch();
    // products.length === 0 && dispatch(getAllProducts());

    // // Card 1
    // let productsTotalQuantity = products.length;
    // let totalAmount = "$ " + products.reduce((prev, curr) => prev + curr.price, 0).toLocaleString('de-DE');

    // // Card 2 
    // const publishedProducts = products.filter(p => p.status === "Publicado");
    // let productsPublishedQuantity = publishedProducts.length;
    // let totalAmountPublished = "$ " + publishedProducts.reduce((prev, curr) => prev + curr.price, 0).toLocaleString('de-DE');

    // // Card 3
    // const pausedProducts = products.filter(p => p.status === "En pausa");
    // let productsPausedQuantity = pausedProducts.length;
    // let totalAmountPaused = "$ " + pausedProducts.reduce((prev, curr) => prev + curr.price, 0).toLocaleString('de-DE');

    //let totalAmountSold = 0;
    //let productsSold = 0;
    //let productsDeleted = 0;

    console.log('UserDashPurchases > props: ', props)

    return (
        <Container component={'span'}
            sx={{
                width: "85%", height: "100%", /* backgroundColor:"#444", */
                boxShadow: '0 8px 15px 5px #cccccc55', padding: '2rem', borderRadius: '.8rem'
            }} >

            <UserDashTable list={props.list} />
            {/* <EnhancedTable items={products} className={classes.palette} /> */}

        </Container>
    )
}

