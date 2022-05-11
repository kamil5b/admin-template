import React, { PureComponent } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableFakturPenjualan from 'src/views/faktur/penjualan/table/TableFakturPenjualan'
import TableFakturPembelian from 'src/views/faktur/pembelian/table/TableFakturPembelian'
const TabelFaktur = () => {
    return (
        <>
            <CRow>
                <CCol xl="6">
                    <CCard>
                        <CCardHeader>
                            <h3>Tabel Faktur Penjualan</h3>
                        </CCardHeader>
                        <CCardBody>
                            <TableFakturPenjualan/>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xl="6">
                    <CCard>
                        <CCardHeader>
                            <h3>Input Faktur Pembelian</h3>
                        </CCardHeader>
                        <CCardBody>
                            <TableFakturPembelian/>
                        </CCardBody>
                    </CCard>
                </CCol>
                
            </CRow>
                
        </>
    )
    
}

export default TabelFaktur
