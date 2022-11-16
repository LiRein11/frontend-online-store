import React, { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { sendOrder } from '../http/ordersAPI';
import { SHOP_ROUTE } from '../utils/consts';

const Ordering = () => {
  const { basket, user } = useContext(Context);
  const [phone, setPhone] = React.useState(null);
  const navigate = useNavigate();

  const buy = () => {
    let order = {
      mobile: phone,
      basket: basket.Basket,
    };

    if (user.isAuth) {
      order.auth = true;
    }

    sendOrder(order).then((data) => {
      console.log(data);
      basket.setDeleteAllDeviceFromBasket();
      navigate(SHOP_ROUTE);
    });
  };
  return (
    <Container>
      <Form>
        <Form.Control
          placeholder='Введите ваш телефон...'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='mt-1'
        />
      </Form>
      <Row>
        <Col xs={12}>
          <Button variant='secondary' onClick={buy}>
            Buy
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Ordering;
