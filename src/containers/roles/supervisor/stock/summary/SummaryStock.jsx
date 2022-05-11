
import React, { useState, useEffect } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'
const SummaryStock = () => {
    const [datastock, setStockData] = useState([])
    const [filterkode, setFilterKode] = useState("")
    const [filternama, setFilterNama] = useState("")
    
    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/stock/summary', requestOptions)
            .then(response => response.json())
            .then(data => setStockData(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/penjualan/summary
        
    }, []);
    
    /*
    UNBOX :
		{
			nomorstock :
			quantity :
			tipequantity :
		}
	*/

    const getHeader = () => {
        return (
            <tr>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Quantity Besar</th>
                <th scope="col">Tipe Quantity Besar</th>
                <th scope="col">Quantity Medium</th>
                <th scope="col">Tipe Quantity Medium</th>
                <th scope="col">Quantity Kecil</th>
                <th scope="col">Tipe Quantity Kecil</th>
                <th scope="col">Harga Jual Kecil</th>
            </tr>
        )
    }

    const renderData = () => {
        if(datastock == undefined){
            return (<></>)
        }
        return datastock.filter(data => data.BarangStock.NamaBarang.includes(filternama)).filter(data => data.BarangStock.KodeBarang.includes(filterkode)).map(data => {
            return (
                <tr key={data.BarangStock.KodeBarang}>
                    <td>{data.BarangStock.KodeBarang}</td>
                    <td>{data.BarangStock.NamaBarang}</td>
                    <td>{data.BigQty}</td>
                    <td>{data.BarangStock.TipeBigQty}</td>
                    <td>{data.MediumQty}</td>
                    <td>{data.BarangStock.TipeMediumQty}</td>
                    <td>{data.SmallQty}</td>
                    <td>{data.BarangStock.TipeSmallQty}</td>
                    <td>{data.BarangStock.HargaJualKecil}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <CRow className="mb-4">
            <CCol sm={3}>
                <CLabel>Filter Kode Barang</CLabel><br/>
                <CInput type="text" id="kodebarang" required maxLength={15}
                    onChange={e => setFilterKode(e.target.value)}/>
            </CCol>
            <CCol sm={3}>
                <CLabel>Filter Nama Barang</CLabel><br/>
                <CInput type="text" id="namabarang" required
                    onChange={e => setFilterNama(e.target.value)}/>
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

export default SummaryStock