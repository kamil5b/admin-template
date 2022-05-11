import React from 'react';

const Piutang = React.lazy(() => import('src/views/table/penjualan/piutang/TablePiutang'));
const RecordPiutang = React.lazy(() => import('src/views/table/penjualan/piutang/RecordPiutang'));
const TokoCustomer = React.lazy(() => import('./utils/tokocustomer/TokoCustomer'));

const supervisor_routes = [
  { path: '/', exact: true, name: 'Toko & Customer', component: TokoCustomer },
  { path: '/dashboardhome', exact: true, name: 'Toko & Customer', component: TokoCustomer },
  { path: '/piutang/record', exact: true, name: 'Piutang', component: RecordPiutang },
  { path: '/piutang', exact: true, name: 'Piutang', component: Piutang },
];

export default supervisor_routes;
