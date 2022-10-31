import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import { Context } from './index';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true); // Загрузка страницы, как только запрос на сервер выполнится, пользователь зайдет, и вся страница прогрузится, состояние станет false

  useEffect(() => {
      check()
        .then((data) => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false)); // Чтобы не было перерендеринга навбара 
  }, []);

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
