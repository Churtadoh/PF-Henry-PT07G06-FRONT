import React from 'react';
import Container from '@mui/material/Container';
//import UserDashTable from './UserDashTable';
import UserPurchasesTable from './UserPurchasesTable';



export default function UserDashPurchases(props) {

    const { clicked, setClicked } = props;
  

    return (
        <Container component={'span'}
            sx={{
                width: "85%", height: "100%",
                boxShadow: '0 8px 15px 5px #cccccc55', padding: '2rem', borderRadius: '.8rem'
            }} >

            {props.list?.length > 0
                ? <UserPurchasesTable list={props.list} setClicked={setClicked} clicked={clicked} />
                : "No hay ordenes para mostrar."}


        </Container>
    )
}