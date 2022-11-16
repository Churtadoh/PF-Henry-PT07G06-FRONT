import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoOutAction } from "../../redux/actions/app.actions";
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



const parseDate = (str) => {
    
    return str.slice(0, 10).split('-').reverse().join('/');
}


const handleProductSent = async (e, setClicked, clicked) => {

    const response = await axios.put(`${API_URL_BACKEND}transactions/${e.target.value}`, { state: "sent" });
    setClicked(!clicked);
}

function Row(props) {
    const { row, clicked, setClicked } = props;
    const [open, setOpen] = React.useState(false);
   
    return (
        <React.Fragment>
            <TableRow /* className={classes.root} */>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row" align="center">
                    {row.id}
                </TableCell>
                <TableCell align="right">{parseDate(row.createdAt)}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="right">{row.total.toLocaleString('de-DE')}</TableCell>
                <TableCell align="center">{row.paymentReceived ? 'Si' : 'No'}</TableCell>
                <TableCell align="center">{row.merchant_id}</TableCell>
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
                                                <Button value={transactionRow.id} variant="contained"
                                                    onClick={(e) => handleProductSent(e, setClicked, clicked)}>Ya envié el producto</Button>
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


function createData(id, state, sellerId, total, createdAt, productId, shoppingOrderId, buyerId, paymentReceived) {
    return {
        id,
        state,
        sellerId,
        total,
        createdAt,
        productId,
        shoppingOrderId,
        buyerId,
        paymentReceived,
    };
}

/* let mySales = [];
mySales = [
    { id: 1, createdAt: '2022-09-30 08:23', state: 'pending', total: 1000, paymentReceived: true, merchant_id: 9, transactionList: [] },
    { id: 2, createdAt: '2022-10-15 10:23', state: 'pending', total: 2500, paymentReceived: false, merchant_id: 9, transactionList: [] },
    { id: 3, createdAt: '2022-11-05 14:23', state: 'pending', total: 3600, paymentReceived: false, merchant_id: 9, transactionList: [] },
];
rows = mySales.map(s => createData(s.id, s.createdAt, s.state, s.total, s.paymentReceived, s.merchant_id, s.transactionList));
*/
let rows = [];


export default function UserSalesTable(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    try {

        let mySales = props.list.transactions.asSeller;
        //let mySales = props.list.transactions.asBuyer;   // borrrarrrrr !! usar asSeller

        const { clicked, setClicked } = props;
        //console.log('mySales: ', mySales)
        /* if (!mySales) {
            mySales = [
                { id: 1, createdAt: '2022-09-30 08:23', state: 'pending', total: 1000, paymentReceived: true, merchant_id: 9, transactionList: [] },
                { id: 2, createdAt: '2022-10-15 10:23', state: 'pending', total: 2500, paymentReceived: false, merchant_id: 9, transactionList: [] },
                { id: 3, createdAt: '2022-11-05 14:23', state: 'pending', total: 3600, paymentReceived: false, merchant_id: 9, transactionList: [] },
            ];
        } */
        //rows = mySales.map(s => createData(s.id, s.createdAt, s.state, s.total, s.paymentReceived, s.merchant_id, s.transactionList));
        rows = mySales.map(s => createData(s.id, s.state, s.sellerId, s.total, s.createdAt, s.productId, s.shoppingOrderId, s.buyerId, s.shoppingOrder.paymentReceived));

        //console.log('💥 rows: ', rows)
        return (

            /* !rows || rows.length <= 0 ? "No hay transacciones para mostrar" : */

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>

                            <TableCell></TableCell>
                            <TableCell>Nº{/* o. de Transaccion */}</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align="center">Id. Vendedor</TableCell>
                            <TableCell align="right">Monto</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="right">Producto</TableCell>
                            <TableCell align="center">Orden de compra</TableCell>
                            <TableCell align="center">Comprador</TableCell>
                            <TableCell align="center">Pago recibido</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            rows.map((transactionRow) => (
                                <TableRow key={transactionRow.id}>

                                    <TableCell>
                                        {transactionRow && transactionRow.state && transactionRow.state === 'pending'
                                            && transactionRow.paymentReceived
                                            ? <Button value={transactionRow.id} variant="contained" sx={{ color: "white", fontSize: ".8rem" }}
                                                onClick={(e) => handleProductSent(e, setClicked, clicked)}>Producto Enviado</Button>
                                            : null

                                        }
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
                                    <TableCell align="center">{transactionRow.paymentReceived ? 'Si' : 'No'}</TableCell>

                                </TableRow>
                            ))}

                    </TableBody>
                </Table>
            </TableContainer >

        );
    } catch (e) {
     
        if (e.message.contains('Firebase ID token has expired')) {
       

            dispatch(logoOutAction());

            history.push(`/juira/login`);
        }
    }
}
