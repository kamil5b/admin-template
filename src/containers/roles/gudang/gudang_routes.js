import React from 'react';

const Barang = React.lazy(() => import('./barang/TableBarang'))
const FormBarang = React.lazy(() => import('./barang/FormBarang'))
const Stock = React.lazy(() => import('./stock/StockPage'))
const Demands = React.lazy(() => import('./demands/TableDemands'))
const Retur = React.lazy(() => import('src/views/table/retur/TableRetur'))

const gudang_routes = [
  { path: '/', exact: true, name: 'Home', component: Demands },
  { path: '/dashboardhome', name: 'Dashboard', component: Demands },
  { path: '/barang', name: 'Barang', component: Barang, exact: true },
  { path: '/barang/form', name: 'Barang', component: FormBarang, exact: true },
  { path: '/stock', name: 'Stock', component: Stock, exact: true },
  { path: '/demands', name: 'Gudang', component: Demands, exact: true },
  { path: '/retur', name: 'Retur', component: Retur, exact: true },

];

export default gudang_routes;
