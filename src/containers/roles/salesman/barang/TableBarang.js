import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

const TableBarang = () => {

    const [databarang, setDataBarang] = useState([])
    const [filterkode, setFilterKode] = useState("")
    const [filternama, setFilterNama] = useState("")
    const [filtertipe, setFilterTipe] = useState("")

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        
        fetch('http://localhost:8000/api/barang', requestOptions)
            .then(response => response.json())
            .then(data => setDataBarang(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    const getHeaderBarang = () => {
        return (
            <tr>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Tipe Quantity Besar</th>
                <th scope="col">Besar ke Medium</th>
                <th scope="col">Tipe Quantity Medium</th>
                <th scope="col">Medium ke Kecil</th>
                <th scope="col">Tipe Quantity Kecil</th>
                <th scope="col">Harga Jual Kecil</th>
                <th scope="col">Tipe Barang</th>
            </tr>
        )
    }
    const renderDataBarang = () => {
        let barang = databarang.filter(data => data.NamaBarang.includes(filternama)).filter(data => data.KodeBarang.includes(filterkode))

        return barang.filter(data => data.TipeBarang.includes(filtertipe)).map(data => {
            return (
                <tr key={data.KodeBarang}>
                    <td>{data.KodeBarang}</td>
                    <td>{data.NamaBarang}</td>
                    <td>{data.TipeBigQty}</td>
                    <td>{data.BigToMedium}</td>
                    <td>{data.TipeMediumQty}</td>
                    <td>{data.MediumToSmall}</td>
                    <td>{data.TipeSmallQty}</td>
                    <td>{data.HargaJualKecil}</td>
                    <td>{data.TipeBarang}</td>
                </tr>
            )
        })
    }
    return (
        <>
        <CRow className="py-4">
            <CCol>
                <CLabel>Filter Kode Barang</CLabel><br/>
                <CInput type="text" id="kodebarang" required maxLength={15}
                    onChange={e => setFilterKode(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Nama Barang</CLabel><br/>
                <CInput type="text" id="namabarang" required
                    onChange={e => setFilterNama(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Tipe Barang</CLabel><br/>
                    <CSelect defaultValue="" custom name="tipebarang" id="tipebarang"
                        onChange={e => setFilterTipe(e.target.value)} >
                        <option selected value="">SEMUA</option>
                        <option value="BARANG JUAL">BARANG JUAL</option>
                        <option value="INVENTARIS">INVENTARIS</option>
                        <option value="ASSET">ASSET</option>
                    </CSelect>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderBarang()}
                </thead>
                <tbody>
                    {renderDataBarang()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TableBarang