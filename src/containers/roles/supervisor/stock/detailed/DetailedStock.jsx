
import React, { PureComponent,useState,useEffect } from 'react'
import UnboxForm from './UnboxForm';
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const DetailedStock = () => {

    const [datastock, setStockData] = useState([])

    const [filterkode, setFilterKode] = useState("")
    const [filternama, setFilterNama] = useState("")
    const [filterfaktur, setFilterFaktur] = useState("")

    const [tanggalawal,setTanggalAwal] = useState(new Date())
    const [tanggalakhir,setTanggalAkhir] = useState(new Date())

    useEffect(() => {
        
        var d = new Date();
        var pastYear = d.getFullYear() - 1;
        d.setFullYear(pastYear);
        setTanggalAwal(d)
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/stock', requestOptions)
            .then(response => response.json())
            .then(data => setStockData(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/penjualan/summary
        
    }, []);

    const getHeader = () => {
        return (
            <tr>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Total Pembelian Besar</th>
                <th scope="col">Tipe Quantity Besar</th>
                <th scope="col">Total Pembelian Medium</th>
                <th scope="col">Tipe Quantity Medium</th>
                <th scope="col">Total Pembelian Kecil</th>
                <th scope="col">Tipe Quantity Kecil</th>
                <th scope="col">Harga Beli Kecil</th>
                <th scope="col">Harga Jual Kecil</th>
                <th scope="col">Margin</th>
            </tr>
        )
    }
    /*
    {
        "NomorFaktur": 1,
        "TanggalFaktur": "2021-08-13T00:00:00Z",
        "NomorStock": 1,
        "BarangStock": {
            "KodeBarang": "8992695190208",
            "NamaBarang": "Panadol Flu & Batuk",
            "TipeBigQty": "Box",
            "BigToMedium": 20,
            "TipeMediumQty": "Karton",
            "MediumToSmall": 10,
            "TipeSmallQty": "Strip",
            "HargaJualKecil": 15000,
            "TipeBarang": "BARANG JUAL"
        },
        "Expired": "2021-12-01T00:00:00Z",
        "BigQty": 0,
        "MediumQty": 0,
        "SmallQty": 0,
        "HargaBeliKecil": 13000
    }
    */

    const renderDatas = () => {
        
        if(datastock == undefined){
            return (<></>)
        }
        return datastock.filter(data => data.BarangStock.NamaBarang.includes(filternama))
                        .filter(data => {
                            let date = new Date(data.TanggalFaktur)
                            return date >= tanggalawal && date <= tanggalakhir
                        })
                        .filter(data => data.NomorFaktur.toString().includes(filterfaktur))
                        .filter(data => data.BarangStock.KodeBarang.includes(filterkode))
                        .map(data => {
            let tanggal = data.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let margin = data.BarangStock.HargaJualKecil - data.HargaBeliKecil
            let persentage = margin/data.HargaBeliKecil*100
            let pers = Math.round(persentage * 100) / 100
            return (
                
                <tr key={data.NomorFaktur}>
                    <td>{data.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.BarangStock.KodeBarang}</td>
                    <td>{data.BarangStock.NamaBarang}</td>
                    <td>{data.BigQty}</td>
                    <td>{data.BarangStock.TipeBigQty}</td>
                    <td>{data.MediumQty}</td>
                    <td>{data.BarangStock.TipeMediumQty}</td>
                    <td>{data.SmallQty}</td>
                    <td>{data.BarangStock.TipeSmallQty}</td>
                    <td>{data.HargaBeliKecil}</td>
                    <td>{data.BarangStock.HargaJualKecil}</td>
                    <td>{margin}({pers}%)</td>
                </tr>
            )
        })
    }

    return (
        <>
        <CRow className="mb-4">
            <CCol>
                <CLabel>Filter Nomor Faktur</CLabel><br/>
                <CInput type="text" id="nomorfaktur" required
                    onChange={e => setFilterFaktur(e.target.value)}/>
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
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                    {getHeader()}
                </thead>
                <tbody>
                    {renderDatas()}
                </tbody>
            </table>
        </CRow>
        
        </>
    )
}

export default DetailedStock