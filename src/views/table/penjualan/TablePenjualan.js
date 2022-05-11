import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ReturBarang from 'src/views/table/retur/ReturBarang';

const TablePenjualan = () => {
    const [datapenjualan, setDataPenjualan] = useState([])

    //FILTER
    const [filternama, setFilterNama] = useState("") //namabarang
    const [filterkode, setFilterKode] = useState("") //kodebarang
    const [filtercustomer, setFilterCustomer] = useState("") //namacustomer
    const [filternomor, setFilterNomor] = useState("") //nomorfaktur
    const [filtertipe, setFilterTipe] = useState("") //tipepembayaran
    
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
        fetch('http://localhost:8000/api/penjualan', requestOptions)
            .then(response => response.json())
            .then(data => setDataPenjualan(data))

    }, []);
    
    const getHeaderPenjualan = () => {
        return (
            <tr>
                <th scope="col">Retur</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Expired</th>
                <th scope="col">Quantity</th>
                <th scope="col">Tipe Quantity</th>
                <th scope="col">Harga Jual Kecil</th>
                <th scope="col">CASH/KREDIT/GIRO</th>
                <th scope="col">Diskontil</th>
                <th scope="col">Total Penjualan</th>
                <th scope="col">Nomor Customer</th>
            </tr>
        )
    }
    const renderDataPenjualan = () => {
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
        "HargaJualKecil": 15000,
        "TipePembayaran": "CASH",
        "DiskontilPenjualan": 0,
        "TotalHarga": 300000,
        "NomorCustomer": 0
        } 
     * 
     */
        if (datapenjualan== undefined) {
            
            return (<></>)
        }
        console.log(datapenjualan)
        let penjualan = datapenjualan
                            .filter(data => {
                                let date = new Date(data.TanggalFaktur)
                                return date >= tanggalawal && date <= tanggalakhir
                            })
                            .filter(data => data.NamaCustomer.includes(filtercustomer))
                            .filter(data => data.NamaBarang.includes(filternama))
                            .filter(data => data.NomorFaktur.toString().includes(filternomor))
                            .filter(data => data.KodeBarang.includes(filterkode))
                            .filter(data => data.TipePembayaran.includes(filtertipe))
        return penjualan.map(data => {
            let tanggal = data.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let exp = data.Expired
            let expired = exp.slice(8,10) + "/"+ exp.slice(5,7) + "/"+exp.slice(0,4)
            return (
                <tr>
                    <td><ReturBarang data={data}/></td>
                    <td>{data.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.KodeBarang}</td>
                    <td>{data.NamaBarang}</td>
                    <td>{expired}</td>
                    <td>{data.Quantity}</td>
                    <td>{data.TipeQuantity}</td>
                    <td>{data.HargaJualKecil}</td>
                    <td>{data.TipePembayaran}</td>
                    <td>{data.DiskontilPenjualan}</td>
                    <td>{data.TotalHarga}</td>
                    <td>{data.NamaCustomer}</td>
                </tr>
            )
        })
    }
    const totalpenjualan = () => {
        
        if (datapenjualan === null) {
            return 0
        }
        let beli = datapenjualan
        .filter(data => {
            let date = new Date(data.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
        .filter(data => data.NamaCustomer.includes(filtercustomer))
        .filter(data => data.NamaBarang.includes(filternama))
        .filter(data => data.NomorFaktur.toString().includes(filternomor))
        .filter(data => data.KodeBarang.includes(filterkode))
        .filter(data => data.TipePembayaran.includes(filtertipe))
        let total = 0
        beli.map(data => total = total + data.TotalHarga)
        return total
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
                        onChange={e => setFilterTipe(e.target.value)} >
                        <option selected value="">SEMUA</option>
                        <option value="CASH">CASH</option>
                        <option value="KREDIT">KREDIT</option>
                        <option value="GIRO">GIRO</option>
                    </CSelect>
            </CCol>
            <CCol>
                <CLabel>Filter Nama Customer</CLabel><br/>
                <CInput type="text" id="namacustomer" required
                    onChange={e => setFilterCustomer(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Total Pembelian</CLabel><br/>
                <CInput type="text"  disabled
                    value={totalpenjualan()}/>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderPenjualan()}
                </thead>
                <tbody>
                    {renderDataPenjualan()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TablePenjualan