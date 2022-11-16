import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../redux/actions/app.actions";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const condition = ["Como nuevo", "Usado", "Claros signos de uso"];

const ConditionFilter = () => {
  const dispatch = useDispatch();
  const conditionState = useSelector(
    (state) => state.app.filterState.condition
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  }; /*  */

  const handleMenuItemClick = (event, by) => {
    dispatch(updateFilter({ name: "condition", value: by }));
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
        startIcon={conditionState !== "Todos" ? <FilterAltIcon /> : null}
        style={{ color: "var(--primaryColor", marginLeft: "2rem" }}
      >
        Estado
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
        {" "}
        <MenuItem
          sx={{ fontWeight: "bold" }}
          key={0}
          /* disabled={index === 0} */
          selected={"Todos" === conditionState}
          onClick={(event) => handleMenuItemClick(event, "Todos")}
        >
          Todos
        </MenuItem>
        {condition.map((conditionState, index) => (
          <MenuItem
            key={index}
            selected={conditionState === conditionState}
            onClick={(event) => handleMenuItemClick(event, conditionState)}
          >
            {conditionState}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ConditionFilter;
