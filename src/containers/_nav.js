import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
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
    _tag: 'CSidebarNavTitle',
    _children: ['Faktur']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Faktur Pembelian',
    to: '/faktur/pembelian',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Icon',
    to: '/icons',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Faktur Penjualan',
    to: '/faktur/penjualan',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Utility']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Toko',
    to: '/toko',
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
    _tag: 'CSidebarNavDropdown',
    name: 'Barang',
    _children: [
      {
      _tag: 'CSidebarNavItem',
      name: 'Form Input Barang',
      to: '/barang/form',
      icon: 'cil-justify-left',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Tabel Barang',
      to: '/barang',
      icon: 'cil-border-all',
    }
  ]
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Tabel']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tabel Retur',
    to: '/retur',
    icon: 'cil-border-all',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Penjualan',
    _children: [
      {
      _tag: 'CSidebarNavItem',
      name: 'Form Input Penjualan',
      to: '/penjualan/form',
      icon: 'cil-justify-left',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Tabel Penjualan',
      to: '/penjualan',
      icon: 'cil-border-all',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Tabel Piutang',
      to: '/piutang',
      icon: 'cil-border-all',
    }
  ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pembelian',
    _children: [
      {
      _tag: 'CSidebarNavItem',
      name: 'Form Input Pembelian',
      to: '/pembelian/form',
      icon: 'cil-justify-left',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Tabel Pembelian',
      to: '/pembelian',
      icon: 'cil-border-all',
    },
    {
      _tag: 'CSidebarNavItem',
      name: 'Tabel Hutang',
      to: '/hutang',
      icon: 'cil-border-all',
    },
  ]
  },
]

export default _nav
