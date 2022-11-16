import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import Dashboard from "../components/DashboardUser/Dashboard";
import Detail from "../components/DetailProduct/NewDetail";
import Favorites from "../components/Favorites/Favorites";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import Login from "../components/Login/Login";
import OrdenDeCompra from "../components/OrdenDeCompra/OrdenDeCompra";
import SellForm from "../components/SellorEditProduct/SellForm";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import Register from "../components/Login/Register"
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useSelector } from "react-redux";
import NotFound from '../components/NotFound/NotFound';

function GuestNavigator() {

    const { pathname } = useLocation();
    const role = useSelector((state) => state.app.token.role);
    
  return (
    <div>
      <BrowserRouter>
        {pathname !== "/" && <NavBar/>}
        <ScrollToTop />
        <Switch>
          <Route exact path={"/"} component={Landing} />
          <Route exact path={"/juira"} component={Home} />
          <Route exact path={"/juira/shoppingCart"} component={ShoppingCart} />
          <Route exact path={"/juira/favorites"} component={Favorites} />
          <Route exact path={"/juira/login"} component={Login} />
          <Route exact path={"/juira/register"} component={Register} />
          <Route path={"/juira/:id"} component={Detail} />
          <Route path={"/"} component={NotFound} />
        </Switch>
        {pathname !== "/" && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default GuestNavigator;
