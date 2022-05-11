import React from 'react'
import CIcon from '@coreui/icons-react'
/**
 * 
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

];
 */
const supervisor_nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Rekap',
    to: '/dashboardhome',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'Home',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Faktur',
    to: '/faktur', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customer',
    to: '/customer', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Toko',
    to: '/toko', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Giro',
    to: '/giro', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Stock',
    to: '/stock', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Barang',
    to: '/barang', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pembelian',
    to: '/pembelian', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Penjualan',
    to: '/penjualan', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hutang',
    to: '/hutang', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Piutang',
    to: '/piutang', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profit',
    to: '/profit', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sales',
    to: '/sales', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Retur',
    to: '/retur', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Demands',
    to: '/demands', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pengajuan',
    to: '/pengajuan', 
  },
  
]

export default supervisor_nav
