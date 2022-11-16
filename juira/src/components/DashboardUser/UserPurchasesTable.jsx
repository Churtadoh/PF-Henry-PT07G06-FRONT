import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { updateCartApi} from "../../redux/actions/products.actions";
  import toast from "react-hot-toast";
import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@mui/material/Button';
//import Container from '@material-ui/core/Container';
import axios from 'axios';
import { API_URL_BACKEND } from '../../api/apiRoute.js';
import RateProduct from './RateProduct';


const parseDate = (str) => {
    
    return str.slice(0, 10).split('-').reverse().join('/');
}


const handleProductReceived = async (e, setClicked, clicked) => {

    const response = await axios.put(`${API_URL_BACKEND}transactions/${e.target.value}`, { state: "received" });
    setClicked(!clicked);
    toast.success('No te olvides de calificar tu producto')
}

function Row(props) {
    const { row, clicked, setClicked } = props;
    const [open, setOpen] = React.useState(false);
    console.log('UserPurchasesTable > Row > props: ', props)
 

    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState("");
    useEffect(() => {
        if (redirect !== "") window.open(redirect, "_blank", "popup=true");
      }, [redirect]);

    const handlePayment = async (id) => {
        try {
          const response = await axios.get(
            `${API_URL_BACKEND}payment?id=${id}`
          );
          setRedirect(response.data.init_point);
          dispatch(updateCartApi())
        } catch (error) {
          toast.error(error.response.data)
          console.log("error", error);
        }
      };
    
    const handleCancel = async (id) => {
        try {
        const response = await axios.put(`${API_URL_BACKEND}shoppingOrders/${id}`, {state: 'cancelled'});
        response.data.transactionList.forEach(async el => 
            await axios.put(`${API_URL_BACKEND}transactions/${el.id}`, {state: 'cancelled'})
            );
        setClicked(!clicked)    
        } catch (error) {
            toast.error(error.response.data)
            console.log("error", error);
        }
    };  

    return (
        <React.Fragment>
            <TableRow /* className={classes.root} */>
                <TableCell>
                    <Button aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                </TableCell>

                <TableCell component="th" scope="row" align="center">
                    {row.id}
                </TableCell>
                <TableCell align="right">{parseDate(row.createdAt)}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="right">{row.total.toLocaleString('de-DE')}</TableCell>
                <TableCell align="center">{row.paymentReceived ? 'Si' : 'No'}</TableCell>
                <TableCell align="center">{row.merchant_id}</TableCell>
                {(row.state==='pending') && 
                <TableCell align="center">
                    <Button  variant="contained" sx={{ color: "white", fontSize: ".8rem" }} onClick={()=>handlePayment(row.id)}>
                        Completar Pago
                    </Button>
                </TableCell>}
                {(row.state==='pending') && 
                <TableCell align="center">
                    <Button variant="contained" sx={{ color: "white", fontSize: ".8rem" }} onClick={()=>handleCancel(row.id)}>
                        Cancelar Orden
                    </Button>
                </TableCell>}
                
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {/* <Typography style={{ color: 'var(--primaryColor)' }} variant="h7" gutterBottom component="div">
                                Transacciones
                            </Typography> */}
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>

                                        {/*Subtable > Transactions */}
                                        <TableCell></TableCell>
                                        <TableCell>Nº{/* o. de Transaccion */}</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell align="center">Id. Vendedor</TableCell>
                                        <TableCell align="right">Monto</TableCell>
                                        <TableCell align="center">Fecha</TableCell>
                                        <TableCell align="right">Producto</TableCell>
                                        <TableCell align="center">Orden de compra</TableCell>
                                        <TableCell align="center">Comprador</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.transactionList?.map((transactionRow) => (
                                        <TableRow key={transactionRow.id}>

                                            <TableCell>
                                                {transactionRow && transactionRow.state && transactionRow.state === 'sent'
                                                    ? <Button value={transactionRow.id} variant="contained" sx={{ color: "white", fontSize: ".8rem" }}
                                                        onClick={(e) => handleProductReceived(e, setClicked, clicked)}>Producto Recibido</Button>
                                                    : null
                                                }
                                            {(transactionRow.product.productReviewed === null && transactionRow.state === 'received') && 
                                            <RateProduct productId={transactionRow.productId} clicked={clicked} setClicked = {setClicked}/>}    
                                            </TableCell>
                                            <TableCell component="th" scope="row" >
                                                {transactionRow.id}
                                            </TableCell>
                                            <TableCell>{transactionRow.state}</TableCell>
                                            <TableCell align="center">{transactionRow.sellerId}</TableCell>
                                            <TableCell align="right">
                                                {transactionRow.total.toLocaleString('de-DE')}
                                                {/* Math.round(transactionRow.amount * row.price * 100) / 100 */}
                                            </TableCell>
                                            <TableCell align="right">{parseDate(transactionRow.createdAt)}</TableCell>
                                            <TableCell align="center">{transactionRow.productId}</TableCell>
                                            <TableCell align="center">{transactionRow.shoppingOrderId}</TableCell>
                                            <TableCell align="center">{transactionRow.buyerId}</TableCell>

                                        </TableRow>
                                    
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}
Row.propTypes = {
    row: PropTypes.shape({

        createdAt: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        paymentReceived: PropTypes.bool.isRequired,
        /* transactions: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired, */
        /* name: PropTypes.string.isRequired, */
    }).isRequired,
};


function createData(id, createdAt, state, total, paymentReceived, merchant_id, transactionList) {
    return {
        id,
        createdAt,
        state,
        total,
        paymentReceived,
        merchant_id,
        transactionList: transactionList, /* || [
            { id: 100, state: 'pending', sellerId: 20, total: 1350, createdAt: '2022-05-18 11:35', productId: 11, shoppingOrderId: 22, buyerId: 7 },
            { id: 101, state: 'pending', sellerId: 21, total: 7100, createdAt: '2022-06-21 18:48', productId: 12, shoppingOrderId: 22, buyerId: 7 },
            { id: 102, state: 'pending', sellerId: 20, total: 5800, createdAt: '2022-08-05 23:55', productId: 13, shoppingOrderId: 22, buyerId: 7 },
        ], */
    };
}

let myShoppingOrders = [];
myShoppingOrders = [
    { id: 1, createdAt: '2022-09-30 08:23', state: 'pending', total: 1000, paymentReceived: true, merchant_id: 9, transactionList: [] },
    { id: 2, createdAt: '2022-10-15 10:23', state: 'pending', total: 2500, paymentReceived: false, merchant_id: 9, transactionList: [] },
    { id: 3, createdAt: '2022-11-05 14:23', state: 'pending', total: 3600, paymentReceived: false, merchant_id: 9, transactionList: [] },
];
let rows = myShoppingOrders.map(s => createData(s.id, s.createdAt, s.state, s.total, s.paymentReceived, s.merchant_id, s.transactionList));

//const rows = [
/* createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5), */
//myShoppingOrders.forEach(shoppingOrder => createData(shoppingOrder))
//createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//];

export default function UserPurchasesTable(props) {
    //const [myShoppingOrders, setMyShoppingOrders] = useState(props.list);
    const { clicked, setClicked } = props;


    try {
        if (props.list && props.list.length > 0) myShoppingOrders = props.list;
    
        if (!myShoppingOrders) {
            myShoppingOrders = [
                { id: 1, createdAt: '2022-09-30 08:23', state: 'pending', total: 1000, paymentReceived: true, merchant_id: 9, transactionList: [] },
                { id: 2, createdAt: '2022-10-15 10:23', state: 'pending', total: 2500, paymentReceived: false, merchant_id: 9, transactionList: [] },
                { id: 3, createdAt: '2022-11-05 14:23', state: 'pending', total: 3600, paymentReceived: false, merchant_id: 9, transactionList: [] },
            ];
        }
      
        rows = myShoppingOrders.map(s => createData(s.id, s.createdAt, s.state, s.total, s.paymentReceived, s.merchant_id, s.transactionList));

        return (

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>

                            <TableCell />

                            <TableCell align="center">Nº{/* o. de Orden */}</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Estado de la orden</TableCell>
                            <TableCell align="center">Monto</TableCell>
                            <TableCell align="center">Pago recibido</TableCell>
                            <TableCell align="center">Id. Comprador</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.id} row={row} setClicked={setClicked} clicked={clicked} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        );
    } catch (e) {
        console.log(e);
    }
}
