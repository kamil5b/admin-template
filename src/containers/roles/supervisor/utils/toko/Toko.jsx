import React, { PureComponent } from 'react'
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
        <CCard>
            <CCardHeader>
                <h3>Tabel Toko</h3>
            </CCardHeader>
            <CCardBody>
                <TableToko/>
            </CCardBody>
        </CCard>
                
    )
    
}

export default Toko
