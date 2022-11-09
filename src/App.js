import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { getDevicesFromBasket, getOneBasket } from './http/deviceAPI';
import { check } from './http/userAPI';
import { Context } from './index';

const App = observer(() => {
  const { user, basket } = useContext(Context);
  const [loading, setLoading] = useState(true); // Загрузка страницы, как только запрос на сервер выполнится, пользователь зайдет, и вся страница прогрузится, состояние станет false

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(true);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false)); // Чтобы не было перерендеринга навбара
  }, []);

  useMemo(() => {
    // if (user.isAuth === true) {
    //   getDevicesFromBasket().then((data) => {
    //     for (let key in data) {
    //       basket.setBasket(data[key]); 
    //     }
    //   });
    // }
    if(user.isAuth === true){
      getOneBasket().then((data)=>{
        basket.setOneBasket(data.basket_devices)
      })
    } else {
      basket.setResetBasket()
    }
  }, [user.isAuth]); 

  if (loading) {
    return <Spinner animation={'grow'} />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
