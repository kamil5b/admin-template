import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CButton
} from '@coreui/react'
const TableDemands = () => {
    const [datademand, setDataDemand] = useState([])

    //FILTER
    const [filternama, setFilterNama] = useState("") //namabarang
    const [filterkode, setFilterKode] = useState("") //kodebarang
    const [filternomor, setFilterNomor] = useState("") //nomorfaktur

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8000/api/demand', requestOptions)
            .then(response => response.json())
            .then(data => setDataDemand(data))
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    const getHeaderDemand = () => {
        return (
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Quantity Demand</th>
                <th scope="col">Quantity Sebelumnya</th>
                <th scope="col">Quantity Saat ini</th>
                <th scope="col">Tipe Quantity</th>
                <th scope="col">Menu</th>
            </tr>
        )
    }
    const accept = (e) => {
        let id = e.target.value.toString()
        fetch('http://localhost:8000/api/demand', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              id
            })
        });
        window.location.reload();
        return false;
    }
    const renderDataDemand = () => {
        /**
     * 
     *  type Demand struct {
            ID         int
            Barang           models.Barang
            QuantityDemand   int
            QuantityThen     int
            QuantityRightNow int
            TipeQuantity     string
        }
     * 
     */
        if (datademand == undefined) {
            return (<></>)
        }
        
        let demand = datademand
                            .filter(data => data.Barang.NamaBarang.includes(filternama))
                            .filter(data => data.Barang.KodeBarang.includes(filterkode))
                            .filter(data => data.ID.toString().includes(filternomor))
        return demand.map(data => {
            let button = <CButton color="danger" disabled>Demand Belum Terpenuhi</CButton>
            if (data.QuantityRightNow >= data.QuantityDemand){
                button = <CButton onClick={accept} color="success" value={data.ID}>Demand Terpenuhi</CButton>
            }
            return (
                <tr>
                    <td>{data.ID}</td>
                    <td>{data.Barang.KodeBarang}</td>
                    <td>{data.Barang.NamaBarang}</td>
                    <td>{data.QuantityDemand}</td>
                    <td>{data.QuantityThen}</td>
                    <td>{data.QuantityRightNow}</td>
                    <td>{data.TipeQuantity}</td>
                    <td>{button}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <CRow className="py-4">
            <CCol>
                <CLabel>Filter ID</CLabel><br/>
                <CInput type="text" id="id" required
                    onChange={e => setFilterNomor(e.target.value)}/>
            </CCol>
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
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderDemand()}
                </thead>
                <tbody>
                    {renderDataDemand()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TableDemands