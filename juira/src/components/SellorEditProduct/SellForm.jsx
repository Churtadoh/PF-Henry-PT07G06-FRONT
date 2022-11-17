import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  publishProd,
} from "../../redux/actions/products.actions.jsx";
import { useHistory } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import toast from "react-hot-toast";
// import { themeOptions } from '../../ThemeColors.js'
// import { ThemeProvider } from '@mui/material/styles';


function validate(data) {
  let errores = {};
  if (!data.name) errores.name = "Cual es el nombre del producto?";

  if (!data.price) errores.price = "Cuanto vale?";

  if (!data.description)
    errores.description = `Que tamaño tiene? Contanos un poco del producto`;

  if (!data.condition) errores.condition = "En que estado se encuentra?";

  if (data.categories.length === 0)
    errores.categories = "Seleccione una categoría";

  if (!data.image) errores.image = "Ingrese imagen del producto";

  return errores;
}

export default function SellForm() {
  const dispatch = useDispatch();
  //Las cargo para usarlas en ventas
  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.productsReducer.categories);

  const history = useHistory();

  const [error, setError] = useState({});
  const [data, setData] = React.useState({
    name: "",
    price: 0,
    description: "",
    condition: "",
    image: "",
    categories: [],
  });

  //Handle Image with Cloudinary

  const [selectedImage, setSelectedImage] = useState("");
  const [previewSource, setPreviewSource] = useState();
  let userToken = useSelector((state) => state.app.token.token);

  let handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  let handleImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "DB_PF_JUIRA");
    delete axios.defaults.headers.common["Authorization"];
    await axios
      .post("https://api.cloudinary.com/v1_1/duq1tcwjw/image/upload", formData)
      .then((response) => {
        setData({ ...data, image: response.data.secure_url });
      })
      .finally((axios.defaults.headers.common["Authorization"] = userToken));
  };

  const handleOnChange = (e) => {
    if (e.target.name === "price") {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value),
      });
    } else if (e.target.name === "categories") {
      setData({
        ...data,
        [e.target.name]:
          typeof e.target.value === "string"
            ? e.target.value.split(",")
            : e.target.value,
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }

    setError(validate({ ...data, [e.target.name]: e.target.value }));
  };

  let handleOnSubmit = (e) => {
    if (Object.values(error).length > 0 || data.name.length === 0) {
      toast.error("Complete todos los campos por favor!");
    } else {
      dispatch(publishProd(data));

      setData({
        name: "",
        price: 0,
        description: "",
        condition: "",
        image: "",
        categories: [],
      });
      setPreviewSource("");
      toast.success("Su producto fue publicado!!");

    }
  };

  return (
    <Container
      sx={{
        background:
          "var(--UiLightColor)" /* 'linear-gradient( 90deg, white, #b6deb8 10%, #b6deb8 90%, white )' */,
        display: "flex",
        flexDirection: "column",
        width: 1,
        my: 0,
        boxShadow: "0 0 15px 5px #cccccc55",
        padding: 5,
      }}
    >
      <Typography
        sx={{
          /* marginTop: '30px', */ fontSize: "1.5rem",
          width: 1,
          borderBottom: "solid var(--primaryColor)" /* 'solid green' */,
        }}
        color="var(--primaryColor)"
        gutterBottom
      >
        FORMULARIO DE VENTA
      </Typography>

      <Box
        sx={{
          my: 0.8,
          p: 1,
          width: 0.8,
          position: "relative",
          /* top: 20, */
          left: "10%",
          backgroundColor: "var(--UiLightColor)" /* '#66bb6a' */,
          height: "fit-content",
          textAlign: "center",
          boxShadow: 0 /* 1 */,
          opacity: "50%",
        }}
      >
        <Typography
          sx={{ fontSize: "1.5rem", color: "var(--primaryColor)" }}
          color="black"
          gutterBottom
        >
          Un paso mas cerca de sacarlo JUIRA!
        </Typography>
      </Box>
      <Box
        sx={{
          m: 3,
          mb: 5,
          p: 3,
          position: "relative",
          top: 20,
          width: 0.9,
          height: "fit-content",
          backgroundColor: "var(--UiLightColor)" /* '#81c784' */,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: 1, justifyContent: "space-around" }}
        >
          {/*Nombre y descripcion */}

          <Stack alignItems="center" spacing={2} sx={{ width: 0.45 }}>
            <TextField
              id="filled-multiline-flexible"
              label="Nombre del Producto"
              name="name"
              onChange={handleOnChange}
              value={data.name}
              placeholder="Placeholder"
              multiline
              maxRows={4}
              variant="filled"
              sx={{ width: 1, color: "var(--primaryColor)" }}
              error={Boolean(error.name)}
              helperText={error.name}
            ></TextField>

            <TextField
              id="filled-multiline-static"
              label="Descripcion"
              multiline
              rows={5}
              name="description"
              onChange={handleOnChange}
              value={data.description}
              variant="filled"
              sx={{ width: 1 }}
              error={Boolean(error.description)}
              helperText={error.description}
            />
          </Stack>

          {/*Precio Categoria y estado */}
          <Stack
            alignItems="center"
            spacing={2}
            sx={{ justifyContent: "space-evenly" }}
          >
            <TextField
              id="filled-multiline-flexible"
              label="Precio"
              name="price"
              placeholder="Placeholder"
              multiline
              maxRows={4}
              value={data.price}
              onChange={handleOnChange}
              variant="filled"
              sx={{ width: 140, mb: 3 }}
              error={Boolean(error.price)}
              helperText={error.price}
            />

            <FormControl variant="filled" sx={{ minWidth: 140, pb: 3 }}>
              <InputLabel id="demo-multiple-name-label">Categoría</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                name="categories"
                value={data.categories}
                onChange={handleOnChange}
                error={Boolean(error.categories)}
                sx={{ maxWidth: 140 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories?.map((nc) => (
                  <MenuItem key={nc.id} value={nc.id}>
                    {nc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="filled" sx={{ minWidth: 140 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Estado
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="condition"
                value={data.condition}
                onChange={handleOnChange}
                error={Boolean(error.condition)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Como nuevo"}> Como Nuevo</MenuItem>
                <MenuItem value={"Usado"}>Usado</MenuItem>
                <MenuItem value={"Claros signos de uso"}>
                  Claros signos de uso
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/*Imagen */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <div>
              {previewSource ? (
                <img
                  src={previewSource}
                  alt="chosenOne"
                  style={{
                    height: "250px",
                    margin: "10px",
                    width: "250px",
                    border: "2px dashed green",
                  }}
                />
              ) : error.image ? (
                <div
                  style={{
                    height: "250px",
                    margin: "10px",
                    width: "250px",
                    border: "2px dashed red",
                  }}
                ></div>
              ) : (
                <div
                  style={{
                    height: "250px",
                    margin: "10px",
                    width: "250px",
                    border: "2px dashed grey",
                  }}
                ></div>
              )}

              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ justifyContent: "center" }}
              >
                <Button
                  onClick={handleImage}
                  variant="contained"
                  component="label"
                  sx={{ backgroundColor: "#23c197",
                  "&:hover": { backgroundColor: "#138f6e" },}}
                  disabled={!previewSource}
                >
                  <Typography
                    sx={{ fontSize: 14, width: 1 }}
                    color= "black"
                  >
                    Subir Imagen
                  </Typography>

                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    color="success"
                  />
                </Button>
                <IconButton
                  sx={{ color: "var(--primaryColor)" }}
                  /* color="success" */ aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    id="upload_widget"
                    onChange={handleFileInputChange}
                  />
                  <AddAPhotoIcon />
                </IconButton>
              </Stack>
            </div>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          sx={{ mt: 5, backgroundColor: "#23c197",
          "&:hover": { backgroundColor: "#138f6e" }, }}
          onClick={handleOnSubmit}
          disabled={Object.values(error).length > 0 || data.name.length === 0}
          
        >
          <Typography
            sx={{ fontSize: 20, width: 1, color: 'black'}}
            gutterBottom
          >
            SACAR PA' JUIRA
          </Typography>
        </Button>
      </Box>
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
          sx={{
            backgroundColor: "#23c197",
            "&:hover": { backgroundColor: "#138f6e" },
          }}
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
