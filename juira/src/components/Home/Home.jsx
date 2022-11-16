import React, { /* useState, */ useEffect, useState } from "react";
import styles from "./Home.module.css";
import Hero from "../Hero/Hero.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import CardsGrid from "../CardsGrid/CardsGrid";
import Footer from "../Footer/Footer.jsx";
//import logoColor from '../media/juira_color.png';
import { /* connect, */ useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getCategories,
  updateDisplayed,
  updateDisplayedByQuery,
} from "../../redux/actions/products.actions.jsx";
import FilterBar from "../FilterBar/FilterBar";
import { useLocation } from "react-router-dom";
import { updateFilter } from "../../redux/actions/app.actions";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useHistory } from "react-router-dom";

const _ = require("lodash");

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Home(/* { prods, getAll } */) {
  const history = useHistory();
  let query = useQuery();
  const productsState = useSelector(
    (state) => state.productsReducer.allProducts
  );
  const productsToDisplay = useSelector(
    (state) => state.productsReducer.productsToDisplay
  );
  const filterSort = useSelector((state) => state.app.filterState);

  const dispatch = useDispatch();
  const [stateFilterAndSort, setStateFilterAndSort] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    async function changeState() {
      if (query.get("search")) {
        dispatch(updateDisplayedByQuery(query.get("search")));
        dispatch(updateFilter({ name: "categories", value: "Todos" }));
        dispatch(updateFilter({ name: "sort", value: "A-Z" }));
        dispatch(updateFilter({ name: "condition", value: "Todos" }));
        setShowSearch(true);
      } else {
        setShowSearch(false);
        dispatch(updateDisplayed());
      }
    }
    changeState();
  }, [query]);

  useEffect(() => {
    filterAndSort();
  }, [filterSort, productsToDisplay]);
  const filterAndSort = () => {
    let aux = [];
    if (productsToDisplay) {
      if (filterSort.categories !== "Todos") {
        aux = productsToDisplay?.filter((ele) => {
          return ele.categories.some(
            (cat) => cat.name === filterSort.categories
          );
        });
      } else {
        aux = productsToDisplay;
      }

      if (filterSort.condition !== "Todos") {
        aux = aux?.filter((ele) => {
          return ele.condition === filterSort.condition;
        });
      }

      setStateFilterAndSort(
        _.orderBy(
          aux,
          filterSort.sort === "A-Z" || filterSort.sort === "Z-A"
            ? "name"
            : "price",
          filterSort.sort === "Z-A" || filterSort.sort === "Mayor Valor"
            ? "desc"
            : "asc"
        )
      );
    }
  };

  return (
    <section className={styles.homeContainer}>
      <div className={styles.heroWrapper}>
        <Hero />
      </div>
      <div className={styles.filterBarWrapper}>
        {/* <Navbar /> */}
        <FilterBar />
      </div>
      {showSearch && (
        <Typography align="center" variant="h6">
          Resultado de su busqueda: "{query.get("search")}"
        </Typography>
      )}
      <div className={styles.mainContainer}>
        {/*  ..MAIN.. */}
        {/* <div className={styles.sideWrapper}>
          <Sidebar />
        </div> */}
        <div className={styles.cardsGridContainer}>
          <CardsGrid products={stateFilterAndSort} />
        </div>
      </div>
    </section>
  );
}
