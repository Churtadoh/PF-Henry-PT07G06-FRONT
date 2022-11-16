import toast from "react-hot-toast";
import axios from "axios";

import { API_URL_BACKEND, postUser, getUserData } from "../../api/apiRoute";
import { getAuth, signOut } from "firebase/auth";
import { updateCartApi, updateFavApi } from "./products.actions";

export const TURN_ON_SPINNER = "TURN_ON_SPINNER";
export const TURN_OFF_SPINNER = "TURN_OFF_SPINNER";
export const UPDATE_FILTER_STATE = "UPDATE_FILTER_STATE";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const REFRESH_DATA = "REFRESH_DATA";
export const USER_PROFILE = "USER_PROFILE";

/* const auth = getAuth(); */
const signInSuccess = (token) => {
  return { type: SIGN_IN, payload: token };
};

const logoOutSuccess = () => {
  return { type: SIGN_OUT };
};

export const setSpinnerLoading = (flag) => {
  if (flag) {
    return { type: TURN_ON_SPINNER, payload: true };
  } else {
    return { type: TURN_OFF_SPINNER, payload: false };
  }
};

export const updateFilter = (payload) => (dispatch) => {
  return dispatch({
    type: UPDATE_FILTER_STATE,
    payload: payload,
  });
};

export const loginAction = (usuario) => {
  return async (dispatch) => {
    axios.defaults.headers.common["Authorization"] = usuario.token;
    const { role, user } = await postLogin(usuario);

    if (role) {
      localStorage.setItem("token", usuario.token);
      localStorage.setItem("role", role);
      dispatch(signInSuccess({ token: usuario.token, role: role }));
      toast.success("Bienvenido a la plataforma " + user.emailAddress);
      if (role === "usuario") {
        try {
          const cart = JSON.parse(localStorage.getItem("itemsInCart"));
          const fav = JSON.parse(localStorage.getItem("itemsInFavorites"));
          localStorage.removeItem("itemsInFavorites");
          localStorage.removeItem("itemsInCart");

          let serverPut = cart.map((element) =>
            axios.put(
              `${API_URL_BACKEND}cart/addProductToCart/byToken/${element.id}`
            )
          );
          await Promise.all(serverPut).then((response) => {
            return response;
          });
          serverPut = fav.map((element) =>
            axios.put(
              `${API_URL_BACKEND}favorites/addProductToFavList/byToken/${element.id}`
            )
          );
          await Promise.all(serverPut).then((response) => {
            return response;
          });
          dispatch(updateCartApi())
          dispatch(updateFavApi())
        } catch (error) {
          console.log("error en inicio de sesion", error);
        }
      }
    }
  };
};

export const logoOutAction = () => {
  return async (dispatch) => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
/*     await signOut(auth)
      .then((result) => console.log("has salido"))
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`)); */
    dispatch(logoOutSuccess());
    toast.success("Sesion Cerrada Exitosamente");
  };
};

export function refreshData() {
  return {
    type: REFRESH_DATA,
  };
}

export const postLogin = async (data) => {
  const url = `${API_URL_BACKEND}${postUser}`;

  try {
    let json = await axios.post(url, data);
    return json.data;
  } catch (error) {
    console.log("error api", error);
  }
};

export const getUser = () => async (dispatch) => {
  const url = `${API_URL_BACKEND}${getUserData}`;
  try {
    let { data } = await axios(url);
    return dispatch({
      type: USER_PROFILE,
      payload: data,
    });
  } catch (error) {
    console.log("error api", error);
  }
};

export const editUser = (id, data) => async (dispatch) => {
  const url = `${API_URL_BACKEND}users/${id}`;
  try {
    await axios.put(url, data);
    return dispatch({
      type: USER_PROFILE,
      payload: data,
    });
  } catch (error) {
    console.log("error api", error);
  }
};
