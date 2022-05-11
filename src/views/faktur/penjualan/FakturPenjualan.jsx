import React, { PureComponent } from 'react'
import InputFaktur from './input/InputFaktur'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableFakturPenjualan from './table/TableFakturPenjualan'
const FakturPenjualan = () => {
    return (
        <>
            <CRow>
                <CCol md="4">
                    <CCard>
                        <CCardHeader>
                            <h3>Input Faktur Penjualan</h3>
                        </CCardHeader>
                        <CCardBody>
                            <InputFaktur/>
                        </CCardBody>
                    </CCard>
                </CCol>
                
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3>Tabel Faktur Penjualan</h3>
                        </CCardHeader>
                        <CCardBody>
                            <TableFakturPenjualan/>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
                
        </>
    )
    
}

export default FakturPenjualan
