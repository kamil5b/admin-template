import React from 'react';

const TabelPenjualan = React.lazy(() => import('src/views/table/penjualan/TablePenjualan'));
const Stock = React.lazy(() => import('src/views/stock/StockPage'));
const FormPenjualan = React.lazy(() => import('src/views/form/penjualan/FormPenjualan'));
const Faktur = React.lazy(() => import('./faktur/FakturPenjualan'));
const Barang = React.lazy(() => import('./table/TableBarang'));
const Giro = React.lazy(() => import('src/views/utils/giro/Giro'));
const Customer = React.lazy(() => import('src/views/utils/customer/Customer'));

const penjualan_routes = [
  { path: '/', exact: true, name: 'Tabel Penjualan', component: TabelPenjualan },
  { path: '/dashboardhome', exact: true, name: 'Tabel Penjualan', component: TabelPenjualan },
  { path: '/stock', exact: true, name: 'Stock', component: Stock },
  { path: '/form', exact: true, name: 'Form Penjualan', component: FormPenjualan },
  { path: '/faktur', exact: true, name: 'Faktur', component: Faktur },
  { path: '/barang', exact: true, name: 'Tabel Barang', component: Barang },
  { path: '/giro', exact: true, name: 'Giro', component: Giro },
  { path: '/customer', exact: true, name: 'Customer', component: Customer },
];

export default penjualan_routes;
