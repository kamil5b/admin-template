import React from 'react'
import CIcon from '@coreui/icons-react'

const gudang_nav =  [
  
  {
    _tag: 'CSidebarNavItem',
    name: 'Demands',
    to: '/demands', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Stock',
    to: '/stock', 
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Retur',
    to: '/retur', 
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Barang',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tabel Barang',
        to: '/barang',
        icon: 'cil-justify-left',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Form Input Barang',
        to: '/barang/form',
        icon: 'cil-justify-left',
      }
      
    ]
  },
]

export default gudang_nav
