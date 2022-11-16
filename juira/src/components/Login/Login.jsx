import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { loginAction, getUser } from "../../redux/actions/app.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { postLogin } from "../../redux/actions/app.actions";
import PerfilUser from "../PerfilUser/PerfilUser";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = useSelector((state) => state.app.token.role);

  const [userLog, setUserLog] = React.useState({
    email: " ",
    password: " ",
  });

  const handleChange = (e) => {
    setUserLog({ ...userLog, [e.target.name]: e.target.value });
  };

  const auth = getAuth();
  const user = auth.currentUser;

  // onAuthStateChanged(auth, async (user) => {});

  const login = async () => {
    if (userLog.email !== "" && userLog.password !== "") {
      try {
        const signIn = await signInWithEmailAndPassword(
          auth,
          userLog.email,
          userLog.password
        ).then((res) => {
          return res.user.accessToken;
        });

        await dispatch(loginAction({ token: signIn }));
        await dispatch(getUser());
        history.push(`/juira/login`);
      } catch (error) {
        toast.error("Contraseña o Email incorrectos");
        console.log(`Error ${error.code}: ${error.message}`);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const tokenGoogle = await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        // ...
        const token = user.getIdToken();

        return token;
      })
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));


    await dispatch(loginAction({ token: tokenGoogle }));
    await dispatch(getUser());
    history.push(`/juira/login`);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const txtstyle = {
    margin: "10px 0",
    fontFamily: "nunito",
    color: "var(--primaryColor)",
  };
  return (
    <div>
      {role && (
        <div>
          <PerfilUser />
        </div>
      )}
      {!role && (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center" style={{ marginBottom: "20px" }}>
              <Avatar style={avatarStyle}>
                <LockIcon />
              </Avatar>
              <h2>Iniciar Sesión</h2>
            </Grid>
            {/* <TextField label='Nombre y Apellido' placeholder='Nombre y Apellido' style={txtstyle} fullWidth required/> */}
            {/* <TextField label='Mail' placeholder='Mail' style={txtstyle} fullWidth required/> */}
            <TextField
              label="Usuario"
              name="email"
              placeholder="Usuario"
              onChange={handleChange}
              style={txtstyle}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              style={txtstyle}
              type="password"
              fullWidth
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: "var(--primaryColor)" }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Recuérdame"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              sx={{
                backgroundColor: "#23c197",
                "&:hover": { backgroundColor: "#138f6e" },
              }}
              onClick={login}
            >
              Iniciar Sesión
            </Button>
            {/* <Typography >


                     <Link to="#" >
                        Olvidaste tu contraseña?
                </Link>
                </Typography> */}

            <Button onClick={handleGoogleSignIn}>Login con Google</Button>
            <Typography>
              {" "}
              Todavía no estás registrado?
              <Link to="/juira/register">Regístrate</Link>
            </Typography>
          </Paper>
        </Grid>
      )}
    </div>
  );
}
