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

  setBasket(device) {
    // const checkDeviceInBasket = this._basket.findIndex((device) => device.id === item.id);
    // if (checkDeviceInBasket < 0) {
    //   this._basket = [...this._basket, { count: 1, ...item }];
    //   let totalPrice = 0;
    //   this._basket.forEach((device) => (totalPrice += Number(device.price * device.count)));
    //   this._totalPrice = totalPrice;
    // }

    // if (!isAuth) {
    //   localStorage.setItem('basket', JSON.stringify(this._basket));
    // }
    this._basket = [...this._basket, {...device }];
    this._totalPrice = this._totalPrice + device.price;
  }

  async setDeleteDeviceFromBasket(device){
    await deleteDeviceFromBasket(device.id).then(()=>
    this._basket = this._basket.find(item => item.id !== device.id)) 
  }

  get Basket() {
    return this._basket;
  }

  get Price() {
    return this._totalPrice;
  }
}
