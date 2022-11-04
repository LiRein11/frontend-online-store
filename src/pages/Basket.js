import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import ItemInBasket from '../components/ItemInBasket';

const Basket = observer(() => {
  const { basket } = useContext(Context);
  console.log(basket)
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
    <Row>
      {basket.Basket.map((device) => (
        <ItemInBasket key={device.id} device={device} />
      ))}
    </Row>
  );
});

export default Basket;
