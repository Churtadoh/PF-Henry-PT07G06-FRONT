import * as React from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Loading from "../Loading/Loading";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";

import { useSelector } from "react-redux";
import {
  getProductDetails,
  addToCart,
  removeDetail,
  addToCartApi,
  removeToCartApi,
  removeToCart,
} from "../../redux/actions/products.actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Q_A from "./Q_A";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  height: 500,
});

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const role = useSelector((state) => state.app.token.role);

  React.useEffect(() => {
    dispatch(getProductDetails(id));
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, id]);

  let p = useSelector((state) => state.productsReducer.productDetails);
  let cartState = useSelector((state) => state.productsReducer.cart);

  function handleAddToCart(p) {
    role === "usuario" ? dispatch(addToCartApi(p.id)) : dispatch(addToCart(p));
  }

  function handleRemoveToCart(p) {
    role === "usuario"
      ? dispatch(removeToCartApi(p.id))
      : dispatch(removeToCart(p.id))
  }

  return !p || Object.keys(p).length === 0 ? (
    <NotFound />
  ) : (
    <Container
      sx={{
        backgroundImage: `url(https://res.cloudinary.com/duq1tcwjw/image/upload/v1666132260/PF-JUIRA/patthern_oplhdn.jpg)`,
        backgroundSize: "cover",
        mt: 2,
        width: 1,
        height: 1,
        p: 5,
      }}
    >
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          height: "auto",
        }}
      >
        <Grid container direction="row" spacing={2}>
          <Grid
            item
            sx={{
              minWidth: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ButtonBase xs={12} sx={{ boxShadow: 2, mr: 1 }}>
              <Img alt="complex" src={p.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={8}
              sx={{ mr: 2 }}
            >
              <Grid item xs>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "bold", mb: 6, padding: 2 }}
                  variant="h3"
                >
                  {p.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 50,
                    mt: 2,
                    color: "green",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <AttachMoneyRoundedIcon sx={{ fontSize: 60 }} />
                  {p.price}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontSize: 20,
                    display: "flex",
                    alignItems: "flex-start",
                    padding: 1,
                  }}
                >
                  <DescriptionRoundedIcon />
                  {`Descripción: ${p.description}`}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontSize: 20,
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <MilitaryTechRoundedIcon />
                  {`Condición: ${p.condition}`}
                </Typography>
              </Grid>
              <Grid item>
                {cartState.find((item) => item.id === parseInt(id)) ? (
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    size="large"
                    onClick={() => {
                      handleRemoveToCart(p);
                    }}
                    sx={{
                      backgroundColor: "#23c197",
                      "&:hover": { backgroundColor: "#138f6e" },
                    }}
                  >
                    <Typography sx={{ cursor: "pointer" }} variant="body2">
                      Remover
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    size="large"
                    onClick={() => {
                      handleAddToCart(p);
                    }}
                    sx={{
                      backgroundColor: "#23c197",
                      "&:hover": { backgroundColor: "#138f6e" },
                    }}
                  >
                    <Typography sx={{ cursor: "pointer" }} variant="body2">
                      Agregar al Carrito
                    </Typography>
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Q_A id={id}></Q_A>
      </Paper>
    </Container>
  );
}
