import React, { PureComponent } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableGiro from './table/TableGiro'
import InputGiro from './input/InputGiro'
const Giro = () => {
    return (
        <>
            <CRow>
                <CCol xl="5">
                    <CCard>
                        <CCardHeader>
                            <h3>Input Giro</h3>
                        </CCardHeader>
                        <CCardBody>
                            <InputGiro/>
                        </CCardBody>
                    </CCard>
                </CCol>
                
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3>Tabel Giro</h3>
                        </CCardHeader>
                        <CCardBody>
                            <TableGiro/>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
                
        </>
    )
    
}

export default Giro
