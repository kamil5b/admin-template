import React, { PureComponent } from 'react'
import InputToko from './input/InputToko'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableToko from './table/TableToko'
const Toko = () => {
    return (
        <>
            <CRow>
                <CCol xl="5">
                    <CCard>
                        <CCardHeader>
                            <h3>Input Toko</h3>
                        </CCardHeader>
                        <CCardBody>
                            <InputToko/>
                        </CCardBody>
                    </CCard>
                </CCol>
                
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
            </CRow>
                
        </>
    )
    
}

export default Toko
