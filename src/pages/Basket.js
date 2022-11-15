import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import uuid from 'react-uuid';
import { Context } from '..';
import ItemInBasket from '../components/ItemInBasket';

const Basket = observer(() => {
  const { basket, user } = useContext(Context);
  if (basket.Basket.length === 0) {
    return (
      <div className='d-flex flex-column align-items-center mt-3'>
        <div className='text-center mt-3' style={{ fontSize: 28 }}>
          <b>Empty shopping basket</b>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <h1 className='text-center mt-2'>Ваша корзина</h1>
      <Row>
        {user.isAuth
          ? basket.Basket.map((obj, i) => (
              <div key={uuid()}>  
                <ItemInBasket obj={obj} />
                <Button
                  variant='outline-dark'
                  onClick={() => basket.setDeleteDeviceFromBasket(obj, true)}>
                  Удалить
                </Button>
              </div>
            ))
          : basket.Basket.map((obj, i) => (
              <div key={i}>
                <ItemInBasket obj={obj} />
                <Button
                  variant='outline-dark'
                  onClick={() => basket.setDeleteDeviceFromBasket(obj, false, i)}>
                  Удалить
                </Button>
              </div>
            ))}
        {}
      </Row>
    </Container>
  );
});

export default Basket;
