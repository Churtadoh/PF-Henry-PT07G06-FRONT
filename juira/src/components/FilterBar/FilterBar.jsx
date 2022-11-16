import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesNames } from "../../redux/actions/products.actions";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { updateFilter } from "../../redux/actions/app.actions";
import SortButton from "./Components/SortButton";
import ConditionFilter from "./Components/ConditionFilter";
import ClearIcon from "@mui/icons-material/Clear";

const sort = ["Mayor Valor", "Menor Valor", "A-Z", "Z-A"];

const FilterBar = () => {
  const options = useSelector((state) => state.productsReducer.allCategories);
  const filterState = useSelector((state) => state.app.filterState.categories);
  const conditionState = useSelector(
    (state) => state.app.filterState.condition
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesNames());
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("Todos");
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, category) => {
    dispatch(updateFilter({ name: "categories", value: category }));

    /* setSelectedIndex(category); */
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="relative" style={{ backgroundColor: "#FFF" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense" sx={{ flexWrap: "wrap" }}>
          <Button
            sx={{ m: 0 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            startIcon={filterState !== "Todos" ? <FilterAltIcon /> : null}
            style={{ color: "var(--primaryColor" }}
          >
            Categorias
          </Button>

          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
            PaperProps={{
              style: {
                maxHeight: 400,
              },
            }}
          >
            <MenuItem
              sx={{ fontWeight: "bold" }}
              key={0}
              /* disabled={index === 0} */
              selected={"Todos" === filterState}
              onClick={(event) => handleMenuItemClick(event, "Todos")}
            >
              Todos
            </MenuItem>
            {options &&
              options.sort().map((category, index) => (
                <MenuItem
                  key={index + 1}
                  /* disabled={index === 0} */
                  selected={category === filterState}
                  onClick={(event) => handleMenuItemClick(event, category)}
                >
                  {category}
                </MenuItem>
              ))}
          </Menu>
          <ConditionFilter />
          <SortButton />

          <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
          {filterState !== "Todos" && (
            <Button
              sx={{ m: 0, borderRadius: "9999px", fontSize: 11  }}
              variant="outlined"
              size="small"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              endIcon={<ClearIcon style={{ fontSize: 14 }} />}
              style={{
                color: "white",
                backgroundColor: "var(--primaryColor",
              }}
              onClick={() =>
                dispatch(updateFilter({ name: "categories", value: "Todos" }))
              }
            >
              {filterState}
            </Button>
          )}
          {conditionState !== "Todos" && (
            <Button
              sx={{ m: 0, mx: 2, borderRadius: "9999px", fontSize: 11 }}
              variant="outlined"
              size="small"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              endIcon={<ClearIcon style={{ fontSize: 14 }} />}
              style={{
                color: "white",
                backgroundColor: "var(--primaryColor",
              }}
              onClick={() =>
                dispatch(updateFilter({ name: "condition", value: "Todos" }))
              }
            >
              {conditionState}
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default FilterBar;
