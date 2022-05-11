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
    name: 'Toko & Customer',
    to: '/dashboardhome',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'Home',
    }
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Piutang',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Table Piutang',
        to: '/piutang', 
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Record Piutang',
        to: '/piutang/record', 
      }
    ]
  }
]

export default supervisor_nav
