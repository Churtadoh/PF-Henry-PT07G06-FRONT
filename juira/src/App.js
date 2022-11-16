//import logo from './logo.svg';
import "./App.css";
import axios from "axios";

import { BrowserRouter, Switch, Route, useLocation, useHistory } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/DetailProduct/Detail";
import SellForm from "./components/SellorEditProduct/SellForm";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/Navbar";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import Dashboard from "./components/DashboardUser/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import ScrollToTop from "./components/ScrollToTop";
import Favorites from "./components/Favorites/Favorites";
import OrdenDeCompra from "./components/OrdenDeCompra/OrdenDeCompra";
import { logoOutAction, refreshData, setSpinnerLoading } from "./redux/actions/app.actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GuestNavigator from "./Navigator/GuestNavigator";
import UserNavigator from "./Navigator/UserNavigator";
import AdminNavigator from "./Navigator/AdminNavigator";
import toast, { Toaster } from "react-hot-toast";

import { createTheme, ThemeProvider } from "@mui/material/styles"; //'@material-ui/core';
import { updateCartApi, updateFavApi } from "./redux/actions/products.actions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#23c197",
    },
  },
});

function App() {
  const { pathname } = useLocation();
  const reloadSesion = useDispatch(refreshData);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.app.token.role);
  const history = useHistory()

  useEffect(() => {
    reloadSesion(refreshData());
    if (role === "usuario") {
      dispatch(updateFavApi());
      dispatch(updateCartApi());
    }
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config;
    }, function (error) {
      // Do something with request error
      console.log("error de request",error)
      return Promise.reject(error);
    });
  
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log("error interceptor",error)
      if(error.response.data?.includes("Firebase ID token has expired")){
        dispatch(logoOutAction())
        history.go(0)
        history.push(`/juira/login`)
        toast.error("Su sesion vencio")
      }
    
      return Promise.reject(error);
    });
  }, [reloadSesion, role]);

  

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />
          {!role && <GuestNavigator />}
          {role === "usuario" && <UserNavigator />}
          {role === "admin" && <AdminNavigator />}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
/*
     _                
    / \   _ __  _ __  
   / _ \ | '_ \| '_ \ 
  / ___ \| |_) | |_) |
 /_/   \_\ .__/| .__/ 
         |_|   |_|    
*/
