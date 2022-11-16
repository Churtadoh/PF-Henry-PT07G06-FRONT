import axios from "axios";
import toast from "react-hot-toast";
import {
  getAllProductsApi,
  API_URL_BACKEND,
  getCategoriesNameApi,
  getCategoriesIdApi,
  getAllPublicatesProductsApi,
  cartApi,
  deleteCartApi,
  putCartApi,
  favApi,
  deleteFavApi,
  putFavApi,
} from "../../api/apiRoute";
import { setSpinnerLoading } from "./app.actions";

export const PRODUCTS_TO_DISPLAY = "PRODUCTS_TO_DISPLAY";
export const ALL_PRODUCTS = "ALL_PRODUCTS";
export const PRODUCT_DETAILS = "PRODUCT_DETAILS";
export const REMOVE_CART = "REMOVE_CART";
export const ADD_CART = "ADD_CART";
export const GET_CATEGORIES_NAMES = "GET_CATEGORIES_NAMES";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const UPDATE_CART = "UPDATE_CART";
export const REMOVE_ID = "REMOVE_ID";
export const ADD_FAVORITES = "ADD_FAVORITES";
export const REMOVE_FAVORTITES = "REMOVE_FAVORTITES";
export const UPDATE_FAVORTITES = "UPDATE_FAVORTITES";
export const SEND_SHOPPING_ORDER = "SEND_SHOPPING_ORDER";
export const UPDATE_CART_API = "UPDATE_CART_API";
export const REMOVE_CART_API = "REMOVE_CART_API";
export const ADD_CART_API = "ADD_CART_API";
export const UPDATE_FAV_API = "UPDATE_FAV_API";
export const REMOVE_FAV_API = "REMOVE_FAV_API";
export const ADD_FAV_API = "ADD_FAV_API";

