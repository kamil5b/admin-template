import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect,CCard,CCardBody,CCardHeader,CButton
} from '@coreui/react'

const TablePengajuan = () => {

    const [msg, setMessage] = useState([])
    const [filterkode, setFilterKode] = useState("")
    const [filternama, setFilterNama] = useState("")
    const [filternomor, setFilterNomor] = useState("")
    const [datapengajuan, setDataPengajuan] = useState([])
    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8000/api/barang/update', requestOptions)
            .then(response => response.json())
            .then(data => setDataPengajuan(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    const getHeaderBarang = () => {
        return (
            <tr>
                <th scope="col"></th>
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
    const renderDataBarang = (data, ba) => {
        return (
            <tr key={data.KodeBarang}>
                <td>{ba}</td>
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
    }
    const acc = (e) => {
        let nomorpengajuan = e.target.value.toString()
        fetch('http://localhost:8000/api/barang/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorpengajuan
            })
        }).then(response => response.json())
        .then(data => setMessage(data))
        .catch(err => console.log(err));
        if(msg != "success"){
            alert(msg)
setMessage("success")
        };
        window.location.reload();
        return false;
    }
    const tolak = (e) => {
        let nomorpengajuan = e.target.value.toString()
        fetch('http://localhost:8000/api/barang/update', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorpengajuan
            })
        }).then(response => response.json())
        .then(data => setMessage(data))
        .catch(err => console.log(err));
        if(msg != "success"){
            alert(msg)
setMessage("success")
        };
        window.location.reload();
        return false;
    }

    const renderDataPengajuan = () => {
       if (datapengajuan == undefined){
           return <></>
       }
        let arrpengajuan = datapengajuan
            .filter(data => data.NomorPengajuan.toString().includes(filternomor))
            .filter(data => data.Before.KodeBarang.includes(filternama))
            .filter(data => data.Before.KodeBarang.includes(filterkode))

        return arrpengajuan.map(data => {
            return (
                <CRow>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol>
                                    <h3>{data.NomorPengajuan}
                                        <CButton color="success" onClick={acc} value={data.NomorPengajuan} className="mx-3">Diterima</CButton>
                                        <CButton color="danger" onClick={tolak} value={data.NomorPengajuan}>Tolak</CButton>
                                    </h3>
                                    
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <table className = "table table-striped table-bordered">
                                    <thead>
                                        {getHeaderBarang()}
                                    </thead>
                                    <tbody>
                                        {renderDataBarang(data.Before, "BEFORE")}
                                    </tbody>
                                </table>
                            </CRow>
                            <CRow>
                                <table className = "table table-striped table-bordered">
                                    <thead>
                                        {getHeaderBarang()}
                                    </thead>
                                    <tbody>
                                        {renderDataBarang(data.After, "AFTER")}
                                    </tbody>
                                </table>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CRow>
                
            )
        })
    }
    return (
        <>
        <CRow className="py-4">
            <CCol>
                <CLabel>Filter Nomor Pengajuan</CLabel><br/>
                <CInput type="text" id="nomorpengajuan"
                    onChange={e => setFilterNomor(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Kode Barang</CLabel><br/>
                <CInput type="text" id="kodebarang"  maxLength={15}
                    onChange={e => setFilterKode(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Nama Barang</CLabel><br/>
                <CInput type="text" id="namabarang" 
                    onChange={e => setFilterNama(e.target.value)}/>
            </CCol>
            
        </CRow>
        {renderDataPengajuan()}
        </>
    )
}

export default TablePengajuan