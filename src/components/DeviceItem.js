import React from 'react';
import { Card, Col, Dropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import star from '../assets/star.png';

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
        <div className='text-black-50 mt-1 d-flex justify-content-between'>
          <div>{device.name}</div>
          <div className='d-flex align-items-center justify-content-end'>
            <div>{device.rating}</div>
            <Image src={star} width={18} height={18} />
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
