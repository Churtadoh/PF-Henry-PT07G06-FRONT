import { Container, maxWidth, Box } from "@mui/system";
import React from "react";
import {
  addToCart,
  addToCartApi,
  removeToCart,
  removeToCartApi,
  removeToFavorites,
  removeToFavApi,
} from "../../redux/actions/products.actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { pink } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function FavoriteDetail(props) {
  // id={p.id} price={p.price} name={p.name} image={p.image}
  const itemsAddedToCart = useSelector((state) => state.productsReducer.cart);
  const role = useSelector((state) => state.app.token.role);
  const loading = useSelector((state)=> state.app.isSpinner);

  const handleCart = (p) => {
    productIsAddedToCart(p.id)
      ? role === "usuario"
        ? dispatch(removeToCartApi(p.id))
        : dispatch(removeToCart(p.id))
      : role === "usuario"
      ? dispatch(addToCartApi(p.id))
      : dispatch(addToCart(p));
  };

  const productIsAddedToCart = (id) => {
    return itemsAddedToCart?.find((item) => item.id === id) ? true : false;
  };

  const dispatch = useDispatch();
  let history = useHistory();

  function viewDetail(p) {
    history.push(`/juira/${p}`);
  }

  function handleRemoveFavorite(p) {
    role === "usuario"
      ? dispatch(removeToFavApi(p))
      : dispatch(removeToFavorites(p));
  }

  return (
    <Container sx={{ m: 1 }}>
      <ListItem alignItems="flex-start">
        <ListItem sx={{ width: 0.1, height: 0.4 }}>
          <Button sx={{ alignSelf: "flex-start" }}>
            <IconButton onClick={() => handleRemoveFavorite(props.id)}>
              <HighlightOffIcon sx={{ color: pink[500] }} />
            </IconButton>
          </Button>
          <img
            alt="Product"
            src={props.image}
            onClick={() => viewDetail(props.id)}
          />
        </ListItem>
        <ListItemText
          primary={props.name}
          sx={{ fontSize: 5, ml: 12, fontWeight: "bold" }}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="var(--btnActiveColor)"
            >
              ${props.price}
            </Typography>
          }
        ></ListItemText>
        <IconButton
          sx={{
            color: "var(--primaryColor)",
            position: "absolute",
            bottom: ".125rem",
            right: ".125rem",
          }}
          onClick={() => {
            handleCart(props);
          }}
        >
          {productIsAddedToCart(props.id) ? (
            <ShoppingCartIcon />
          ) : (
            <AddShoppingCartIcon />
          )}
        </IconButton>
      </ListItem>
      <Divider variant="inset"/>
    </Container>
  );
}
