import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';

const ItemInBasket = observer(({ obj}) => {
  const navigate = useNavigate();

  return (
    <Col md={3} className='mt-3'>
      <Card
        style={{ width: 150, cursor: 'pointer' }}
        border={'light'}
        onClick={() => navigate(DEVICE_ROUTE + '/' + obj.device?.id)}>
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + obj.device?.img} />
        <div className='text-black-50 mt-1 d-flex justify-content-between'>
          <div>Samsung..</div>
          <div className='d-flex align-items-center'>
            <div>{obj.device?.rating}</div>
            <Image src={star} width={18} height={18} />
          </div>
        </div>
      </Card>
    </Col>
  );
});

export default ItemInBasket;
