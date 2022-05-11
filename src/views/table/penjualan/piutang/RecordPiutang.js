import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const RecordPiutang = () => {
    const [datapiutang, setDataPiutang] = useState([])
    const [datacustomer, setDataCustomer] = useState([])
    //FILTER
    const [filterrecord, setFilterRecord] = useState("")
    const [filterpiutang, setFilterPiutang] = useState("") //nomorpiutang
    const [filtercustomer, setFilterCustomer] = useState("") //namacustomer
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
        fetch('http://localhost:8000/api/piutang/record', requestOptions)
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
                <th scope="col">Nomor Record</th>
                <th scope="col">Nomor Piutang</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Nomor Customer</th>
                <th scope="col">Nama Customer</th>
                <th scope="col">Nominal Bayar</th>
                <th scope="col">Tanggal Bayar</th>
            </tr>
        )
    }
    const renderDataPiutang = () => {
        
        if (datapiutang === null) {
            return (<></>)
        }
        /**
         *  NomorUrut:    tmp.NomorPiutang,
			NomorPiutang: tmp.NomorPiutang,
			Faktur:       faktur,
			Customer:     customer,
			Nominal:      tmp.Nominal,
			TanggalBayar: tmp.TanggalBayar,
        * 
        */
        let piutang = datapiutang
                            .filter(data => {
                                let date = new Date(data.Faktur.TanggalFaktur)
                                return date >= tanggalawal && date <= tanggalakhir
                            })
                            .filter(data => {
                                let date = new Date(data.TanggalBayar)
                                return date >= awalpembayaran && date <= akhirpembayaran
                            })
                            .filter(data => data.Customer.NomorUrut.toString().includes(filtercustomer))
                            .filter(data => data.Faktur.NomorFaktur.toString().includes(filternomor))
                            .filter(data => data.NomorPiutang.toString().includes(filterpiutang))
                            .filter(data => data.NomorUrut.toString().includes(filterrecord))
        return piutang.map(data => {
            let tanggal = data.Faktur.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let jt = data.TanggalBayar
            let tb = jt.slice(8,10) + "/"+ jt.slice(5,7) + "/"+jt.slice(0,4)
            return (
                <tr>
                    <td>{data.NomorUrut}</td>
                    <td>{data.NomorPiutang}</td>
                    <td>{data.Faktur.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.Customer.NomorUrut}</td>
                    <td>{data.Customer.NamaCustomer}</td>
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

export default RecordPiutang