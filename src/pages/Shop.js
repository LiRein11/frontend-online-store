import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import TypeBar from '../components/TypeBar';

const Shop = () => {
  return (
    <Container>
      <Row>
        <Col md={3} className='mt-2'>
          <TypeBar />
        </Col>
        <Col md={9} className='mt-2'>
          <BrandBar />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
