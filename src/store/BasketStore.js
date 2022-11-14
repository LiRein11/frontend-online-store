import { makeAutoObservable } from 'mobx';
import { deleteDeviceFromBasket } from '../http/deviceAPI';

export default class BasketStore {
  constructor() {
    this._basket = [];
    this._totalPrice = 0;
    makeAutoObservable(this);
  }

  // setBasket(item, isAuth = false) {
  //   const checkDeviceInBasket = this._basket.findIndex((device) => device.id === item.id);
  //   if (checkDeviceInBasket < 0) {
  //     this._basket = [...this._basket, { count: 1, ...item }];
  //     let totalPrice = 0;
  //     this._basket.forEach((device) => (totalPrice += Number(device.price * device.count)));
  //     this._totalPrice = totalPrice;
  //   }

  //   if (!isAuth) {
  //     localStorage.setItem('basket', JSON.stringify(this._basket));
  //   }
  // }

  addBasket() {
    this._basket = [this._basket];
  }

  setOneBasket(basket, isAuth = false) {
    if (isAuth === true) {
      basket.map((el) => {
        this._basket = [...this._basket, el];
        this._totalPrice = this._totalPrice + el.device.price;
      });
    }
    if (isAuth === false) {
      basket?.map((el) => {
        this._basket = [...this._basket, el];
        this._totalPrice = this._totalPrice + el.price;
      });
      localStorage.setItem('basket', JSON.stringify(this._basket));
    }
  }

  setBasket(device, isAuth = false) {
    if (isAuth === true) {
      this._basket = [...this._basket, { ...device }];
      this._totalPrice = this._totalPrice + device.price;
    }
    if (isAuth === false) {
      this._basket = [...this._basket, { ...device }];
      this._totalPrice = this._totalPrice + device.price;

      localStorage.setItem('basket', JSON.stringify(this._basket));
    }
  }
  async setDeleteDeviceFromBasket(device, i, isAuth = false) {
    if (isAuth === true) {
      await deleteDeviceFromBasket(device.id).then(
        () => (this._basket = this._basket.filter((item) => item.id !== device.id)),
        (this._totalPrice = this._totalPrice - device.device.price),
      );
    } else if (isAuth === false) {
      this._basket = this._basket.filter((item) => item[i] !== device.price);
      this._totalPrice = this._totalPrice - device[i].price;
      localStorage.setItem('basket', JSON.stringify(this._basket));
    }
  }

  setResetBasket() {
    this._basket = [];
    this._totalPrice = 0;
  }

  get Basket() {
    return this._basket;
  }

  get Price() {
    return this._totalPrice;
  }
}
