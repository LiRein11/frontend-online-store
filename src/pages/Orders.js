import React from 'react';
import { Col, Container, Dropdown, ListGroup, Pagination, Row, Spinner } from 'react-bootstrap';
import ItemOneOrderInAdmin from '../components/ItemOneOrderInAdmin';
import { fetchOrders } from '../http/ordersAPI';

const Orders = () => {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [count, setCount] = React.useState(0);
  const [filter, setFilter] = React.useState('Все');
  const [rerender, setRerender] = React.useState(false);

  // const limit = 5;
  // const pageCount = Math.ceil(Number(count) / limit);
  // const pages = [];


  // { limit, page: 1 }
  React.useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
      setLoading(false);
      // setCount(data.count);
    });
  }, []);


  // { limit, page: currentPage }
  // React.useEffect(() => {
  //   setLoading(true);
  //   fetchOrders().then((data) => {
  //     setOrders(data);
  //     setLoading(false);
  //   });
  // }, [currentPage]);


  // limit, page: currentPage,
  React.useEffect(() => {
    setLoading(true);
    fetchOrders({  complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      // setCount(data.count);
      // setCurrentPage(1);
    });
  }, [filter]);

  //Ререндер после изменения статуса или удаления заказа
  // limit, page: currentPage,
  React.useEffect(() => {
    setLoading(true);
    fetchOrders({  complete: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
      // setCount(data.count);
      // setCurrentPage(1);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  if (loading) {
    return <Spinner animation='grow' />;
  }

  // for (let number = 1; number < pageCount + 1; number++) {
  //   pages.push(
  //     <Pagination.Item
  //       key={number}
  //       active={number === currentPage}
  //       onClick={() => setCurrentPage(number)}>
  //       {number}
  //     </Pagination.Item>,
  //   );
  // }

  return (
    <Container className='d-flex flex-column'>
      <Row>
        <Col xs={12} className='mt-3 d-flex justify-content-center align-items-center'>
          <div className='mr-3'>Filter:</div>
          <Dropdown>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              {filter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {filter === 'Все' ? (
                <Dropdown.Item disabled>Все</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter('Все')}>Все</Dropdown.Item>
              )}
              {filter === 'Завершено' ? (
                <Dropdown.Item disabled>Завершено</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter('Завершено')}>Завершено</Dropdown.Item>
              )}
              {filter === 'Не завершено' ? (
                <Dropdown.Item disabled>Не завершено</Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => setFilter('Не завершено')}>
                  Не завершено
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <ListGroup>
        {orders.rows?.map(({ id, complete, mobile, createdAt, updatedAt, userId }) => (
          <ItemOneOrderInAdmin
            key={id}
            id={id}
            complete={complete}
            mobile={mobile}
            createdAt={createdAt}
            updatedAt={updatedAt}
            userId={userId}
            reRender={reRender}
          />
        ))}
      </ListGroup>
      {/* <Pagination size='sm' className='mt-4 mb-4' style={{ margin: '0 auto' }}>
        {pages}
      </Pagination> */}
    </Container>
  );
};

export default Orders;
