import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
import supervisor_routes from './roles/supervisor/supervisor_routes'
import salesman_routes from './roles/salesman/salesman_routes'
import gudang_routes from './roles/gudang/gudang_routes'
import penjualan_routes from './roles/penjualan/penjualan_routes'
import pembelian_routes from './roles/pembelian/pembelian_routes'
import penagihan_routes from './roles/penagihan/penagihan_routes'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
  let router = routes
  if(props.user.role == "SUPERVISOR") {
    router = supervisor_routes
  }
  if(props.user.role == "SALESMAN") {
    router = salesman_routes
  }
  
  if(props.user.role == "GUDANG") {
    router = gudang_routes
  }
  
  if(props.user.role == "PENJUALAN") {
    router = penjualan_routes
  }
  
  if(props.user.role == "PEMBELIAN") {
    router = pembelian_routes
  }
  
  if(props.user.role == "PENAGIHAN") {
    router = penagihan_routes
  }
  
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {router.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={prop => (
                    <CFade>
                      <route.component user={props.user} {...prop} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboardhome" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
