import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const TablePiutang = () => {
    const [datapiutang, setDataPiutang] = useState([])
    const [datacustomer, setDataCustomer] = useState([])
    //FILTER
    const [filterpiutang, setFilterPiutang] = useState("") //nomorpiutang
    const [filtercustomer, setFilterCustomer] = useState("") //namacustomer
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
        fetch('http://localhost:8000/api/piutang', requestOptions)
            .then(response => response.json())
            .then(data => setDataPiutang(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/customer', requestOptions)
            .then(response => response.json())
            .then(data => setDataCustomer(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    const optioncustomer = () => {
        if (datacustomer == undefined) {
            return (<></>)
        }
        return datacustomer.map(detail => {
            return (
                <option value={detail.NomorUrut}>{detail.NomorUrut} - {detail.NamaCustomer}</option>
            )
        })
    }
    const getHeaderPiutang = () => {
        return (
            <tr>
                <th scope="col">Nomor Piutang</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Nomor Customer</th>
                <th scope="col">Nama Customer</th>
                <th scope="col">Sisa Piutang</th>
                <th scope="col">Jatuh Tempo</th>
            </tr>
        )
    }
    const renderDataPiutang = () => {
        
        if (datapiutang === null) {
            return (<></>)
        }
        
        /**
         * 
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Nomor Customer</th>
                <th scope="col">Nama Customer</th>
                <th scope="col">Sisa Piutang</th>
                <th scope="col">Jatuh Tempo</th>
         */
        let piutang = datapiutang
                            .filter(data => {
                                let date = new Date(data.FakturPiutang.TanggalFaktur)
                                return date >= tanggalawal && date <= tanggalakhir
                            })
                            .filter(data => data.CustomerPiutang.NomorUrut.toString().includes(filtercustomer))
                            .filter(data => data.FakturPiutang.NomorFaktur.toString().includes(filternomor))
                            .filter(data => data.NomorPiutang.toString().includes(filterpiutang))
        return piutang.map(data => {
            let tanggal = data.FakturPiutang.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let jt = data.JatuhTempo
            let jatuhtempo = jt.slice(8,10) + "/"+ jt.slice(5,7) + "/"+jt.slice(0,4)
            return (
                <tr>
                    <td>{data.NomorPiutang}</td>
                    <td>{data.FakturPiutang.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.CustomerPiutang.NomorUrut}</td>
                    <td>{data.CustomerPiutang.NamaCustomer}</td>
                    <td>{data.SisaPiutang}</td>
                    <td>{jatuhtempo}</td>
                </tr>
            )
        })
    }
    const sisapiutang = () => {
        
        if (datapiutang === null) {
            return 0
        }
        let piutang = datapiutang
                        .filter(data => {
                            let date = new Date(data.FakturPiutang.TanggalFaktur)
                            return date >= tanggalawal && date <= tanggalakhir
                        })
                        .filter(data => data.CustomerPiutang.NomorUrut.toString().includes(filtercustomer))
                        .filter(data => data.FakturPiutang.NomorFaktur.toString().includes(filternomor))
                        .filter(data => data.NomorPiutang.toString().includes(filterpiutang))
        let sisa = 0
        piutang.map(data => sisa = sisa + data.SisaPiutang)
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
                <CLabel>Filter Nomor Piutang</CLabel><br/>
                <CInput type="text" id="nomorpiutang" 
                    onChange={e => setFilterPiutang(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Customer</CLabel><br/>
                <CSelect defaultValue="" custom name="customer" id="customer"
                    onChange={e => setFilterCustomer(e.target.value)} >
                    <option selected value="">SEMUA</option>
                    {optioncustomer()}
                </CSelect>
            </CCol>
            <CCol>
                <CLabel>Total Sisa Piutang</CLabel><br/>
                <CInput type="text"  disabled
                    value={sisapiutang()}/>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderPiutang()}
                </thead>
                <tbody>
                    {renderDataPiutang()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TablePiutang