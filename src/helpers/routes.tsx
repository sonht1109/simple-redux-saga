import Home from 'containers/Home';
import React from 'react';

export interface ItemRoute {
  name: string;
  private: boolean;
  component?: Function;
  path?: string;
  child?: ItemRoute[];
}

const ROUTES = [
  {
    name: 'Trang chủ',
    private: false,
    component: () => <Home />,
    path: '/',
  },
];

export default ROUTES;
