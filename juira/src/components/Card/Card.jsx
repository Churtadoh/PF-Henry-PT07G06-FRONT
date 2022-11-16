import React from "react";
import styles from "./Card.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  addToFavorites,
  removeToCart,
  removeToFavorites,
  removeToCartApi,
  addToCartApi,
  removeToFavApi,
  addToFavApi,
} from "../../redux/actions/products.actions";
import { API_URL_BACKEND } from "../../api/apiRoute";

export default function Card(props) {
  const dispatch = useDispatch();
  const itemsAddedToCart = useSelector((state) => state.productsReducer.cart);
  const itemsAddedToFavorites = useSelector(
    (state) => state.productsReducer.favorites
  );
  const role = useSelector((state) => state.app.token.role);

  const productIsAddedToCart = (id) => {
    return itemsAddedToCart?.find((item) => item.id === id) ? true : false;
  };
  const productIsAddedToFavorites = (id) => {
    return itemsAddedToFavorites?.find((item) => item.id === id) ? true : false;
  };

  const handleCart = async (p) => {
    productIsAddedToCart(p.id)
      ? role === "usuario"
        ? dispatch(removeToCartApi(p.id))
        : dispatch(removeToCart(p.id))
      : role === "usuario"
      ? dispatch(addToCartApi(p.id))
      : dispatch(addToCart(p));
  };
  const handleFavorites = (p) => {
    productIsAddedToFavorites(p.id)
      ? role === "usuario"
        ? dispatch(removeToFavApi(p.id))
        : dispatch(removeToFavorites(p.id))
      : role === "usuario"
      ? dispatch(addToFavApi(p.id))
      : dispatch(addToFavorites(p));
  };

  const [fav, setFav] = useState(false);
  const toggleFav = () => {
    fav === false ? setFav(true) : setFav(false);
  };

  const isFav = () => fav;

  return (
    <section className={styles.cardContainer}>
      <IconButton
        sx={{
          color: "var(--heartColor)",
          position: "absolute",
          top: ".125rem",
          right: ".125rem",
        }}
        onClick={() => handleFavorites(props.product)}
      >
        {productIsAddedToFavorites(props.product.id) ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <div className={[styles.card, styles.stacked].join(" ")}>
        {/* <a href="/" className={styles.cardLink}> */}
        <Link
          to={`/juira/${props.id}` /* detail/${props.id} `*/}
          className={styles.cardLink}
        >
          <img src={props.image} className={styles.card__img} alt="Card" />
          <div className={styles.card__content}>
            <p className={styles.card__price}>
              {"$ " + props.price.toLocaleString("de-DE")}
            </p>
            <h2 className={styles.card__title}>{props.name}</h2>
            <p className={styles.card__description}></p>
          </div>
        </Link>

        <IconButton
          sx={{
            color: "var(--primaryColor)",
            position: "absolute",
            bottom: ".125rem",
            right: ".125rem",
          }}
          onClick={() => {
            handleCart(props.product);
          }}
        >
          {productIsAddedToCart(props.product.id) ? (
            <ShoppingCartIcon />
          ) : (
            <AddShoppingCartIcon />
          )}
        </IconButton>
      </div>
    </section>
  );
}
