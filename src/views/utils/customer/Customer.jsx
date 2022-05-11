import React, { PureComponent } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableCustomer from './table/TableCustomer'
import InputCustomer from './input/InputCustomer'
const Customer = () => {
    return (
        <>
            <CRow>
                <CCol xl="5">
                    <CCard>
                        <CCardHeader>
                            <h3>Input Customer</h3>
                        </CCardHeader>
                        <CCardBody>
                            <InputCustomer/>
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

export default Customer
