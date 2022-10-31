import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { Context } from '../../index';

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  console.log(info);

  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]); // Разворачиваем старый массив, затем добавляем новый объект
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  }; // Эта функция будет создаваться тогда, когда выбран файл на компьютере

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info)); // Передавать массив на бек нельзя, поэтому необходимо спарсить массив в строку, а на бэке стока обратно развернется в массив
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal size='lg' centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Добавить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className='mt-3'
            placeholder='Введите название устройства'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Введите стоимость устройства'
            type='number'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control className='mt-3' type='file' onChange={selectFile} />
          <hr />
          <Button variant={'outline-dark'} onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className='mt-4' key={i.number}>
              <Col md={4}>
                <Form.Control
                  placeholder='Введите название свойства'
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder='Введите описание свойства'
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Закрыть
        </Button>
        <Button variant='outline-success' onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
