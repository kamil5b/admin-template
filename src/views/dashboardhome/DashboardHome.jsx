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
import TableSummaryPenjualan from '../widgets/TableSummaryPenjualan';
import WidgetPenjualan from '../widgets/WidgetPenjualan';
import TableSummaryTanggalBulanan from '../widgets/labarugi/summary/table/TableSummaryTanggalBulanan';
import TableSummaryBarangBulanan from '../widgets/labarugi/summary/table/TableSummaryBarangBulanan';
import SummaryBulanan from '../widgets/labarugi/summary/SummaryBulanan';
import TableSummaryTanggalMingguan from '../widgets/labarugi/summary/table/TableSummaryTanggalMingguan';
import TableSummaryBarangMingguan from '../widgets/labarugi/summary/table/TableSummaryBarangMingguan';
import SummaryMingguan from '../widgets/labarugi/summary/SummaryMingguan';
import TableSummaryTanggalHarian from '../widgets/labarugi/summary/table/TableSummaryTanggalHarian';
import TableSummaryBarangHarian from '../widgets/labarugi/summary/table/TableSummaryBarangHarian';
import SummaryHarian from '../widgets/labarugi/summary/SummaryHarian';
import TableSummaryBarangPembelian from '../widgets/TableSummaryBarangPembelian';
import InputFaktur from '../faktur/penjualan/input/InputFaktur'
import SummaryTotalPenjualan from './SummaryTotalPenjualan'
import SummaryTotalPembelian from './SummaryTotalPembelian'

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
