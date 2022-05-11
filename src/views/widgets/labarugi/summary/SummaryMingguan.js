import React, { PureComponent, useEffect, useState } from 'react'

import {
    CWidgetDropdown,
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SummaryTanggal from "src/utils/SummaryTanggal"
import ChartLineSimple from 'src/views/charts/ChartLineSimple'
  
const SummaryMingguan = () => {

    var data = SummaryTanggal('mingguan')

    return (
        <>
        
        <CRow>
      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-primary"
          header={data.datapenjualan.TotalPenjualan.toString()}
          text="Penjualan"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="6">
        <CWidgetDropdown
          color="gradient-warning"
          header={data.datapembelian.TotalPembelian.toString()}
          text="Pembelian"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="rgba(255,255,255,.2)"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Members"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol>
    </CRow>
    </>
    )
    
}

export default SummaryMingguan