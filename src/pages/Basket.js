import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Context } from '..';
import ItemInBasket from '../components/ItemInBasket';
import { deleteDeviceFromBasket } from '../http/deviceAPI';

const Basket = observer(() => {
  const { basket } = useContext(Context);
  console.log(basket);
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
      <Row>
        {basket.Basket.map((device) => (
          <div>
            <ItemInBasket key={device.id} device={device} />
            <Button variant='outline-dark' onClick={() => basket.setDeleteDeviceFromBasket(device)}>
              Удалить
            </Button>
          </div>
        ))}
      </Row>
    </Container>
  );
});

export default Basket;
