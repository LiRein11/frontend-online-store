import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
            Купить девайс
          </NavLink>
          {user.isAuth ? (
            <Nav className='me-auto' style={{ color: 'white' }}>
              <Button variant={'outline-light'}>Админ панель</Button>
              <Button variant={'outline-light'} className="ml-2">Выйти</Button>
            </Nav>
          ) : (
            <Nav className='me-auto' style={{ color: 'white' }}>
              <Button variant={'outline-light'} onClick={() => user.setIsAuth(true)}>
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
