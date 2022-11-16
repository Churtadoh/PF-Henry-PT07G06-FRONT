import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesNames } from "../../../redux/actions/products.actions";
import { updateFilter } from "../../../redux/actions/app.actions";
import SortIcon from "@mui/icons-material/Sort";

const sort = ["Mayor Valor", "Menor Valor", "A-Z", "Z-A"];

const SortButton = () => {
  const options = useSelector((state) => state.productsReducer.allCategories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesNames());
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("A-Z");
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  }; /*  */

  const handleMenuItemClick = (event, by) => {
    dispatch(updateFilter({ name: "sort", value: by }));
    setSelectedIndex(by);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        sx={{ m: 0 }}
        id="basic"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "var(--primaryColor", marginLeft: "2rem" }}
        startIcon={
          selectedIndex === "Mayor Valor" || selectedIndex === "A-Z" ? (
            <SortIcon />
          ) : (
            <SortIcon style={{ transform: "rotateX(180deg)" }} />
          )
        }
      >
      
        Ordenar
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
            maxHeight: 300,
            width: "20ch",
          },
        }}
      >
        {sort.map((sort, index) => (
          <MenuItem
            key={index}
            selected={sort === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, sort)}
          >
            {sort}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortButton;
