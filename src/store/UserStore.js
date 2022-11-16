import { makeAutoObservable } from 'mobx';
import jwt_decode from 'jwt-decode';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  checkValidToken() {
    let isExpired = false;
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      isExpired = true;
    }

    return isExpired;
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  } // Экшены - функции, который каким-либо образом изменяют состояние

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  } // Геттеры - нужны для того, чтобы получать переменные из состояния

  get user() {
    return this._user;
  }
}
