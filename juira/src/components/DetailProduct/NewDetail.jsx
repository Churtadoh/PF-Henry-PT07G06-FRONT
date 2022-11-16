import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../Loading/Spinner";
import NotFound from "../NotFound/NotFound";
import Q_A from "./Q_A";
import {
  getProductDetails,
  addToCart,
  addToCartApi,
  removeToCartApi,
  removeToCart,
  removeDetail,
  removeToFavApi,
  removeToFavorites,
  addToFavApi,
  addToFavorites,
} from "../../redux/actions/products.actions";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  ButtonBase,
  Chip,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { API_URL_BACKEND } from "../../api/apiRoute";
import axios from "axios";
import ErrorIcon from "@mui/icons-material/Error";
import ImageView from "./ImageView";
import Avatar from "@mui/material/Avatar";
import DetailRating from "./DetailRating";

//console.log(API_URL_BACKEND)

const Img = styled("img")({
  margin: "auto",
  display: "block",
  height: "auto",
  width: "30rem",
  border: 0,
});

export default function NewDetail() {
  const { id } = useParams();
  const role = useSelector((state) => state.app.token.role);

  const [isLoading, setIsLoading] = useState(true);
  const [sellerInfo, setSellerInfo] = useState();

  let product = useSelector((state) => state.productsReducer.productDetails);
  let cartState = useSelector((state) => state.productsReducer.cart);

  const dispatch = useDispatch();

  const getSeller = async (ownerId) => {
    const resp = await axios.get(`${API_URL_BACKEND}users/${ownerId}`);
    return resp.data;
  };

  async function asyncGetProduct() {
    const fetchedProduct = await dispatch(getProductDetails(id));

    const fetchedSeller = await getSeller(fetchedProduct.payload.ownerId);
    await setSellerInfo(fetchedSeller);
  }
  async function asyncLoader() {
    try {
      await asyncGetProduct();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    asyncLoader();

    return () => {
      dispatch(removeDetail());
    };

    // eslint-disable-next-line
  }, [id]);

  //const itemsAddedToCart = useSelector((state) => state.productsReducer.cart);
  const itemsAddedToFavorites = useSelector(
    (state) => state.productsReducer.favorites
  );

  function handleAddToCart(product) {
    role === "usuario"
      ? dispatch(addToCartApi(product.id))
      : dispatch(addToCart(product));
  }

  function handleRemoveToCart(product) {
    role === "usuario"
      ? dispatch(removeToCartApi(product.id))
      : dispatch(removeToCart(product.id));
  }

  const productIsAddedToFavorites = (id) => {
    return itemsAddedToFavorites?.find((item) => item.id === id) ? true : false;
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

  const [modal, setModal] = React.useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const handleOpenImage = () => {
    openModal();
  };

  let sellerInitials = "";
  if (sellerInfo && sellerInfo.name) {
    let initials = sellerInfo.name.replace(/[^A-Z]/g, "");
    initials.length > 0
      ? (sellerInitials = initials)
      : (sellerInitials = sellerInfo.name[0]);
  }

  return (
    <div style={{ minHeight: 450, display: "flex", justifyContent: "center" }}>
      {isLoading ? (
        <Spinner />
      ) : product === "" ? (
        <NotFound />
      ) : (
        <Container
          sx={{ boxShadow: "0 0 15px 5px #cccccc55", padding: 5, width: "800" }}
        >
          {modal && (
            <ImageView
              openModal={openModal}
              closeModal={closeModal}
              image={product.image}
            />
          )}
          {/* <Typography sx={{ marginTop: '0', fontSize: '1.5rem', width: 1, borderBottom: "solid var(--primaryColor)" }} color="var(--primaryColor)" gutterBottom>
                            DETALLE DEL PRODUCTO
                        </Typography> */}
          {product?.status === "En pausa" ? (
            <Chip icon={<ErrorIcon />} color="warning" label="PRODUCTO PAUSADO">
              {" "}
              Producto Pausado
            </Chip>
          ) : null}
          {product?.status === "No Disponible" ? (
            <Chip
              icon={<ErrorIcon />}
              color="error"
              label="PRODUCTO NO DISPONIBLE"
            >
              {" "}
              Producto No Disponible
            </Chip>
          ) : null}
          <Grid
            container
            direction="row"
            spacing={2}
            sx={{
              position: "relative",
            }}
          >
            <Grid
              item
              sx={{
                minWidth: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                /* backgroundColor: 'blue', */
              }}
            >
              <ButtonBase
                xs={12}
                sx={{ /* boxShadow: 2, */ mr: 1 }}
                onClick={() => {
                  handleOpenImage();
                }}
              >
                {<Img alt="complex" src={product.image} />}
                {/* <Box
                                        component="img"
                                        sx={{
                                            height: 'auto',
                                            width: 'auto',
                                            maxHeight: { xs: 167, md: 233 },
                                            maxWidth: { xs: 250, md: 350 },
                                        }}
                                        alt="Product img"
                                        src={product.image}
                                    /> */}
              </ButtonBase>
            </Grid>

            <Grid
              item
              xs
              sx={{
                minWidth: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                /* backgroundColor: 'red' */
              }}
            >
              <Typography component="div" sx={{ color: "lightGray" }}>
                {" "}
                {product.condition}
              </Typography>

              <Typography
                gutterBottom
                component="div"
                sx={{ fontWeight: "bold", mb: 3, pt: 1 /* , padding: 2 */ }}
                variant="h5"
              >
                {" "}
                {product.name}
              </Typography>

              <Typography
                gutterBottom
                component="div"
                sx={{ fontWeight: "light", mb: 4, pt: 1 /* , padding: 2 */ }}
                variant="h4"
              >
                {" "}
                {"$ " + Number(product.price).toLocaleString("DE-de")}
              </Typography>

              <Typography
                gutterBottom
                component="div"
                sx={{ fontWeight: "light", mb: 4, pt: 1 /* , padding: 2 */ }}
              >
                {" "}
                {product.description}
              </Typography>

              <div>
                {" "}
                {/* AddToCart button */}
                {cartState.find((item) => item.id === parseInt(id)) ? (
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    size="large"
                    onClick={() => {
                      handleRemoveToCart(product);
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
                      handleAddToCart(product);
                    }}
                    disabled={
                      product?.status === "En pausa" ||
                      product?.status === "No Disponible"
                    }
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
                {/* {product?.status === "En pausa" ? <Chip icon={<ErrorIcon />} color="warning" label="PRODUCTO PAUSADO" > Producto Pausado</Chip> : null} */}
              </div>

              {sellerInfo ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    mt: 4,
                    //m: 1,
                    borderRadius: 3,
                    // boxShadow: 3,
                    border: "1px solid #ddd",
                  }}
                >
                  <Typography
                    component="div"
                    sx={{ color: "lightGray" }}
                    fontSize=".9rem"
                  >
                    {" "}
                    Informacion del Vendedor
                  </Typography>
                  {/* JSON.stringify(sellerInfo) */}

                  <Typography fontWeight="bold">
                    {sellerInfo.name?.toUpperCase()}
                  </Typography>
                  {sellerInfo.rating ? (
                    <DetailRating rating={sellerInfo.rating} />
                  ) : (
                    <DetailRating rating={0} />
                  )}

                  {sellerInfo.image ? (
                    <Avatar
                      alt={sellerInfo.name}
                      src={sellerInfo.image}
                    ></Avatar>
                  ) : (
                    <Avatar>{sellerInitials}</Avatar>
                  )}
                </Box>
              ) : null}

              {/* Favorites btn */}
              <Button
                sx={{
                  //color: "var(--heartColor)",
                  color: "var(--primaryColor)",
                  position: "absolute",
                  top: ".125rem",
                  right: ".125rem",
                }}
                onClick={() => handleFavorites(product)}
              >
                {productIsAddedToFavorites(product.id) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </Button>
            </Grid>
          </Grid>{" "}
          {/* First row end */}
          <Grid
            item
            sx={{
              /* minWidth: "40%", */
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              /* backgroundColor: 'hotPink', */
            }}
          >
            <Q_A id={id}></Q_A>
          </Grid>
        </Container>
      )}
    </div>
  );
}
