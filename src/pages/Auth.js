import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Auth = observer(() => {
  const { user } = React.useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-3'
            placeholder='Введите ваш e-mail...'></Form.Control>
          <Form.Control
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='mt-3'
            placeholder='Введите ваш пароль...'></Form.Control>
          <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
            {isLogin ? (
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
              </div>
            )}
            <Button onClick={click} variant={'outline-success'}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
