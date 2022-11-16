import React from 'react';
import {Container, Grid, Box} from '@mui/material' 
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import Contact from './Contact';


export default function Footer() {
    const role = useSelector((state) => state.app.token.role);
    
    return ( 
    <footer>
        <Box px={{xs: 3, sm:10}} py={{xs: 3, sm: 5}} bgcolor="text.secondary" color='white'>
            <Container maxWidth = 'lg'>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Desarrolladores</Box>
                        <Box>Eric Lehmann</Box>
                        <Box>Mariana Ines Salez</Box>
                        <Box>Arturo Sebastian Urgel</Box>
                        <Box>Jonatan Levi Piedra Palencia</Box>
                        <Box>Camilo  Hurtado Herrera</Box>
                        <Box>Pedro Agustín Morán</Box>
                        <Box>Jeronimo Daniel Cardozo</Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>{(role!=='admin') ? 'Usuario' : 'Admin'}</Box>
                        <Box>
                            <Link to="/juira/login" style={{color: 'white'}}>
                                Iniciar Sesión / Registrarse
                            </Link>
                        </Box>
                        {(role==='admin') && <Box>
                            <Link to="/juira/dashboard" style={{color: 'white'}}>
                                Dashboard de administrador
                            </Link>
                        </Box>}
                        {(role!=='admin') && <Box>
                            <Link to={(role)? "/juira/dashboard" : "/juira/login"} style={{color: 'white'}}>
                                Administrar mi cuenta
                            </Link>
                        </Box>}
                        {(role!=='admin') && <Box>
                            <Link to={(role)? "/juira/sell" : "/juira/login"} style={{color: 'white'}}>
                                Vender un producto
                            </Link>
                        </Box>}
                        {(role!=='admin') && <Box>
                            <Link to="/juira/shoppingCart" style={{color: 'white'}}>
                                Mi carrito
                            </Link>
                        </Box>}
                        {(role!=='admin') && <Box>
                            <Link to="/juira/favorites" style={{color: 'white'}}>
                                Favoritos
                            </Link>
                        </Box>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Ayuda</Box>
                        <Box>
                            <Link to="/juira/soporte" style={{color: 'white'}}>
                                Soporte
                            </Link>
                        </Box>
                        <Box>
                            <Link to="/juira/terminosCondiciones" style={{color: 'white'}}>
                                Terminos y condiciones
                            </Link>
                        </Box>
                        <Box>
                            <Link to="/juira/politicaPrivacidad" style={{color: 'white'}}>
                                Politica de privacidad
                            </Link>
                        </Box>
                        <Box>
                          Contacto: juiraMarket@gmail.com      
                        </Box >
                        <Box py={{xs: 1, sm: 1}} >
                            <Contact/>
                        </Box>
                    </Grid>   
                </Grid>
                <Box textAlign= "center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 0}}>
                    JUIRA&trade; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>

    </footer>
        
    )
}
