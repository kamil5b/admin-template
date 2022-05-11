
import React, { useState, useEffect } from 'react'
import {
    CRow,CCol,CInput,CLabel
} from '@coreui/react'
const TableCustomer = () => {
    const [customer, setCustomer] = useState([])
    //FILTER
    const [filternama, setFilterNama] = useState("") //namabarang
    const [filterkode, setFilterKode] = useState("") //nomorcustomer
    const [filteralamat, setFilterAlamat] = useState("") //namacustomer
    const [filternomor, setFilterNomor] = useState("") //nomorhp

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/customer', requestOptions)
            .then(response => response.json())
            .then(data => setCustomer(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/penjualan/summary
        
    }, []);
    
    const getHeader = () => {
        return (
            <tr>
                <th scope="col">Nomor Customer</th>
                <th scope="col">Nama Customer</th>
                <th scope="col">Nomor HP</th>
                <th scope="col">Alamat</th>
            </tr>
        )
    }

    const renderData = () => {
        if (customer == undefined) {
            return (<></>)
        }
        return customer
            .filter(data => data.NomorUrut.toString().includes(filterkode))
            .filter(data => data.NamaCustomer.includes(filternama))
            .filter(data => data.NomorHP.includes(filternomor))
            .filter(data => data.Alamat.includes(filteralamat))   
            .map(detail => {
            return (
                <tr key={detail.NomorUrut}>
                    <td>{detail.NomorUrut}</td>
                    <td>{detail.NamaCustomer}</td>
                    <td>{detail.NomorHP}</td>
                    <td>{detail.Alamat}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <CRow className="py-4">
            
            <CCol>
                <CLabel>Filter Nomor Customer</CLabel><br/>
                <CInput type="text" id="nomorcustomer"  maxLength={15}
                    onChange={e => setFilterKode(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Nama Customer</CLabel><br/>
                <CInput type="text" id="namacustomer" 
                    onChange={e => setFilterNama(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Nomor HP</CLabel><br/>
                <CInput type="text" id="nomorhp" 
                    onChange={e => setFilterNomor(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Alamat</CLabel><br/>
                <CInput type="text" id="alamat" 
                    onChange={e => setFilterAlamat(e.target.value)}/>
            </CCol>
        </CRow>
        <table className = "table table-striped table-bordered">
            <thead>
                {getHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
        </>
        
        
    )
}

export default TableCustomer