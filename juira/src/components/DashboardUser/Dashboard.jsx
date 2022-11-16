import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import UserDashCard from './UserDashCard.jsx';
import UserDashSales from './UserDashSales'
import UserDashProducts from './UserDashProducts'
import UserDashPurchases from './UserDashPurchases'
import UserChart from './UserDashChart'

import { API_URL_BACKEND } from '../../api/apiRoute.js';
import axios from 'axios';

import { logoOutAction } from "../../redux/actions/app.actions";



export default function Dashboard() {


  const [value, setValue] = React.useState(0);

  const [clicked, setClicked] = React.useState(false);


  const [myShoppingOrders, setMyShoppingOrders] = React.useState([]);
  const [mySales, setMySales] = React.useState([]);
  const [myProducts, setMyProducts] = React.useState([]);




  //const [myTransactions, setMyTransactions] = React.useState([]);

  /*   let res = [];
    axios.get(`${API_URL_BACKEND}shoppingOrders/byToken`)
      .then(response => res = response.data)
      .then(() => myShoppingOrders.length > 0 && setMyShoppingOrders(res))
  
    console.log('Dashboard Usuario > myShoppingOrders: ', myShoppingOrders)
   */

  let history = useHistory();
  const dispatch = useDispatch();

  const handleCatch = (e) => {
    if (JSON.stringify(e).includes('Firebase ID token has expired')) {
      dispatch(logoOutAction());
      history.push(`/juira/login`);
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await axios(`${API_URL_BACKEND}shoppingOrders/byToken`)
    
      handleCatch(response.data);
      if (Array.isArray(response.data)) setMyShoppingOrders(response.data.sort((a,b) => a.id - b.id));
    } catch (e) {
      handleCatch(e);
    }
  }
  const fetchSales = async () => {
    try {
      const response = await axios(`${API_URL_BACKEND}transactions/byToken`)
      handleCatch(response.data);
      setMySales(response.data);     
    } catch (e) {
      handleCatch(e);
    }
  }
  const fetchProducts = async () => {
    try {
      const response = await axios(`${API_URL_BACKEND}products/byToken`)
      handleCatch(response.data);
      setMyProducts(response.data);
    } catch (e) {
      handleCatch(e);
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchSales();
    fetchProducts();
  }, [clicked])


  const items = [
    {
      cartId: 9,
      createdAt: "2022-11-05T22:24:41.082Z",
      id: 1,
      merchant_id: "6394909098",
      paymentReceived: true,
      payment_id: "51215480488",
      preference_id: "1223144793-22cf1e14-68bc-41c8-ab19-45c0a3afb758",
      state: "approved",
      total: 8950,
      transactionList: [
        {
          buyerId: 9,
          createdAt: "2022-11-05T22:24:41.087Z",
          id: 1,
          productId: 37,
          sellerId: 2,
          shoppingOrderId: 1,
          state: "pending",
          total: 8600,
          updatedAt: "2022-11-05T22:24:41.087Z",
        },
        {
          buyerId: 9,
          createdAt: "2022-11-05T22:24:41.087Z",
          id: 2,
          productId: 36,
          sellerId: 5,
          shoppingOrderId: 1,
          state: "pending",
          total: 350,
          updatedAt: "2022-11-05T22:24:41.087Z",
        }
      ]
    },
    {
      cartId: 9,
      createdAt: "2022-11-05T22:26:00.251Z",
      id: 2,
      merchant_id: "6394926942",
      paymentReceived: true,
      payment_id: "51215527849",
      preference_id: "1223144793-0651967d-3cfd-4069-a986-7d2edfe13778",
      state: "approved",
      total: 33000,
      transactionList: [
        {
          buyerId: 9,
          createdAt: "2022-11-05T22:26:00.255Z",
          id: 3,
          productId: 20,
          sellerId: 2,
          shoppingOrderId: 2,
          state: "pending",
          total: 33000,
          updatedAt: "2022-11-05T22:26:00.255Z",
        },
        {

        }
      ],
      updatedAt: "2022-11-05T22:26:27.484Z",
    }
  ];

  const myShoppingOrders2 = [
    {
      "id": 1,
      "state": "approved",
      "total": 8950,
      "paymentReceived": true,
      "payment_id": "51215480488",
      "preference_id": "1223144793-22cf1e14-68bc-41c8-ab19-45c0a3afb758",
      "merchant_id": "6394909098",
      "createdAt": "2022-11-05T22:24:41.082Z",
      "updatedAt": "2022-11-05T22:24:58.351Z",
      "cartId": 9,
      "transactionList": [
        {
          "id": 1,
          "state": "pending",
          "sellerId": 2,
          "total": 8600,
          "createdAt": "2022-11-05T22:24:41.087Z",
          "updatedAt": "2022-11-05T22:24:41.087Z",
          "productId": 37,
          "shoppingOrderId": 1,
          "buyerId": 9
        },
        {
          "id": 2,
          "state": "pending",
          "sellerId": 5,
          "total": 350,
          "createdAt": "2022-11-05T22:24:41.087Z",
          "updatedAt": "2022-11-05T22:24:41.087Z",
          "productId": 36,
          "shoppingOrderId": 1,
          "buyerId": 9
        }
      ]
    },
    {
      "id": 2,
      "state": "approved",
      "total": 33000,
      "paymentReceived": true,
      "payment_id": "51215527849",
      "preference_id": "1223144793-0651967d-3cfd-4069-a986-7d2edfe13778",
      "merchant_id": "6394926942",
      "createdAt": "2022-11-05T22:26:00.251Z",
      "updatedAt": "2022-11-05T22:26:27.484Z",
      "cartId": 9,
      "transactionList": [
        {
          "id": 3,
          "state": "pending",
          "sellerId": 2,
          "total": 33000,
          "createdAt": "2022-11-05T22:26:00.255Z",
          "updatedAt": "2022-11-05T22:26:00.255Z",
          "productId": 20,
          "shoppingOrderId": 2,
          "buyerId": 9
        }
      ]
    }
  ]







  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  try {



    const totalAmountPurchases = myShoppingOrders.reduce((prev, actual) => prev + actual.total, 0);
    let productsQuantityPurchases = 0;
    if (myShoppingOrders && myShoppingOrders.length > 0)
      productsQuantityPurchases = myShoppingOrders.length;

    let totalAmountSales = 0;
    if (mySales && mySales.transactions && mySales.transactions.asSeller && mySales.transactions.asSeller.length)
      totalAmountSales = mySales.transactions.asSeller.reduce((prev, actual) => actual.total ? prev + actual.total : 0, 0);

    let productsQuantitySales = 0;
    if (mySales && mySales.length > 0)
      productsQuantitySales = mySales.length;
    //console.log('mySales > ', mySales)

    const totalOperations = productsQuantityPurchases + productsQuantitySales;


    const chartData = [
      { name: 'Compras', value: totalAmountPurchases },
      { name: 'Ventas', value: totalAmountSales },
    ];

    //const colorPurchases = 'rgb(255,105,162)' //'255,105,162'; // PinkishRed //"#69c3ff"
    //const colorPurchases = getComputedStyle(document.documentElement).getPropertyValue('--colorDashPurchases');
    const colorPurchases = 'rgb(255, 105, 115)';//getComputedStyle(document.documentElement).getPropertyValue('--colorDashPurchases');

    //const colorSales = 'rgb(105,195,255)' //'105,195,255'; // LightBlue //
    //const colorSales = getComputedStyle(document.documentElement).getPropertyValue('--colorDashSales');
    const colorSales = 'rgb(105, 195, 255)'; //getComputedStyle(document.documentElement).getPropertyValue('--colorDashSales');

    const textColorDash = '#FFFFFF'; // White


    /* const css = `
    #main {
      width: 300px;
      height: 200px;
      background - color: #333;
    }
    ` 
  
     return (
        <div class="my-element">
            <style>{css}</style>
            some content
        </div>
    ) 
  
    // Initialize the echarts instance based on the prepared dom
    var myChart = echarts.init(document.getElementById('main'));
   
    // Specify the configuration items and data for the chart
    var option = {
        title: {
            text: 'ECharts Getting Started Example'
        },
        tooltip: {},
        legend: {
            data: ['sales']
        },
        xAxis: {
            data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
        },
        yAxis: {},
        series: [
            {
                name: 'sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    }; */


    return (
      <Container sx={{ boxShadow: '0 0 15px 5px #cccccc55', padding: 5, width: '100' }}>

        <Typography sx={{ marginTop: '0', fontSize: '1.5rem', width: 1, borderBottom: "solid var(--primaryColor)" }} color="var(--primaryColor)" gutterBottom>
          DASHBOARD DE USUARIO
        </Typography>


        <Container sx={{ display: "Flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>

          <UserDashCard title="Mis Compras" value={totalAmountPurchases} info1={productsQuantityPurchases}
            info2={`de ${totalOperations} operaciones`} bkColor={colorPurchases} textColor={textColorDash} />

          {/* <PieChart
                  data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                  ]}
                  viewBoxSize={['100','100']}
                */}

          {/* <script src="echarts.js"></script>
                <div id="main">
                    <style>{css}</style>
                </div> */}

          {/* <Chart /> */}
          {/* <ChartDemo /> */}


          {/* <PieChart /> */}
          <UserChart data={chartData} colors={[colorPurchases, colorSales]} />

          <UserDashCard title="Mis Ventas" value={totalAmountSales} info1={productsQuantitySales}
            info2={`de ${totalOperations} operaciones`} bkColor={colorSales} textColor={textColorDash} />
          {/* "rgb(255,105,162)",//"#69c3ff",//bkColor, */}

        </Container>


        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'var(--primaryColor)' }}>
            <Tabs value={value}
              textColor="primary"
              indicatorColor="primary"//"#23c197"
              onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Mis Compras" {...a11yProps(0)} sx={{ color: 'var(--primaryColor)' }} />
              <Tab label="Mis Ventas" {...a11yProps(1)} sx={{ color: 'var(--primaryColor)' }} />
              <Tab label="Mis Productos" {...a11yProps(2)} sx={{ color: 'var(--primaryColor)' }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* Mis Compras */}
            {/* <UserDashPurchases list={myPurchases} /> */}
            <UserDashPurchases list={myShoppingOrders} setClicked={setClicked} clicked={clicked} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Mis Ventas */}
            <UserDashSales list={mySales} setClicked={setClicked} clicked={clicked} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* Mis Productos */}
            <UserDashProducts list={myProducts} setClicked={setClicked} clicked={clicked} fetchProducts={fetchProducts} />
          </TabPanel>
        </Box>

      </Container>
    );
  } catch (e) {
    handleCatch(e);
  }
}



/* export const logoOutAction = () => {
  return (dispatch) => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    // dispatch(logoOutSuccess());
    // toast.success("Sesion Cerrada Exitosamente");
  };
}; */







function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple - tabpanel - ${index} `}
      aria-labelledby={`simple - tab - ${index} `}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Container>{children}</Container>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple - tab - ${index} `,
    'aria-controls': `simple - tabpanel - ${index} `,
  };
}

/*export function BasicTabs() {

const [value, setValue] = React.useState(0);
 
const handleChange = (event, newValue) => {
  setValue(newValue);
};
 
return (
  <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
          Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
          Item Three
      </TabPanel>
  </Box>
); 
*/
