import { makeAutoObservable } from 'mobx';

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  } // Экшены - функции, который каким-либо образом изменяют состояние

  setUser(bool) {
    this._isAuth = bool;
  }

  get isAuth() {
    return this._isAuth;
  } // Геттеры - нужны для того, чтобы получать переменные из состояния

  get User() {
    return this._isAuth;
  }
}
