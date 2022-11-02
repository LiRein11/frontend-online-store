import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import ItemInBasket from '../components/ItemInBasket';

const Basket = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row>
      {device.devices.map((device) => (
        <ItemInBasket key={device.id} device={device} />
      ))}
    </Row>
  );
});

export default Basket;
