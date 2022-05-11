import React, { PureComponent } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableCustomer from './table/TableCustomer'
import TableToko from './table/TableToko'

const TokoCustomer = () => {
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3>Tabel Toko</h3>
                        </CCardHeader>
                        <CCardBody>
                            <TableToko/>
                        </CCardBody>
                    </CCard>
                </CCol>
                
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3>Tabel Customer</h3>
                        </CCardHeader>
                        <CCardBody>
                            <TableCustomer/>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
                
        </>
    )
    
}

export default TokoCustomer
