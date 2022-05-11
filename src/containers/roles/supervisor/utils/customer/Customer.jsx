import React, { PureComponent } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableCustomer from './table/TableCustomer'
const Customer = () => {
    return (
        <CCard>
            <CCardHeader>
                <h3>Tabel Customer</h3>
            </CCardHeader>
            <CCardBody>
                <TableCustomer/>
            </CCardBody>
        </CCard>
    )
    
}

export default Customer
