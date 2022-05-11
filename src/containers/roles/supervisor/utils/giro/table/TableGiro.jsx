
import React, { useState, useEffect } from 'react'
import {
    CRow,CCol,CInput,CLabel
} from '@coreui/react'
const TableGiro = () => {
    const [giro, setGiro] = useState([])
    const [filternomor, setFilterNomor] = useState("")
    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/giro', requestOptions)
            .then(response => response.json())
            .then(data => setGiro(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/penjualan/summary
        
    }, []);
    
    const getHeader = () => {
        return (
            <tr>
                <th scope="col">Nomor Giro</th>
                <th scope="col">Nominal</th>
                <th scope="col">Tanggal Efektif Giro</th>
                <th scope="col">Bank</th>
            </tr>
        )
    }


    
    const renderData = () => {
        if (giro == undefined) {
            return (<></>)
        }
        return giro.filter(data => data.NomorGiro.toString().includes(filternomor)).map(detail => {
            let tanggal = detail.TanggalGiro
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            return (
                <tr key={detail.NomorGiro}>
                    <td>{detail.NomorGiro}</td>
                    <td>{detail.Nominal}</td>
                    <td>{date}</td>
                    <td>{detail.BankGiro.NamaBank}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <CRow className="mb-4">
            <CCol md="4">
                <CLabel>Filter Nomor Giro</CLabel><br/>
                <CInput type="text" id="nomorgiro"
                    onChange={e => setFilterNomor(e.target.value)}/>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                    {getHeader()}
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </table>
        </CRow>
        
        </>
        
        
    )
}

export default TableGiro