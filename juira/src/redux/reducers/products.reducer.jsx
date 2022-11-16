import {
  ADD_CART,
  ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_CATEGORIES_NAMES,
  PRODUCTS_TO_DISPLAY,
  PRODUCT_DETAILS,
  REMOVE_CART,
  UPDATE_CART,
  REMOVE_ID,
  UPDATE_FAVORTITES,
  REMOVE_FAVORTITES,
  ADD_FAVORITES,
  ADD_CART_API,
  UPDATE_CART_API,
  UPDATE_FAV_API,
} from "../actions/products.actions";
import axios from "axios";

const initialState = {
  allProducts: "",
  productDetails: "",
  productsToDisplay: "",
  cart: [],
  allCategories: [],
  categories: [],
  favorites: [],
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS: {
      return {
        ...state,
        allProducts: action.payload,
        /*  productsToDisplay: action.payload, */
      };
    }
    case PRODUCT_DETAILS: {
      return {
        ...state,
        productDetails: action.payload,
      };
    }
    case PRODUCTS_TO_DISPLAY: {
      return {
        ...state,
        productsToDisplay: action.payload,
      };
    }
    case REMOVE_CART:
      const aux2 = state.cart.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("itemsInCart", JSON.stringify(aux2));
      return {
        ...state,
        cart: aux2,
      };
    case REMOVE_FAVORTITES:
      const aux3 = state.favorites.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("itemsInFavorites", JSON.stringify(aux3));
      return {
        ...state,
        favorites: aux3,
      };

    case UPDATE_CART:
      localStorage.setItem("itemsInCart", JSON.stringify(action.payload));
      return {
        ...state,
        cart: action.payload,
      };
    case UPDATE_FAVORTITES:
      localStorage.setItem("itemsInFavorites", JSON.stringify(action.payload));
      return {
        ...state,
        favorites: action.payload,
      };
    case ADD_CART:
      const aux = state.cart?.find((product) => product.id === action.payload.id)
        ? state.cart
        : state.cart.concat(action.payload);
      localStorage.setItem("itemsInCart", JSON.stringify(aux));
      return {
        ...state,
        cart: aux,
      };

    case UPDATE_CART_API:
      return {
        ...state,
        cart: action.payload,
      };

    case UPDATE_FAV_API:
      return {
        ...state,
        favorites: action.payload,
      };

    case ADD_FAVORITES:
      const aux4 = state.favorites?.find(
        (product) => product.id === action.payload.id
      )
        ? state.favorites
        : state.favorites.concat(action.payload);

      localStorage.setItem("itemsInFavorites", JSON.stringify(aux4));
      return {
        ...state,
        favorites: aux4,
      };

    case GET_CATEGORIES_NAMES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case REMOVE_ID:
      return {
        ...state,
        productDetails: "",
      };

    default:
      return state;
  }
}
