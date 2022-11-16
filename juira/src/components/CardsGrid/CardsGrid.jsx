import React from "react";
import styles from "./CardsGrid.module.css";
import Card from "../Card/Card.jsx";
import Pagination from "../Pagination/Pagination";
import Container from "@mui/material/Container";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { updateFilter } from "../../redux/actions/app.actions";
import { useHistory } from "react-router-dom";

export default function CardsGrid({ products }) {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(8);
  const maxPage = Math.ceil(products.length / perPage);
  const loading = useSelector((state) => state.app.isSpinner);
  const dispatch = useDispatch()
  const history = useHistory()

  return loading !== 0 && products.length === 0 ? (
    <Loading></Loading>
  ) : products.length === 0 ? (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ m: 2, textAlign: "center" }}>
        No se encontraron productos segun su busqueda
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#23c197",
          "&:hover": { backgroundColor: "#138f6e" },
          mb: 3,
          width: 0.2,
          alignSelf: "center",
        }}
        onClick={() => {
          dispatch(updateFilter({ name: "categories", value: "Todos" }))
          history.push("/juira")
        }}
      >
        Volver
      </Button>
    </Container>
  ) : (
    <div className={styles.container /* cards_grid_container */}>
      <div className={styles.product_grid}>
        {products &&
          products
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((p) => (
              <Card
                key={"crd" + p.id}
                className={styles.cardItem}
                product={p}
                id={p.id}
                price={p.price}
                name={p.name}
                image={p.image}
              />
            ))}
      </div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 1,
        }}
      >
        <Pagination
          page={page}
          setPage={setPage}
          maxPage={maxPage}
          products={products}
        ></Pagination>
      </Container>
    </div>
  );
}
