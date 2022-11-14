import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';

const ItemInBasket = observer(({ obj }) => {
  const { user } = React.useContext(Context);
  const navigate = useNavigate();

  return (
    <Col md={3} className='mt-3'>
      <Card
        style={{ width: 150, cursor: 'pointer' }}
        border={'light'}
        onClick={() =>
          navigate(user.isAuth ? DEVICE_ROUTE + '/' + obj.device?.id : DEVICE_ROUTE + '/' + obj.id)
        }>
        <Image
          width={150}
          height={150}
          src={
            user.isAuth
              ? process.env.REACT_APP_API_URL + obj.device?.img
              : process.env.REACT_APP_API_URL + obj.img
          }
        />
        <div className='text-black-50 mt-1 d-flex justify-content-between'>
          <div>{user.isAuth ? obj.device?.name : obj.name}</div>
          <div className='d-flex align-items-center'>
            <div>{user.isAuth ? obj.device?.rating : obj.rating}</div>
            <Image src={star} width={18} height={18} />
          </div>
        </div>
      </Card>
    </Col>
  );
});

export default ItemInBasket;
