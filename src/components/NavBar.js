import React, { useContext } from 'react';
import { Button, Container, Image, Nav, Navbar, NavLink } from 'react-bootstrap';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/cart.png';

const NavBar = observer(({ price, countItem }) => {
  const { user, basket } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
    basket.setResetBasket();
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <NavLink style={{ color: 'white' }} href={SHOP_ROUTE}>
            Купить девайс
          </NavLink>
          {(user.isAuth && user.user.role === 'ADMIN') ? (
            <Nav className='me-auto' style={{ color: 'white' }}>
              <NavLink className='d-flex align-items-center' href={BASKET_ROUTE}>
                <div className='mr-1' style={{ textDecoration: 'none', color: 'white' }}>
                  {basket._basket.length}
                </div>
                <Image src={cart} width={18} height={18}></Image>
                <div className='ml-2' style={{ textDecoration: 'none', color: 'white' }}>
                  {basket._totalPrice} RUB
                </div>
              </NavLink>
              <Button
                className='mr-3'
                variant='outline-light'
                onClick={() => navigate(ORDER_ROUTE)}>
                Заказы
              </Button>
              <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
                Админ панель
              </Button>
              <Button variant={'outline-light'} onClick={() => logout()} className='ml-2'>
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className='me-auto' style={{ color: 'white' }}>
              <NavLink className='d-flex align-items-center' href={BASKET_ROUTE}>
                <div className='mr-1' style={{ textDecoration: 'none', color: 'white' }}>
                  {basket._basket.length}
                </div>
                <Image src={cart} width={18} height={18}></Image>
                <div className='ml-2' style={{ textDecoration: 'none', color: 'white' }}>
                  {basket._totalPrice} RUB
                </div>
              </NavLink>
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
