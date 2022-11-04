import React, { useContext } from 'react';
import { Button, Container, Image, Nav, Navbar, NavLink } from 'react-bootstrap';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/cart.png';

const NavBar = observer(({ price, countItem }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <NavLink style={{ color: 'white' }} href={SHOP_ROUTE}>
            Купить девайс
          </NavLink>
          {user.isAuth ? (
            <Nav className='me-auto' style={{ color: 'white' }}>
              <NavLink className='d-flex align-items-center'>
                <div className='mr-1' style={{ textDecoration: 'none', color: 'white' }}>
                  0
                </div>
                <Image
                  src={cart}
                  width={18}
                  height={18}
                  onClick={() => navigate(BASKET_ROUTE)}></Image>
                <div className='ml-2' style={{ textDecoration: 'none', color: 'white' }}>
                  0 RUB
                </div>
              </NavLink>
              <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
                Админ панель
              </Button>
              <Button variant={'outline-light'} onClick={() => logout()} className='ml-2'>
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
