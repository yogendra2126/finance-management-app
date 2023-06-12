import { Button } from '@mui/material'
import { useContext } from 'react';
import { UserContext } from '../context/user.context';
import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from '../img/bg.png'
import {MainLayout} from '../styles/Layouts'
import Orb from './Orb/Orb'
import Navigation from './Navigation/Navigation'
import Dashboard from './Dashboard/Dashboard';
import Income from './Income/Income'
import Expenses from './Expenses/Expenses';
import { useGlobalContext } from '../context/globalContext';


export default function Home() {
  const { logOutUser } = useContext(UserContext);
 
 // This function is called when the user clicks the "Logout" button.
 const logOut = async () => {
   try {
     // Calling the logOutUser function from the user context.
     const loggedOut = await logOutUser();
     // Now we will refresh the page, and the user will be logged out and
     // redirected to the login page because of the <PrivateRoute /> component.
     if (loggedOut) {
       window.location.reload(true);
     }
   } catch (error) {
     alert(error)
   }
 }

 const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])
 
 return (
    <AppStyled bg={bg} className="App">
    {orbMemo}
    <MainLayout>
      <Navigation active={active} setActive={setActive} />
      <main>
        {displayData()}
      </main>
    </MainLayout>
  </AppStyled>
 )
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;