import React, { useContext} from 'react';
import { Button, Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logout = ()=>{
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <NavLink style={{ color: 'white' }} href={SHOP_ROUTE}>
            Купить девайс
          </NavLink>
          {user.isAuth ? (
            <Nav className='me-auto' style={{ color: 'white' }}>
              <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
                Админ панель
              </Button>
              <Button
                variant={'outline-light'}
                onClick={() => logout()}
                className='ml-2'>
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className='me-auto' style={{ color: 'white' }}>
              <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>
                Авторизация
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
});

export default NavBar;
