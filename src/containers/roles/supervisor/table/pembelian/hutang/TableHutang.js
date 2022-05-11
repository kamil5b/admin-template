import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const TableHutang = () => {
    const [datahutang, setDataHutang] = useState([])
    const [datatoko, setDataToko] = useState([])
    //FILTER
    const [filterhutang, setFilterHutang] = useState("") //nomorhutang
    const [filtertoko, setFilterToko] = useState("") //namatoko
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
        fetch('http://localhost:8000/api/hutang', requestOptions)
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
                <th scope="col">Nomor Hutang</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Nomor Toko</th>
                <th scope="col">Nama Toko</th>
                <th scope="col">Sisa Hutang</th>
                <th scope="col">Jatuh Tempo</th>
            </tr>
        )
    }
    const renderDataHutang = () => {
        
        if (datahutang === null) {
            return (<></>)
        }
        
        /**
         * 
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Nomor Toko</th>
                <th scope="col">Nama Toko</th>
                <th scope="col">Sisa Hutang</th>
                <th scope="col">Jatuh Tempo</th>
         */
        let hutang = datahutang
                            .filter(data => {
                                let date = new Date(data.FakturHutang.TanggalFaktur)
                                return date >= tanggalawal && date <= tanggalakhir
                            })
                            .filter(data => data.TokoDihutang.NomorToko.toString().includes(filtertoko))
                            .filter(data => data.FakturHutang.NomorFaktur.toString().includes(filternomor))
                            .filter(data => data.NomorHutang.toString().includes(filterhutang))
        return hutang.map(data => {
            let tanggal = data.FakturHutang.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let jt = data.JatuhTempo
            let jatuhtempo = jt.slice(8,10) + "/"+ jt.slice(5,7) + "/"+jt.slice(0,4)
            return (
                <tr>
                    <td>{data.NomorHutang}</td>
                    <td>{data.FakturHutang.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.TokoDihutang.NomorToko}</td>
                    <td>{data.TokoDihutang.NamaToko}</td>
                    <td>{data.SisaHutang}</td>
                    <td>{jatuhtempo}</td>
                </tr>
            )
        })
    }
    const sisahutang = () => {
        
        if (datahutang === null) {
            return 0
        }
        let hutang = datahutang
                        .filter(data => {
                            let date = new Date(data.FakturHutang.TanggalFaktur)
                            return date >= tanggalawal && date <= tanggalakhir
                        })
                        .filter(data => data.TokoDihutang.NomorToko.toString().includes(filtertoko))
                        .filter(data => data.FakturHutang.NomorFaktur.toString().includes(filternomor))
                        .filter(data => data.NomorHutang.toString().includes(filterhutang))
        let sisa = 0
        hutang.map(data => sisa = sisa + data.SisaHutang)
        return sisa
    }
    return (
        <>
        <CRow className="py-4">
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
                <CLabel>Total Sisa Hutang</CLabel><br/>
                <CInput type="text"  disabled
                    value={sisahutang()}/>
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

export default TableHutang