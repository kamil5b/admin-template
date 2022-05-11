import React from 'react';

const TabelPembelian = React.lazy(() => import('src/views/table/pembelian/TablePembelian'));
const Stock = React.lazy(() => import('./stock/StockPage'));
const FormPembelian = React.lazy(() => import('src/views/form/pembelian/FormPembelian'));
const Faktur = React.lazy(() => import('src/views/faktur/pembelian/FakturPembelian'));
const TableBarang = React.lazy(() => import('src/views/table/barang/TableBarang'));
const FormBarang = React.lazy(() => import('src/views/form/barang/FormBarang'));
const Giro = React.lazy(() => import('src/views/utils/giro/Giro'));
const Toko = React.lazy(() => import('src/views/utils/toko/Toko'));
const Demands = React.lazy(() => import('src/views/table/demands/TableDemands'));

const pembelian_routes = [
  { path: '/', exact: true, name: 'Tabel Pembelian', component: TabelPembelian },
  { path: '/dashboardhome', exact: true, name: 'Tabel Pembelian', component: TabelPembelian },
  { path: '/stock', exact: true, name: 'Stock', component: Stock },
  { path: '/form', exact: true, name: 'Form Pembelian', component: FormPembelian },
  { path: '/faktur', exact: true, name: 'Faktur', component: Faktur },
  { path: '/barang', exact: true, name: 'Tabel Barang', component: TableBarang },
  { path: '/barang/form', exact: true, name: 'Form Barang', component: FormBarang },
  { path: '/giro', exact: true, name: 'Giro', component: Giro },
  { path: '/toko', exact: true, name: 'Toko', component: Toko },
  { path: '/demands', exact: true, name: 'Demands', component: Demands },
];

export default pembelian_routes;
