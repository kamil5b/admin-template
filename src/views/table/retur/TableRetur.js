import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'
import ReturBarang from './ReturBarang'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const TableRetur = () => {
    const [dataretur, setDataRetur] = useState([])

    //FILTER
    const [filternama, setFilterNama] = useState("") //namabarang
    const [filterkode, setFilterKode] = useState("") //kodebarang
    const [filternomor, setFilterNomor] = useState("") //nomorfaktur
    const [filterstatus, setFilterStatus] = useState("") //Status
    const [tanggalawal,setTanggalAwal] = useState(new Date())
    const [tanggalakhir,setTanggalAkhir] = useState(new Date())

    useEffect(() => {
        var d = new Date();
        var pastYear = d.getFullYear() - 1;
        d.setFullYear(pastYear);
        setTanggalAwal(d)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8000/api/retur', requestOptions)
            .then(response => response.json())
            .then(data => setDataRetur(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    const getHeaderRetur = () => {
        return (
            <tr>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Tipe Transaksi</th>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Status</th>
                <th scope="col">Quantity</th>
                <th scope="col">Tipe Quantity</th>
                <th scope="col">Diskontil</th>
                <th scope="col">Total Nominal</th>
                <th scope="col">Description</th>
            </tr>
        )
    }
    const renderDataRetur = () => {
        /**
     * 
     * {
        "NomorFaktur": 7,
        "TanggalFaktur": "2021-08-10T00:00:00Z",
        "KodeBarang": "8992695190208",
        "NamaBarang": "Panadol Flu & Batuk",
        "Expired": "2021-12-01T00:00:00Z",
        "Quantity": 2,
        "TipeQuantity": "karton",
        "HargaBeliKecil": 15000,
        "TipePembayaran": "CASH",
        "DiskontilRetur": 0,
        "TotalHarga": 300000,
        "NomorCustomer": 0
        } 
     * 
     */
        if (dataretur.message != undefined) {
            alert(dataretur.message)
            return (<></>)
        }
        
        let retur = dataretur
        .filter(data => {
            let date = new Date(data.FakturBarang.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
                            .filter(data => data.BarangRetur.NamaBarang.includes(filternama))
                            .filter(data => data.FakturBarang.NomorFaktur.toString().includes(filternomor))
                            .filter(data => data.BarangRetur.KodeBarang.includes(filterkode))
                            .filter(data => data.Status.includes(filterstatus))

        return retur.map(data => {
            let tanggal = data.FakturBarang.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            return (
                <tr>
                    <td>{data.FakturBarang.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.FakturBarang.TipeTransaksi}</td>
                    <td>{data.BarangRetur.KodeBarang}</td>
                    <td>{data.BarangRetur.NamaBarang}</td>
                    <td>{data.Status}</td>
                    <td>{data.Quantity}</td>
                    <td>{data.TipeQuantity}</td>
                    <td>{data.DiskontilRetur}</td>
                    <td>{data.TotalNominal}</td>
                    <td style={{width:"200px"}}>{data.Description}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <CRow className="py-4">
            <CCol>
                <CLabel>Filter Nomor Faktur</CLabel><br/>
                <CInput type="text" id="nomorfaktur" required
                    onChange={e => setFilterNomor(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Tanggal Faktur</CLabel><br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CRow>
                        <CCol>
                            Dari :<DateTimePicker value={tanggalawal} onChange={setTanggalAwal} />
                        </CCol>
                        <CCol>
                            Sampai : <DateTimePicker value={tanggalakhir} onChange={setTanggalAkhir} />
                        </CCol>
                    </CRow>
                    
                </MuiPickersUtilsProvider>
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
            <CCol>
                <CLabel>Tipe Pembayaran</CLabel><br/>
                    <CSelect defaultValue="" custom name="tipebarang" id="tipebarang"
                        onChange={e => setFilterStatus(e.target.value)} >
                        <option selected value="">SEMUA</option>
                        <option value="RETUR">RETUR</option>
                        <option value="ACCEPT">ACCEPT</option>
                        <option value="DITOLAK">DITOLAK</option>
                        <option value="DIPROSES">DIPROSES</option>
                    </CSelect>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderRetur()}
                </thead>
                <tbody>
                    {renderDataRetur()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TableRetur