import { makeAutoObservable } from 'mobx';
import { deleteDeviceFromBasket } from '../http/deviceAPI';

export default class BasketStore {
  constructor() {
    this._basket = [];
    this._totalPrice = 0;
    makeAutoObservable(this);
  }

  addBasket() {
    this._basket = [this._basket];
  }

  setOneBasket(basket, isAuth = false) {
    if (isAuth === true) {
      basket.map((obj) => {
        this._basket = [...this._basket, obj];
        this._totalPrice = this._totalPrice + obj.device.price;
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
  async setDeleteDeviceFromBasket(device, isAuth = false, i) {
    if (isAuth === true) {
      await deleteDeviceFromBasket(device.id).then(
        () => (this._basket = this._basket.filter((item) => item.id !== device.id)),
        (this._totalPrice = this._totalPrice - device.device.price),
      );
    } else if (isAuth === false) {
      this._basket = this._basket.filter((item, ind) => ind !== i);
      this._totalPrice = this._totalPrice - device.price;
      localStorage.setItem('basket', JSON.stringify(this._basket));
    }
  }

  setDeleteAllDeviceFromBasket() {
    this._totalPrice = 0;
    return (this._basket = []);
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
