import React, { PureComponent } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react'
import TableGiro from './table/TableGiro'
const Giro = () => {
    return (
        <CCard>
            <CCardHeader>
                <h3>Tabel Giro</h3>
            </CCardHeader>
            <CCardBody>
                <TableGiro/>
            </CCardBody>
        </CCard>
    )
    
}

export default Giro
