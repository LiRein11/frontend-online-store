import React, { useContext } from 'react';
import { Button, Card, Col, Container, Dropdown, Image, Row } from 'react-bootstrap';
import BigStar from '../assets/BigStar.png';
import { useParams } from 'react-router-dom';
import { addDeviceToBasket, addRating, checkRating, fetchOneDevice } from '../http/deviceAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import RatingStars from '../components/Rating';

const DevicePage = observer(() => {
  const { user, basket } = useContext(Context);
  const [device, setDevice] = React.useState({ info: [] });
  const { id } = useParams();
  const [resRate, setResRate] = React.useState('');
  const [isAccessRating, setIsAccessRating] = React.useState(false);

  React.useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    if (user.isAuth) {
      checkRating({ deviceId: id }).then((res) => setIsAccessRating(res.allow));
    }
  }, [id, resRate]);

  const addDeviceInBasket = (device) => {
    if (user.isAuth) {
      addDeviceToBasket(device).then(() => basket.setBasket(device, true));
    } else if (user.isAuth===false){
      basket.setBasket(device, false);
    }
  };

  const clickRating = (rate) => {
    addRating({ rate, deviceId: id }).then((res) => {
      setResRate(res);
    });
  };

  return (
    <Container className='mt-3 '>
      <Row className='d-flex'>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Row className='d-flex flex-column align-items-center'>
            <h2>{device?.name}</h2>
            <div
              className='d-flex align-items-center justify-content-center'
              style={{
                background: `url(${BigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: 'cover',
                fontSize: 64,
              }}>
              {device?.rating || 0}
            </div>
            <RatingStars
              clickRating={clickRating}
              ratingVal={device?.rating || 0}
              isAuth={user.isAuth}
              isAccessRating={isAccessRating}
            />
            {resRate}
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
            <h3>????: {device?.price}??????.</h3>
            <Button variant={'outline-dark'} onClick={() => addDeviceInBasket(device)}>
              ???????????????? ?? ??????????????
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className='d-flex flex-column mt-3'>
        <h1>????????????????????????????:</h1>
        {device?.info.map((el, i) => (
          <Row
            key={el.id}
            style={{ background: i % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {el.title}: {el.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default DevicePage;