export const updateDisplayedByQuery = (query) => async (dispatch) => {
  dispatch(setSpinnerLoading(true));
  const url = `${API_URL_BACKEND}products/?name=${query}`;
  try {
    let res = await axios(url);
    dispatch(setSpinnerLoading(false));
    return dispatch({
      type: PRODUCTS_TO_DISPLAY,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setSpinnerLoading(false));
    console.log("error api", error);
  }
};

export const updateDisplayed = () => async (dispatch) => {
  dispatch(setSpinnerLoading(true));
  const url = `${API_URL_BACKEND}${getAllPublicatesProductsApi}`;
  try {
    await axios(url);
    let { data } = await axios(url);
    dispatch(setSpinnerLoading(false));

    return dispatch({
      type: PRODUCTS_TO_DISPLAY,
      payload: data,
    });
  } catch (error) {
    dispatch(setSpinnerLoading(false));
    console.log("error api", error);
  }
};

export const getAllProducts = () => async (dispatch) => {
  dispatch(setSpinnerLoading(true));
  const url = `${API_URL_BACKEND}${getAllProductsApi}`;
  try {
    let data = await axios(url);
    dispatch(setSpinnerLoading(false));
    return dispatch({
      type: ALL_PRODUCTS,
      payload: data.data, //data,
    });
  } catch (error) {
    dispatch(setSpinnerLoading(false));
    console.log("error api", error);
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  dispatch(setSpinnerLoading(true));
  const url = `${API_URL_BACKEND}${getAllProductsApi}${id}`;
  try {
    let { data } = await axios(url);
    dispatch(setSpinnerLoading(false));
    return dispatch({
      type: PRODUCT_DETAILS,
      payload: data,
    });
  } catch (error) {
    dispatch(setSpinnerLoading(false));
    console.log("error api", error);
  }
};

export const addToCart = (payload) => (dispatch) => {
  return dispatch({
    type: ADD_CART,
    payload: payload,
  });
};

export const updateCartApi = () => async (dispatch) => {
  dispatch(setSpinnerLoading(true));
  try {
    const { data } = await axios(`${API_URL_BACKEND}${cartApi}`);
    dispatch(setSpinnerLoading(false));
    return dispatch({
      type: UPDATE_CART_API,
      payload: data.products,
    });
  } catch (error) {
    dispatch(setSpinnerLoading(false));
    toast.error(error);
  }
};

export const updateFavApi = () => async (dispatch) => {
  dispatch(setSpinnerLoading(true));
  try {
    const { data } = await axios(`${API_URL_BACKEND}${favApi}`);
    dispatch(setSpinnerLoading(false));
    return dispatch({
      type: UPDATE_FAV_API,
      payload: data.products,
    });
  } catch (error) {
    dispatch(setSpinnerLoading(false));
    toast.error(error);
  }
};

export const addToCartApi = (payload) => async (dispatch) => {
  const url = `${API_URL_BACKEND}${putCartApi}${payload}`;
  try {
    let { data } = await axios.put(url);
    toast.success(data);
    dispatch(updateCartApi());
  } catch (error) {
    toast.error(error.response.data);
    console.log("error api", error.response.data);
  }
};
export const addToFavApi = (payload) => async (dispatch) => {
  const url = `${API_URL_BACKEND}${putFavApi}${payload}`;
  try {
    let { data } = await axios.put(url);
    toast.success(data);
    dispatch(updateFavApi());
  } catch (error) {
    toast.error(error.response.data);
    console.log("error api", error.response.data);
  }
};

export const removeToCartApi = (payload) => async (dispatch) => {
  const url = `${API_URL_BACKEND}${deleteCartApi}${payload}`;
  try {
    let { data } = await axios.delete(url);
    toast.success(data);
    dispatch(updateCartApi());
  } catch (error) {
    toast.error(error);
    console.log("error api", error);
  }
};

export const removeToFavApi = (payload) => async (dispatch) => {
  const url = `${API_URL_BACKEND}${deleteFavApi}${payload}`;
  try {
    let { data } = await axios.delete(url);
    toast.success(data);
    dispatch(updateFavApi());
  } catch (error) {
    toast.error(error);
    console.log("error api", error);
  }
};

export const addToFavorites = (payload) => (dispatch) => {
  return dispatch({
    type: ADD_FAVORITES,
    payload: payload,
  });
};

export const removeToFavorites = (payload) => (dispatch) => {
  return dispatch({
    type: REMOVE_FAVORTITES,
    payload: payload,
  });
};

export const removeToCart = (payload) => (dispatch) => {
  return dispatch({
    type: REMOVE_CART,
    payload: payload,
  });
};

export const updateFavorites = (payload) => (dispatch) => {
  return dispatch({
    type: UPDATE_FAVORTITES,
    payload: payload,
  });
};

export const updateCart = (payload) => (dispatch) => {
  return dispatch({
    type: UPDATE_CART,
    payload: payload,
  });
};

export const getCategoriesNames = () => async (dispatch) => {
  const url = `${API_URL_BACKEND}${getCategoriesNameApi}`;
  try {
    let { data } = await axios(url);

    return dispatch({
      type: GET_CATEGORIES_NAMES,
      payload: data,
    });
  } catch (error) {
    console.log("error api", error);
  }
};

export const getCategories = () => async (dispatch) => {
  const url = `${API_URL_BACKEND}${getCategoriesIdApi}`;
  try {
    let { data } = await axios(url);
    return dispatch({
      type: GET_CATEGORIES,
      payload: data,
    });
  } catch (error) {
    console.log("error api", error);
  }
};

export const publishProd = (data) => async () => {
  const url = `${API_URL_BACKEND}${getAllProductsApi}`;
  try {
    let json = await axios.post(url, data);
    return json;
  } catch (error) {
    console.log("error api", error);
  }
};

export const sendShopOrder = (data) => async () => {
  const url = `${API_URL_BACKEND}shoppingOrders/mpresponse`;
  try {
    let json = await axios.put(url, data);
    return json;
  } catch (error) {
    console.log("error api", error);
  }
};

export const removeDetail = () => (dispatch) => {
  return dispatch({
    type: REMOVE_ID,
  });
};
