import React from 'react'
import CIcon from '@coreui/icons-react'
/**
 * 
const penjualan_routes = [
  { path: '/', exact: true, name: 'Tabel Penjualan', component: TabelPenjualan },
  { path: '/dashboardhome', exact: true, name: 'Tabel Penjualan', component: TabelPenjualan },
  { path: '/stock', exact: true, name: 'Stock', component: Stock },
  { path: '/form', exact: true, name: 'Form Penjualan', component: FormPenjualan },
  { path: '/faktur', exact: true, name: 'Faktur', component: Faktur },
  { path: '/barang', exact: true, name: 'Tabel Barang', component: Barang },
];
 */
const penjualan_nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Penjualan',
    to: '/',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'Penjualan',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Form Penjualan',
    to: '/form', 
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
  }
]

export default penjualan_nav
