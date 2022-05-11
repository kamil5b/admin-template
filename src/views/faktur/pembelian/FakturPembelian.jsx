import React, { useState,useEffect } from 'react'
import InputFaktur from './input/InputFaktur'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody
} from '@coreui/react';

import TableFakturPembelian from './table/TableFakturPembelian'
const FakturPembelian = () => {
    
    return (
        <>
            <CRow>
                <CCol md="4">
                    <CCard>
                        <CCardHeader>
                            <h3>Input Faktur Pembelian</h3>
                        </CCardHeader>
                        <CCardBody>
                            <InputFaktur/>
                        </CCardBody>
                    </CCard>
                </CCol>
                
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3>Tabel Faktur Pembelian</h3><br/>
                            
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

export default FakturPembelian
