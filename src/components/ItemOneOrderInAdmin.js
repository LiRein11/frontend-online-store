import React from 'react';
import { Button, Col, ListGroup, Modal, NavLink, Row } from 'react-bootstrap';
import { fetchChangeStatusOrder, fetchDeleteOrder } from '../http/ordersAPI';
import { ORDER_ROUTE } from '../utils/consts';

const ItemOneOrderInAdmin = ({ id, complete, mobile, createdAt, updatedAt, userId, reRender }) => {
  const [modalDelete, setShowDelete] = React.useState(false);
  const [modalStatus, setShowStatus] = React.useState(false);

  // Удаление модалки
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const deleteOrder = () => {
    fetchDeleteOrder({ id }).then(() => {
      setShowStatus(false);
      setTimeout(() => {
        reRender();
      }, 250);
    });
  };

  // Статус модалки
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = () => setShowStatus(true);
  const changeStatusOrder = () => {
    fetchChangeStatusOrder({ complete: !complete, id }).then(() => {
      setShowStatus(false);
      setTimeout(() => {
        reRender();
      }, 250);
    });
  };

  // Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
    };
    return date.toLocaleString('en-US', options);
  };

  return (
    <>
      <ListGroup.Item className='mt-3' key={id}>
        <Row>
          <Col md={8}>
            <Row>
              <Col xs={12}>
                <NavLink to={ORDER_ROUTE + `/${id}`}>id: {id}</NavLink>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                Phone: <a href={`tel:${mobile}`}>{mobile}</a>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>Order created: {formatDate(createdAt)}</Col>
            </Row>
            {complete ? (
              <Row>
                <Col xs={12}>Order completed: {formatDate(updatedAt)}</Col>
              </Row>
            ) : (
              false
            )}
            <Row>
              <Col xs={12}>
                {userId ? 'Покупатель: зарегистрирован' : 'Покупатель не зарегистрирован'}
              </Col>
            </Row>
            <Row>
              <Col xs={12}>Status: {complete ? 'Завершено' : 'В процессе'}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row style={{ height: '100%' }} className='d-flex align-items-center'>
              <Col xs={6} className='d-flex justify-content-center'>
                {complete ? (
                  <Button variant='success' onClick={handleShowStatus}>
                    Сделать не завершенным
                  </Button>
                ) : (
                  <Button variant='varning' onClick={handleShowStatus}>
                    Сделать завершенным
                  </Button>
                )}
              </Col>
              <Col xs={6} className='d-flex justify-content-center'>
                <Button variant='danger' onClick={handleShowDelete}>
                  Удалить
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>

      {/*Подтверждение изменения статуса заказа */}
      <Modal show={modalStatus} onHide={handleCloseStatus}>
        <Modal.Header closeButton>
          <Modal.Title>Пожалуйста подтвердите</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы хотите изменить статус этого заказа(id:{id}), c такого
          {complete ? "'Завершен'" : "'В процессе'"} на такой
          {complete ? "'В процессе'" : "'Завершен'"}?
          <br />
          <br />
          Data:
          <ul>
            <li>mobile: {mobile}</li>
            <li>Order CreatedAt: {formatDate(createdAt)}</li>
            {complete ? `Заказ завершен: ${formatDate(updatedAt)}` : false}
            <li>Status: {complete ? 'Завершен' : 'В процессе'}</li>
            <li>{userId ? 'Покупатель зарегистрирован' : 'Покупатель не зарегистрирован'}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseStatus}>
            Закрыть
          </Button>
          <Button variant='primary' onClick={changeStatusOrder}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Подтверждение удаления заказа */}
      <Modal show={modalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Пожалуйста подтвердите</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы хотите удалить этот заказ(id:{id})?
          <br />
          <br />
          Data:
          <ul>
            <li>mobile:{mobile}</li>
            <li>Order CreatedAt:{formatDate(createdAt)}</li>
            {complete ? `Заказ завершен: ${formatDate(updatedAt)}` : false}
            <li>Status: {complete ? 'Завершено' : 'В процессе'}</li>
            <li>{userId ? 'Покупатель зарегистрирован' : 'Покупатель не зарегистрирован'}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDelete}>
            Закрыть
          </Button>
          <Button variant='primary' onClick={deleteOrder}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemOneOrderInAdmin;
