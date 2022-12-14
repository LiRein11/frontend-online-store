import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { getOneBasket} from './http/deviceAPI';
import { check } from './http/userAPI';
import { Context } from './index';

const App = observer(() => {
  const { user, basket } = useContext(Context);
  const [loading, setLoading] = useState(false); // Загрузка страницы, как только запрос на сервер выполнится, пользователь зайдет, и вся страница прогрузится, состояние станет false

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoading(true);
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false)); // Чтобы не было перерендеринга навбара
    }
  }, [user]);

  useEffect(() => {
    if (user.isAuth === true) {
      basket.setResetBasket();
      getOneBasket().then((data) => {
        basket.setOneBasket(data.basket_devices, true);
      });
    } else if (user.isAuth === false) {

      const savedBasket = JSON.parse(localStorage.getItem('basket'));

      basket.setOneBasket(savedBasket, false);
    }
  }, [basket, user.isAuth]);

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
