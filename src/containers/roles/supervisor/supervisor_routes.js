import React from 'react';

const DashboardHome = React.lazy(() => import('./dashboardhome/DashboardHome'));
const Faktur = React.lazy(() => import('./faktur/TabelFaktur'));
const Stock = React.lazy(() => import('./stock/StockPage'));
const Barang = React.lazy(() => import('./table/barang/TableBarang'));
const Demands = React.lazy(() => import('./table/demands/TableDemands'));
const Pengajuan = React.lazy(() => import('./table/pengajuan/TablePengajuan'));
const Pembelian = React.lazy(() => import('./table/pembelian/TablePembelian'));
const Hutang = React.lazy(() => import('./table/pembelian/hutang/TableHutang'));
const Penjualan = React.lazy(() => import('./table/penjualan/TablePenjualan'));
const Piutang = React.lazy(() => import('./table/penjualan/piutang/TablePiutang'));
const Sales = React.lazy(() => import('./table/sales/TableSales'));
const Profit = React.lazy(() => import('./table/profit/TableProfit'));
const Retur = React.lazy(() => import('./table/retur/TableRetur'));
const Customer = React.lazy(() => import('./utils/customer/Customer'));
const Toko = React.lazy(() => import('./utils/toko/Toko'));
const Giro = React.lazy(() => import('./utils/giro/Giro'));

const supervisor_routes = [
  { path: '/', exact: true, name: 'Home', component: DashboardHome },
  { path: '/dashboardhome', name: 'Dashboard', component: DashboardHome },
  { path: '/faktur', name: 'Faktur', component: Faktur },
  { path: '/stock', name: 'Stock', component: Stock },
  { path: '/barang', name: 'Barang', component: Barang },
  { path: '/pembelian', name: 'Pembelian', component: Pembelian },
  { path: '/penjualan', name: 'Penjualan', component: Penjualan },
  { path: '/profit', name: 'Profit', component: Profit },
  { path: '/retur', name: 'Retur', component: Retur },
  { path: '/customer', name: 'Customer', component: Customer },
  { path: '/toko', name: 'Toko', component: Toko },
  { path: '/giro', name: 'Giro', component: Giro },
  { path: '/demands', name: 'Demands', component: Demands },
  { path: '/pengajuan', name: 'Pengajuan', component: Pengajuan },
  { path: '/sales', name: 'Sales', component: Sales },
  { path: '/hutang', name: 'Hutang', component: Hutang },
  { path: '/piutang', name: 'Piutang', component: Piutang },

];

export default supervisor_routes;
