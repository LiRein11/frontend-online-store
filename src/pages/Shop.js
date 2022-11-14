import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

const Shop = observer(() => {
  const { device } = React.useContext(Context);

  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 3).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  React.useEffect(() => {
    if (device.selectedType === 'Все') {
      fetchDevices(null, device.selectedBrand.id, device.page, 3).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    } else {
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
    }
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row>
        <Col md={3} className='mt-2'>
          <TypeBar />
        </Col>
        <Col md={9} className='mt-2'>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
