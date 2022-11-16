import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/* import { updateDisplayed } from '../../redux/actions/products.actions'; */
import style from "./Navbar.module.css";
import image from "../media/juira_white.png";
import imageMobile from "../media/JuiraMobile.jpg";
import Avatar from "@mui/material/Avatar";
import { logoOutAction, updateFilter } from "../../redux/actions/app.actions";
import {
  updateCart,
  updateFavorites,
} from "../../redux/actions/products.actions";
import FolderSharedIcon from "@mui/icons-material/FolderShared";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  let user = useSelector((state) => state.app.user);
  const itemsInCart = useSelector((state) => state.productsReducer.cart); 
  const itemsFavorites = useSelector((state) => state.productsReducer.favorites);

  const role = useSelector((state) => state.app.token.role);

  React.useEffect(() => {
    const cartlocal = localStorage.getItem("itemsInCart");
    let cart = [];
    if (cartlocal) cart = JSON.parse(localStorage.getItem("itemsInCart"));
    if (cart) {
      dispatch(updateCart(cart));
    }
    const favoritesLocal = localStorage.getItem("itemsInFavorites");
    let favorites = [];
    if (favoritesLocal)
      favorites = JSON.parse(localStorage.getItem("itemsInFavorites"));
    if (favorites) {
      dispatch(updateFavorites(favorites));
    }
  }, [role]);

  const products = useSelector((state) => state.allProducts);

  const sugestions = products && products.map((p) => p.name);

  const [input, setInput] = React.useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      // if (location.pathname !== '/juira') {
      setInput("");
      history.push(`/juira?search=${input}`);
      // }
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        component={RouterLink}
        to="/juira/login"
        underline="none"
        sx={{ color: "" }}
      >
        <MenuItem
          style={{ color: "var(--primaryColor)" }}
          onClick={() => {
            handleMenuClose();
          }}
        >
          <IconButton size="large" color="inherit">
            {user.image ? (
              <Avatar alt="U" src={user.image} />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <p>Perfil</p>
        </MenuItem>
      </Link>

      <MenuItem
        style={{ color: "var(--primaryColor)" }}
        onClick={() => {
          dispatch(logoOutAction());
          handleMenuClose();
          history.push(`/juira`);
        }}
      >
        <IconButton size="large" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p>Cerrar Sesion</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {role === "usuario" && (
        <Link
          component={RouterLink}
          to="/juira/sell"
          underline="none"
          sx={{ color: "" }}
        >
          <MenuItem style={{ color: "var(--primaryColor)" }}>
            <IconButton
              size="large"
              /* aria-label={`show ${itemsInCart.length} new notifications`} */
              color="inherit"
            >
              <Badge /* badgeContent={itemsInCart.length} */ color="error">
                <AddBusinessIcon />
              </Badge>
            </IconButton>
            <p>Vender un producto</p>
          </MenuItem>
        </Link>
      )}
      {(!role || role === "usuario") && (
        <Link
          component={RouterLink}
          to="/juira/favorites"
          underline="none"
          sx={{ color: "" }}
        >
          <MenuItem style={{ color: "var(--primaryColor)" }}>
            <IconButton
              size="large"
              aria-label={`show ${itemsFavorites.length} new notifications`}
              color="inherit"
            >
              <Badge badgeContent={itemsFavorites.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <p>Favoritos</p>
          </MenuItem>
        </Link>
      )}
      {(!role || role === "usuario") && (
        <Link
          component={RouterLink}
          to="/juira/shoppingCart"
          underline="none"
          sx={{ color: "" }}
        >
          <MenuItem style={{ color: "var(--primaryColor)" }}>
            <IconButton
              size="large"
              aria-label={`show ${itemsInCart.length} new notifications`}
              color="inherit"
            >
              <Badge badgeContent={itemsInCart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <p>Carrito de compras</p>
          </MenuItem>
        </Link>
      )}
      {role && (
        <Link
          component={RouterLink}
          to="/juira/dashboard"
          underline="none"
          sx={{ color: "" }}
        >
          <MenuItem style={{ color: "var(--primaryColor)" }}>
            <IconButton size="large" color="inherit">
              <InsertChartIcon />
            </IconButton>
            <p>Dashboard</p>
          </MenuItem>
        </Link>
      )}
      {role ? (
        <Link
          component={RouterLink}
          to="/juira/login"
          underline="none"
          sx={{ color: "" }}
        >
          <MenuItem
            style={{ color: "var(--primaryColor)" }}
            onClick={() => {
              handleMenuClose();
            }}
          >
            <IconButton size="large" color="inherit">
              {user.image ? (
                <Avatar alt="U" src={user.image} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <p>Perfil</p>
          </MenuItem>
        </Link>
      ) : (
        <Link
          component={RouterLink}
          to="/juira/login"
          underline="none"
          sx={{ color: "#ffffff" }}
        >
          <MenuItem style={{ color: "var(--primaryColor)" }}>
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Iniciar Sesion</p>
          </MenuItem>
        </Link>
      )}
      {role && (
        <MenuItem
          style={{ color: "var(--primaryColor)" }}
          onClick={() => {
            dispatch(logoOutAction());
            handleMenuClose();
            history.push(`/juira`);
          }}
        >
          <IconButton size="large" color="inherit">
            <LogoutIcon />
          </IconButton>
          <p>Cerrar Sesion</p>
        </MenuItem>
      )}
    </Menu>
  );

  const linkSx = {
    color: "#ffffff",
  };
  return (
    <Box position="sticky" top="0" left="0" zIndex="5" sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        color="success"
        style={{ backgroundColor: "var(--primaryColor)" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { sm: "block" } }}
          >
            <Link
              component={RouterLink}
              to="/juira"
              underline="none"
              onClick={() => {
                dispatch(updateFilter({ name: "categories", value: "Todos" }));
                dispatch(updateFilter({ name: "sort", value: "A-Z" }));
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <img className={style.img} src={image} alt="juria"></img>
              </Box>
              <Box sx={{ mr: 2, display: { xs: "block", sm: "none" } }}>
                <img
                  style={{ height: "35px", objectFit: "cover" }}
                  src={imageMobile}
                  alt="juria"
                ></img>
              </Box>
            </Link>
          </Typography>
          {role !== "admin" && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#ffffff" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar un producto..."
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleOnChange(e)}
                value={input}
                autoFocus={true}
                onKeyDown={(e) => handleOnKeyDown(e)}
                sx={{ color: "#ffffff" }}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {role === "usuario" && (
              <Link
                component={RouterLink}
                to="/juira/sell"
                underline="none"
                sx={{ color: "#ffffff" }}
              >
                <Tooltip title="Vender un producto" arrow>
                  <IconButton
                    size="large"
                    aria-label={`Vender un producto`}
                    color="inherit"
                  >
                    <AddBusinessIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
            {(!role || role === "usuario") && (
              <Link
                component={RouterLink}
                to="/juira/favorites"
                underline="none"
                sx={{ color: "#ffffff" }}
              >
                <Tooltip title="Favoritos" arrow>
                  <IconButton
                    size="large"
                    aria-label={`show ${itemsFavorites.length} items in shopping cart`}
                    color="inherit"
                  >
                    <Badge badgeContent={itemsFavorites.length} color="error">
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Link>
            )}
            {(!role || role === "usuario") && (
              <Link
                component={RouterLink}
                to="/juira/shoppingCart"
                underline="none"
                sx={{ color: "#ffffff" }}
              >
                <Tooltip title="Carrito de compras" arrow>
                  <IconButton
                    size="large"
                    aria-label={`show ${itemsInCart.length} items in shopping cart`}
                    color="inherit"
                  >
                    <Badge badgeContent={itemsInCart.length} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Link>
            )}

            {role === "admin" && (
              <Link
                component={RouterLink}
                to="/juira/dashboard"
                underline="none"
                sx={{ color: "#ffffff" }}
              >
                {/* <AccountCircle /> */}
                <Tooltip title="Dashboard" arrow>
                  <IconButton size="large" color="inherit">
                    <InsertChartIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )}

            {role === "usuario" && (
              <Link
                component={RouterLink}
                to="/juira/dashboard"
                underline="none"
                sx={{ color: "#ffffff" }}
              >
                <Tooltip title="User Dashboard" arrow>
                  <IconButton size="large" color="inherit">
                    <FolderSharedIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
            {role ? (
              <Tooltip title="Perfil" arrow>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: "#ffffff" }}
                >
                  {user.image ? (
                    <Avatar alt="U" src={user.image} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              </Tooltip>
            ) : (
              <Link
                component={RouterLink}
                to="/juira/login"
                underline="none"
                sx={{ color: "#ffffff" }}
              >
                <Tooltip title="Iniciar Sesion" arrow>
                  <IconButton size="large" color="inherit">
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
