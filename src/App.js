import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {Context} from './index'

const App = observer(() => {
  // const {user} = useContext(Context)
  // useEffect(()=> {
  //   user.setIsAuth(true)
  // }, [])
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
