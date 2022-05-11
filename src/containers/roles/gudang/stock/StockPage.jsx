import { 
    CCard, 
    CCardBody, 
    CCardHeader,
    CDropdown,
    CDropdownItem,
    CDropdownToggle,
    CDropdownMenu } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import DetailedStock from './detailed/DetailedStock'
import SummaryStock from './summary/SummaryStock'

const StockPage = () => {
    const [state, setState] = useState('Summary')

    const tableserved = () => {
        if(state === 'Summary'){
            return <SummaryStock/>
        }
        if(state === 'Detailed'){
            return <DetailedStock/>
        }
    }
                        
    return (
        <>
        <CCard>
            <CCardHeader>
                <CDropdown >
                    <CDropdownToggle split size="lg">
                    <h2>{state} Stock Table</h2>
                    </CDropdownToggle>
                    <CDropdownMenu className="pt-2" placement="right">
                        <CDropdownItem onClick={() => setState('Summary')}>Summary</CDropdownItem>
                        <CDropdownItem onClick={() => setState('Detailed')}>Detailed</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CCardHeader>
            <CCardBody>
                {tableserved()}
            </CCardBody>
        </CCard>
        </>
    )
}

export default StockPage