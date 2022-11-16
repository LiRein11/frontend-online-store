import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import DevicePage from './pages/DevicePage';
import Shop from './pages/Shop';
import Orders from './pages/Orders';
import OneOrder from './pages/OneOrder';
import Ordering from './pages/Ordering';

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  ORDER_ROUTE,
  ORDERING_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/consts';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: ORDER_ROUTE,
    Component: Orders,
  },
  {
    path: ORDER_ROUTE + '/:id',
    Component: OneOrder,
  },
];

export const publicRoutes = [
  {
    path: ORDERING_ROUTE,
    Component: Ordering,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DevicePage,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];
