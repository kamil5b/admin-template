import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import nav from './_nav'
import supervisor_nav from './roles/supervisor/supervisor_nav'
import salesman_nav from './roles/salesman/salesman_nav'
import gudang_nav from './roles/gudang/gudang_nav'
import penjualan_nav from './roles/penjualan/penjualan_nav'
import pembelian_nav from './roles/pembelian/pembelian_nav'
import penagihan_nav from './roles/penagihan/penagihan_nav'

const TheSidebar = (props) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  let navigation = nav
  if(props.user.role == "SUPERVISOR"){
    navigation = supervisor_nav
  }
  if(props.user.role == "SALESMAN"){
    navigation = salesman_nav
  }
  if(props.user.role == "GUDANG"){
    navigation = gudang_nav
  }
  if(props.user.role == "PENJUALAN"){
    navigation = penjualan_nav
  }
  if(props.user.role == "PEMBELIAN"){
    navigation = pembelian_nav
  }
  if(props.user.role == "PENAGIHAN"){
    navigation = penagihan_nav
  }
  
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name={'cilSettings'}
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="cilSettings"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
