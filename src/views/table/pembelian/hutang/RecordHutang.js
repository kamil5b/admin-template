import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const RecordHutang = () => {
    const [datahutang, setDataHutang] = useState([])
    const [datatoko, setDataToko] = useState([])
    //FILTER
    const [filterrecord, setFilterRecord] = useState("")
    const [filterhutang, setFilterHutang] = useState("") //nomorhutang
    const [filtertoko, setFilterToko] = useState("") //namatoko
    const [filternomor, setFilterNomor] = useState("") //nomorfaktur
    const [tanggalawal,setTanggalAwal] = useState(new Date())
    const [tanggalakhir,setTanggalAkhir] = useState(new Date())
    const [awalpembayaran,setAwalPembayaran] = useState(new Date())
    const [akhirpembayaran,setAkhirPembayaran] = useState(new Date())

    useEffect(() => {
        var d = new Date();
        var pastYear = d.getFullYear() - 1;
        d.setFullYear(pastYear);
        setTanggalAwal(d)
        setAwalPembayaran(d)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8000/api/hutang/record', requestOptions)
            .then(response => response.json())
            .then(data => setDataHutang(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/toko', requestOptions)
            .then(response => response.json())
            .then(data => setDataToko(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    const optiontoko = () => {
        if (datatoko == undefined) {
            return (<></>)
        }
        return datatoko.map(detail => {
            return (
                <option value={detail.NomorToko}>{detail.NomorToko} - {detail.NamaToko}</option>
            )
        })
    }
    
    const getHeaderHutang = () => {
        return (
            <tr>
                <th scope="col">Nomor Record</th>
                <th scope="col">Nomor Hutang</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Nomor Toko</th>
                <th scope="col">Nama Toko</th>
                <th scope="col">Nominal Bayar</th>
                <th scope="col">Tanggal Bayar</th>
            </tr>
        )
    }
    const renderDataHutang = () => {
        
        if (datahutang === null) {
            return (<></>)
        }
        /**
         *  NomorUrut:    tmp.NomorHutang,
            NomorHutang:  tmp.NomorHutang,
            Faktur:       faktur,
            Toko:         toko,
            Nominal:      tmp.Nominal,
            TanggalBayar: tmp.TanggalBayar,
        * 
        */
        let hutang = datahutang
                            .filter(data => {
                                let date = new Date(data.Faktur.TanggalFaktur)
                                return date >= tanggalawal && date <= tanggalakhir
                            })
                            .filter(data => {
                                let date = new Date(data.TanggalBayar)
                                return date >= awalpembayaran && date <= akhirpembayaran
                            })
                            .filter(data => data.Toko.NomorToko.toString().includes(filtertoko))
                            .filter(data => data.Faktur.NomorFaktur.toString().includes(filternomor))
                            .filter(data => data.NomorHutang.toString().includes(filterhutang))
                            .filter(data => data.NomorUrut.toString().includes(filterrecord))
        return hutang.map(data => {
            let tanggal = data.Faktur.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let jt = data.TanggalBayar
            let tb = jt.slice(8,10) + "/"+ jt.slice(5,7) + "/"+jt.slice(0,4)
            return (
                <tr>
                    <td>{data.NomorUrut}</td>
                    <td>{data.NomorHutang}</td>
                    <td>{data.Faktur.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.Toko.NomorToko}</td>
                    <td>{data.Toko.NamaToko}</td>
                    <td>{data.Nominal}</td>
                    <td>{tb}</td>
                </tr>
            )
        })
    }
    return (
        <>
        <CRow className="py-4">
            <CCol>
                <CLabel>Filter Nomor Record</CLabel><br/>
                <CInput type="text" id="nomorrecord" 
                    onChange={e => setFilterRecord(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Nomor Faktur</CLabel><br/>
                <CInput type="text" id="nomorfaktur" 
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
                <CLabel>Filter Nomor Hutang</CLabel><br/>
                <CInput type="text" id="nomorhutang" 
                    onChange={e => setFilterHutang(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Toko</CLabel><br/>
                <CSelect defaultValue="" custom name="toko" id="toko"
                    onChange={e => setFilterToko(e.target.value)} >
                    <option selected value="">SEMUA</option>
                    {optiontoko()}
                </CSelect>
            </CCol>
            <CCol>
                <CLabel>Filter Tanggal Pembayaran</CLabel><br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CRow>
                        <CCol>
                            Dari :<DateTimePicker value={awalpembayaran} onChange={setAwalPembayaran} />
                        </CCol>
                        <CCol>
                            Sampai : <DateTimePicker value={akhirpembayaran} onChange={setAkhirPembayaran} />
                        </CCol>
                    </CRow>
                    
                </MuiPickersUtilsProvider>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderHutang()}
                </thead>
                <tbody>
                    {renderDataHutang()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default RecordHutang