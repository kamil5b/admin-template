import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const TableProfit = () => {


    const [dataprofit, setDataProfit] = useState({})

    //FILTER
    const [filternama, setFilterNama] = useState("") //namabarang
    const [filterkode, setFilterKode] = useState("") //kodebarang
    const [filternomor, setFilterNomor] = useState("") //nomorfaktur
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
        fetch('http://localhost:8000/api/profit', requestOptions)
            .then(response => response.json())
            .then(data => setDataProfit(data))
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    const persentageProfit = (pembelian,profit) => {
        let persentage = profit/pembelian*100
        let pers = Math.round(persentage * 100) / 100
        return pers
    }

    const getHeaderProfit = () => {
        return (
            <tr>
                <th scope="col">Nomor Profit</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Total Pembelian</th>
                <th scope="col">Total Penjualan</th>
                <th scope="col">Total Profit</th>
                <th scope="col">Persentase Profit</th>
            </tr>
        )
    }
    const renderDataProfit = () => {
        if (dataprofit.Profit === undefined) {
            return (<></>)
        }
        let prof = dataprofit.Profit
        let profit = prof
                        .filter(data => {
                            let date = new Date(data.Faktur.TanggalFaktur)
                            return date >= tanggalawal && date <= tanggalakhir
                        })
                        .filter(data => data.Barang.NamaBarang.includes(filternama))
                        .filter(data => data.Faktur.NomorFaktur.toString().includes(filternomor))
                        .filter(data => data.Barang.KodeBarang.includes(filterkode))
        return profit.map(data => {
            let tanggal = data.Faktur.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            return (
                <tr>
                    <td>{data.NomorProfit}</td>
                    <td>{data.Faktur.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.Barang.KodeBarang}</td>
                    <td>{data.Barang.NamaBarang}</td>
                    <td>{data.TotalPembelian}</td>
                    <td>{data.TotalPenjualan}</td>
                    <td>{data.TotalProfit}</td>
                    <td>{persentageProfit(data.TotalPembelian,data.TotalProfit)}%</td>
                </tr>
            )
        })
    }

    const totalpembelian = () => {
        if (dataprofit.Profit === undefined) {

            return 0
        }
        let total = 0
        let prof = dataprofit.Profit
        let profit = prof
        .filter(data => {
            let date = new Date(data.Faktur.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
                        .filter(data => data.Barang.NamaBarang.includes(filternama))
                        .filter(data => data.Faktur.NomorFaktur.toString().includes(filternomor))
                        .filter(data => data.Barang.KodeBarang.includes(filterkode))
        profit.map(data => {
            total = total + data.TotalPembelian
        })
        return total
    }

    
    const totalpenjualan = () => {
        if (dataprofit.Profit === undefined) {
  

            return 0
        }
        let total = 0
        let prof = dataprofit.Profit
        let profit = prof
        .filter(data => {
            let date = new Date(data.Faktur.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
                        .filter(data => data.Barang.NamaBarang.includes(filternama))
                        .filter(data => data.Faktur.NomorFaktur.toString().includes(filternomor))
                        .filter(data => data.Barang.KodeBarang.includes(filterkode))
        profit.map(data => {
            total = total + data.TotalPenjualan
        })
        return total
    }

    
    const totalprofit = () => {
        if (dataprofit.Profit === undefined) {
  

            return 0
        }
        let total = 0
        let prof = dataprofit.Profit
        let profit = prof
        .filter(data => {
            let date = new Date(data.Faktur.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
                        .filter(data => data.Barang.NamaBarang.includes(filternama))
                        .filter(data => data.Faktur.NomorFaktur.toString().includes(filternomor))
                        .filter(data => data.Barang.KodeBarang.includes(filterkode))
        profit.map(data => {
            total = total + data.TotalProfit
        })
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
        </CRow>
        <CRow className="justify-content-md-center">
            <CCol>
                <b><p className="text-center">Total Seluruh Pembelian<br/>
                {totalpembelian()}</p></b>
            </CCol>
            <CCol>
                <b><p className="text-center">Total Seluruh Penjualan<br/>
                    {totalpenjualan()}</p></b>
            </CCol>
            <CCol>
                <b><p className="text-center">Profit Total Seluruh Penjualan<br/>
                    {totalprofit()}</p></b>
            </CCol>
            <CCol>
                <b><p className="text-center">Persentase Seluruh Profit<br/>
                {persentageProfit(totalpembelian(),totalprofit())}%</p></b>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderProfit()}
                </thead>
                <tbody>
                    {renderDataProfit()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TableProfit