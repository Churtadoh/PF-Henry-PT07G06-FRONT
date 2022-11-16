import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
//import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
//import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button, /* Input,  */TextField } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { API_URL_BACKEND } from "../../api/apiRoute";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Q_A({ id }) {
  const [questions, setQuestions] = useState(undefined);
  const [questionsInput, setQuestionsInput] = useState(false);
  const [questionSubmit, setQuestionSubmit] = useState("");
  const [error, setError] = useState(false);
  const [userProducts, setUserProducts] = useState([]);
  const [questionId, setQuestionId] = useState(false);
  const role = useSelector((state) => state.app.token.role);

  const handleChange = (event) => {
    setQuestionSubmit(event.target.value);
  };
  useEffect(() => {
    setError(!(questionSubmit.length > 5) || questionSubmit.length > 256);
  }, [questionSubmit]);

  try {

    const fetchAnswer = async () => {
      try {
        const { data } = await axios(
          `${API_URL_BACKEND}Q&A?productQAndAId=${id}`
        );

        setQuestions(data);
      } catch (error) {
        console.log("errorQ&A", error);
      }
      try {
        if (role) {
          const { data } = await axios(`${API_URL_BACKEND}users/unique`);
          setUserProducts(data.productsOwner);

        }
      } catch (error) {
        console.log("errorUnique", error);
      }
    };
    useEffect(() => {
      fetchAnswer();
    }, []);

    const handleSubmit = async () => {
      try {
        await axios.post(`${API_URL_BACKEND}Q&A?productQAndAId=${id}`, {
          productQAndAId: id,
          question: questionSubmit,
        });
        setQuestionSubmit("");
        setQuestionsInput(false);
        toast.success("Tu pregunta fue posteada");
        fetchAnswer();
      } catch (error) {
        console.log("error post", error);
        toast.error("Por favor intenta otra vez");
      }
    };
    const handleSubmitPut = async () => {
      try {
        await axios.put(`${API_URL_BACKEND}Q&A/updateAnswer/${questionId}`, {
          answer: questionSubmit,
        });
        setQuestionSubmit("");
        setQuestionId(false);
        toast.success("Tu respuesta fue posteada");
        fetchAnswer();
      } catch (error) {
        console.log("error post", error);
        toast.error("Por favor intenta otra vez");
      }
    };

    return (
      questions === undefined
        ? /* "Cargando.." */
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >

          <Grid item xs={3}>
            <CircularProgress color="primary" />
          </Grid>

        </Grid>
        :
        <Box
          sx={{
            width: 500,
            m: 4,
            overflowY: "scroll",
            maxHeight: "80vh",
            /* border: 0.5, */
            borderRadius: 5,
            boxShadow: 3,
            p: 4,
          }}
        >
          {/* <Typography sx={{ fontSize: 20, fontWeight: "bold" }} mb={2}>
        Preguntas y respuestas
      </Typography> */}
          <List elevation={10} sx={{ width: "100%", bgcolor: "background.paper" }}>
            {questions.length === 0 ? (
              <Typography sx={{ fontSize: 15, fontWeight: "medium" }} mb={2}>
                No hay preguntas.
              </Typography>
            ) : (
              questions?.map((ele, index) => {
                return (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={ele.question}
                        secondary={
                          (!ele.answer && userProducts?.some((ele) => ele.id === parseInt(id))) ? (
                            <Button
                              onClick={() => {
                                setQuestionId(ele.id);
                              }}
                            >
                              Responde
                            </Button>
                          ) : (
                            ele.answer
                          )
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })
            )}
          </List>
          {
            !userProducts.some((ele) => ele.id === parseInt(id)) && (
              <Button
                onClick={() => {
                  role === "usuario"
                    ? setQuestionsInput(true)
                    : toast.error("Por favor inicia sesion!!");
                }}
              >

              </Button>
            )
          }
          {
            questionsInput && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 4,
                  m: 1,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <TextField
                  error={error}
                  id="outlined-basic"
                  label="Tipea acá"
                  variant="outlined"
                  value={questionSubmit}
                  onChange={handleChange}
                  helperText={error ? "Entre 5 y 256 caracteres" : ""}
                  autoFocus
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    disabled={error}
                    sx={{
                      mt: 2,
                      borderRadius: 3,
                    }}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Enviar
                  </Button>
                  <Button
                    sx={{
                      mt: 2,
                      border: "none",
                    }}
                    color="error"
                    onClick={() => {
                      setQuestionsInput(false);
                    }}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Box>
            )
          }
          {
            questionId && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 4,
                  m: 1,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <TextField
                  error={error}
                  id="outlined-basic"
                  label="Tipea acá"
                  variant="outlined"
                  value={questionSubmit}
                  onChange={handleChange}
                  helperText={error ? "Entre 5 y 256 caracteres" : ""}
                  autoFocus
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    disabled={error}
                    sx={{
                      mt: 2,
                      borderRadius: 3,
                    }}
                    onClick={() => {
                      handleSubmitPut();
                    }}
                  >
                    Enviar
                  </Button>
                  <Button
                    sx={{
                      mt: 2,
                      border: "none",
                    }}
                    color="error"
                    onClick={() => {
                      setQuestionId(false);
                    }}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Box>
            )
          }
        </Box >
    );
  }
  catch (e) {
    console.log(e)
  }
}

export default Q_A;
