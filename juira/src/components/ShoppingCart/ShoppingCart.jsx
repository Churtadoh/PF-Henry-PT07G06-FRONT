import Table from "@mui/material/Table";
import toast from "react-hot-toast";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { pink } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import {
  removeToCart,
  removeToCartApi,
  updateCartApi,
} from "../../redux/actions/products.actions";
import { useHistory } from "react-router-dom";
import { API_URL_BACKEND } from "../../api/apiRoute";
import axios from "axios";
import { useState } from "react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Loading from "../Loading/Loading";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.app.token.role);
  const items = useSelector((state) => state.productsReducer.cart);
  const loading = useSelector((state)=> state.app.isSpinner)

  const [redirect, setRedirect] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (redirect !== "") window.open(redirect, "_blank", "popup=true");
  }, [redirect]);

  let amount = 0;
  items && items.forEach((p) => (amount += Number(p.price)));
  

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL_BACKEND}shoppingOrders/byToken`
      );
      
      const response = await axios.get(
        `${API_URL_BACKEND}payment?id=${data.id}`
      );
      setRedirect(response.data.init_point);
      dispatch(updateCartApi())
    } catch (error) {
      toast.error(error.response.data)
      console.log("error", error);
    }
  };

  function viewDetail(p) {
    history.push(`/juira/${p}`);
  }

  function handleRemoveinCart(p) {
    dispatch(removeToCart(p));
  }

  return (
    <Container sx={{ boxShadow: "0 0 15px 5px #cccccc55", padding: 5 }}>
      {/* <Typography variant="h4"> Carrito de compras </Typography> */}
      <Typography
        sx={{
          marginTop: "0",
          fontSize: "1.5rem",
          width: 1,
          borderBottom: "solid var(--primaryColor)" /* 'solid green' */,
        }}
        color="var(--primaryColor)"
        gutterBottom
      >
        CARRITO DE COMPRAS
      </Typography>

      {loading !==0 && !items.length ? <Loading></Loading> : !items.length ? (
        <Container
          sx={{
            minHeight: 350,
            margin: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5"> Tu carrito está vacío.</Typography>
          <SentimentDissatisfiedIcon
            color="action"
            sx={{ fontSize: "200px" }}
          />
        </Container>
      ) : (
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> </TableCell>
                  <TableCell> # </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center">Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items &&
                  items.map((row, i) => (
                    <TableRow
                      key={i + 1}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                      size="small"
                    >
                      <TableCell
                        onClick={async () =>
                          role
                            ? dispatch(removeToCartApi(row.id))
                            : handleRemoveinCart(row.id)
                        }
                      >
                        <IconButton>
                          <HighlightOffIcon sx={{ color: pink[500] }} />
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => {
                          viewDetail(row.id);
                        }}
                      >
                        <img
                          src={`${row.image}`}
                          style={{ maxHeight: "50px" }}
                        ></img>
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => {
                          viewDetail(row.id);
                        }}
                      >
                        <strong>{row.name}</strong>
                        <br></br>
                        <small>{row.description}</small>
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>{amount}</strong>
                  </TableCell>
                </TableRow>
                <TableRow></TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Container
            sx={{
              margin: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {role === "usuario" ? (
              <Button
                variant="contained"
                endIcon={<PaidIcon />}
                onClick={handlePayment}
                color="secondary"
              >
                Pagar
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<PaidIcon />}
                onClick={() => {
                  history.push("/juira/login");
                }}
                color="secondary"
              >
                Pagar
              </Button>
            )}
          </Container>
        </Container>
      )}
      <Container
        sx={{
          margin: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={<HomeRoundedIcon />}
          sx={
            {
              /* backgroundColor: '#23c197', '&:hover': {backgroundColor: '#138f6e'} */
            }
          }
          onClick={() => {
            history.push("/juira");
          }}
        >
          Inicio
        </Button>
      </Container>
    </Container>
  );
}
