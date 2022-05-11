import React from 'react';

const Barang = React.lazy(() => import('./barang/TableBarang'))
const Stock = React.lazy(() => import('./stock/SummaryStock'))
const Sales = React.lazy(() => import('./sales/TableSales'))

const salesman_routes = [
  { path: '/', exact: true, name: 'Home', component: Sales },
  { path: '/dashboardhome', name: 'Dashboard', component: Sales },
  { path: '/barang', name: 'Barang', component: Barang, exact: true },
  { path: '/stock', name: 'Stock', component: Stock, exact: true },
  { path: '/sales', name: 'Sales', component: Sales, exact: true },

];

export default salesman_routes;
