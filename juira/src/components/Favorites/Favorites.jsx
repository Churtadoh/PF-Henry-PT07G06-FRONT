import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container } from "@mui/material";
import FavoriteDetail from "./FavoriteDetail";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import Button from "@mui/material/Button";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Favorites() {
  const items = useSelector((state) => state.productsReducer.favorites);
  const history = useHistory();
  const loading = useSelector((state) => state.app.isSpinner);

  return (
    <Container
      sx={{ boxShadow: "0 0 15px 5px #cccccc55", padding: 5, width: "100" }}
    >
      {/* <Typography variant="h4"> Favoritos </Typography> */}
      <Typography
        sx={{
          marginTop: "0",
          fontSize: "1.5rem",
          width: 1,
          borderBottom: "solid var(--primaryColor)" /* 'solid green' */,
        }}
        color="var(--primaryColor)"
        gutterBottom
      >
        FAVORITOS
      </Typography>

      {loading !== 0 && !items.length? (
        <Loading></Loading>
      ) : !items.length ? (
        <Container
          sx={{
            minHeight: 350,
            margin: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5"> No tienes favoritos aún. </Typography>
          <HeartBrokenIcon color="action" sx={{ fontSize: "150px" }} />
        </Container>
      ) : (
        <Container>
          {items.map((p) => (
            <FavoriteDetail
              key={p.id}
              id={p.id}
              price={p.price}
              name={p.name}
              image={p.image}
            />
          ))}
        </Container>
      )}
      <Container
        sx={{
          margin: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          startIcon={<HomeRoundedIcon />}
          sx={
            {
              /* backgroundColor: '#23c197', '&:hover': {backgroundColor: '#138f6e'} */
            }
          }
          onClick={() => {
            history.push("/juira");
          }}
        >
          Inicio
        </Button>
      </Container>
    </Container>
  );
}
