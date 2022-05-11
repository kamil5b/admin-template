import {React, useState} from 'react'

import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CLabel,
    CInput,
    CButton
} from '@coreui/react'
import SummaryBulanan from '../../../../views/widgets/labarugi/summary/SummaryBulanan';
import SummaryMingguan from '../../../../views/widgets/labarugi/summary/SummaryMingguan';
import SummaryTotalPenjualan from './SummaryTotalPenjualan'
import SummaryTotalPembelian from './SummaryTotalPembelian'
import SummaryHarian from '../../../../views/widgets/labarugi/summary/SummaryHarian';

export default function DashboardHome() {
    const [per, setPer] = useState('hari')
    const [state,setState] = useState('Bulan')
    const [limit, setLimit] = useState(20)
    const dropdown = (
                        <CCol >
                        <CDropdown className="mr-3">
                            <CDropdownToggle split color="secondary" size="lg">
                                <h2>Rekap Per<span>{per}</span></h2>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="right">
                                <CDropdownItem onClick={() => setPer('hari')}>Perhari</CDropdownItem>
                                <CDropdownItem onClick={() => setPer('minggu')}>Peminggu</CDropdownItem>
                                <CDropdownItem onClick={() => setPer('bulan')}>Perbulan</CDropdownItem>
                                <CDropdownItem onClick={() => setPer('tahun')}>Pertahun</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        </CCol>
                    )
    
    const dropdownini = (
        <CDropdown className="mr-3">
                            <CDropdownToggle split color="secondary" size="lg">
                                <h2>Rekap <span>{state}</span> ini</h2>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="right">
                                <CDropdownItem onClick={() => setState('Hari')}>Hari ini</CDropdownItem>
                                <CDropdownItem onClick={() => setState('Minggu')}>Minggu ini</CDropdownItem>
                                <CDropdownItem onClick={() => setState('Bulan')}>Bulan ini</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
    )

    const cardsummary = () => {
        
        if(state=== 'Bulan'){
            return (
                    <SummaryBulanan/>
            )
        }
        if(state=== 'Minggu'){
            return (
                    <SummaryMingguan/>
                    
            )
        }
        if(state=== 'Hari'){
            return (
                    <SummaryHarian/>
                   
            )
        }
        return (<></>)
    }
    
    return (
        <>
            <CCard id="rekap">
                <CCardHeader>
                    {dropdownini}
                </CCardHeader>
                <CCardBody>
                    {cardsummary()}
                </CCardBody>
            </CCard>
            
            <CCard>
                <CCardHeader>
                    <CRow className="justify-content-between">
                        {dropdown}
                    </CRow>
                    
                </CCardHeader>
                <CCardBody> 
                    <CRow>
                        <CCol xl="6">
                            <h3>Penjualan</h3>
                            <SummaryTotalPenjualan props={per} limit={limit}/>
                        </CCol>
                        <CCol xl="6" >
                            <h3>Pembelian</h3>
                            <SummaryTotalPembelian props={per} limit={limit}/>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            
        </> 
    )
}
