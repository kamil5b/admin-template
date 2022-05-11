
import React, { useState, useEffect } from 'react'
import {
    CRow,CCol,CInput,CLabel
} from '@coreui/react'
const TableToko = () => {
    const [toko, setToko] = useState([])
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
        fetch('http://localhost:8000/api/toko', requestOptions)
            .then(response => response.json())
            .then(data => setToko(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/penjualan/summary
        
    }, []);
    
    const getHeader = () => {
        return (
            <tr>
                <th scope="col">Nomor Toko</th>
                <th scope="col">Nama Toko</th>
                <th scope="col">Nomor HP</th>
                <th scope="col">Alamat</th>
            </tr>
        )
    }

    const renderData = () => {
        if (toko == undefined) {
            return (<></>)
        }
        return toko
            .filter(data => data.NomorToko.toString().includes(filterkode))
            .filter(data => data.NamaToko.includes(filternama))
            .filter(data => data.NomorTelepon.includes(filternomor))
            .filter(data => data.Alamat.includes(filteralamat))   
            .map(detail => {
            return (
                <tr key={detail.NomorToko}>
                    <td>{detail.NomorToko}</td>
                    <td>{detail.NamaToko}</td>
                    <td>{detail.NomorTelepon}</td>
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

export default TableToko