import React from 'react'
import CIcon from '@coreui/icons-react'
/**
 * 
const pembelian_routes = [
  { path: '/', exact: true, name: 'Tabel Pembelian', component: TabelPembelian },
  { path: '/dashboardhome', exact: true, name: 'Tabel Pembelian', component: TabelPembelian },
  { path: '/stock', exact: true, name: 'Stock', component: Stock },
  { path: '/form', exact: true, name: 'Form Pembelian', component: FormPembelian },
  { path: '/faktur', exact: true, name: 'Faktur', component: Faktur },
  { path: '/barang', exact: true, name: 'Tabel Barang', component: Barang },
];
 */
const pembelian_nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Pembelian',
    to: '/',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'Pembelian',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Form Pembelian',
    to: '/form', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Faktur',
    to: '/faktur', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Toko',
    to: '/toko', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Demands',
    to: '/demands', 
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
    name: 'Tabel Barang',
    to: '/barang', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Form Barang',
    to: '/barang/form', 
  }
]

export default pembelian_nav
