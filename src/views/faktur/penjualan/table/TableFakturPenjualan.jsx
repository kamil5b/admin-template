
import React, { useState, useEffect, useRef } from 'react'
import {
    CRow, 
    CInput, 
    CSelect,
    CLabel,
    CButton,
} from '@coreui/react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import ReactToPrint from "react-to-print";
import ComponentToPrint from './ComponentToPrint';

const TableFakturPenjualan = (props) => {
    
    const componentRef = useRef([]);

    const [datafaktur, setDataFaktur] = useState([])
    const [datacustomer, setDataCustomer] = useState([])
    const [datagiro, setDataGiro] = useState([])
    const [datapenjualan, setDataPenjualan] = useState([])

    const [tanggalawal, settanggalawal] = useState(new Date())
    const [tanggalakhir, settanggalakhir] = useState(new Date())
    const [filternomor, setfilternomor] = useState("")
    const [filtercustomer, setfiltercustomer] = useState("")
    const [filtertipe, setfiltertipe] = useState("")
    const [filtergiro, setfiltergiro] = useState("")

    useEffect(() => {
        var d = new Date();
        var pastYear = d.getFullYear() - 1;
        d.setFullYear(pastYear);
        settanggalawal(d)
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/faktur/penjualan', requestOptions)
            .then(response => response.json())
                .then(data => setDataFaktur(data))
                .catch(err => console.log(err));
        fetch('http://localhost:8000/api/customer', requestOptions)
            .then(response => response.json())
            .then(data => setDataCustomer(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/giro', requestOptions)
            .then(response => response.json())
            .then(data => setDataGiro(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/penjualan', requestOptions)
            .then(response => response.json())
            .then(data => setDataPenjualan(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/penjualan/summary
        
        
    }, []);
    
    const optiongiro = () => {
        if (datagiro == undefined) {
            return (<></>)
        }
        return datagiro.map(detail => {
            return (
                <option value={detail.NomorGiro}>{detail.NomorGiro}</option>
            )
        })
    }
    const selectgiro = () => {
        if(filtertipe == "GIRO"){
            return (
                <>
                    <CLabel>Nomor Giro</CLabel><br/>
                    <CSelect required custom name="giro" id="giro"
                        onChange={e => setfiltergiro(e.target.value)} defaultValue="" >
                        <option selected value="">-</option>
                        {optiongiro()}
                    </CSelect>
                </>
            )
                
        }
        return (<></>)
    }
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
    /*
    .filter(data => {
            let date = new Date(data.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
        .filter(data => data.NomorFaktur == filternomor)
        .filter(data => data.NomorUrut.includes(filtercustomer))
        .filter(data => data.TipePembayaran.includes(filtertipe))
        .filter(data => data.NomorGiro.includes(filtergiro))
    */
    
    const getHeader = () => {
        let print = () => {
            if(props.print == true){
                return <th scope="col">Print Faktur</th>
            }
            return <></>
        }
        return (
            <tr>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Nama Customer</th>
                <th scope="col">CASH/KREDIT/GIRO</th>
                <th scope="col">Jatuh Tempo</th>
                {print()}
            </tr>
        )
    }

    const renderData = () => { 
        if (datafaktur === undefined) {
            return (<></>)
        }
        
        let faktur = datafaktur
        .filter(data => {
            let date = new Date(data.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
        .filter(data => data.NomorFaktur.toString().includes(filternomor))
        .filter(data => data.NomorEntitas.toString().includes(filtercustomer))
        .filter(data => data.TipePembayaran.includes(filtertipe))
        .filter(data => data.NomorGiro.includes(filtergiro))
        componentRef.current = componentRef.current.slice(0, faktur.length);
        return faktur.map((detail,idx) => {
            let tanggal = detail.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let jatuhtempo = () => {
                let tempo = detail.JatuhTempo
                if(tempo.slice(0,4) == "0001"){
                    return "-"
                }
                return tempo.slice(8,10) + "/"+ tempo.slice(5,7) + "/"+tempo.slice(0,4)
            }
            let tipe = () => {
                if(detail.TipePembayaran == "GIRO"){
                    return detail.NomorGiro
                }
                return detail.TipePembayaran
            }
            let customer = () => {
                if(detail.NomorEntitas == "0" || datacustomer == undefined){
                    return "-"
                }
                let customer = datacustomer.find(data => data.NomorUrut == detail.NomorEntitas)
                if(customer == undefined){
                    return "-"
                }
                return customer.NamaCustomer
            }
            let printbutton = () => {
                if(props.print == true){
                    let fakturdata = []
                    if(datafaktur != undefined){
                        fakturdata = datapenjualan.filter(
                            data => data.NomorFaktur.toString().includes(
                                detail.NomorFaktur.toString()
                            )
                        )
                        /*
                        console.log(detail.NomorFaktur.toString())
                        console.log(fakturdata)
                        */
                    }
                    return (
                        <td>
                            <ReactToPrint
                                trigger={() => <CButton color="primary">Print</CButton>}
                                content={() => componentRef.current[idx]}
                            />
                            <ComponentToPrint ref={el => (componentRef.current[idx] = el)} detail={detail} fakturdata={fakturdata} />
                        </td>
                    )
                }
                return <></>
            }
            

            return (
                <tr key={detail.NomorFaktur}>
                    <td>{detail.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{customer()}</td>
                    <td>{tipe()}</td>
                    <td>{jatuhtempo()}</td>
                    {printbutton()}
                </tr>
            )
        })
    }
/**
        <CCol>
            
        </CCol>
        <CCol>
            <CLabel>CASH/KREDIT/GIRO</CLabel><br/>
            <CSelect required custom name="tipepembayaran" id="tipepembayaran"
                onChange={e => setfiltertipe(e.target.value)} >
                <option value="CASH">CASH</option>
                <option value="KREDIT">KREDIT</option>
                <option value="GIRO">GIRO</option>
            </CSelect><br/><br/>
            {selectgiro()}
            </CCol>
        </CRow>
     */
    let printColKosong = () => {
        if(props.print == true){
            return <td colspan="2"></td>
        }
        return <td></td>
    }
    return (
        <table className = "table table-striped table-bordered">
            <thead>
                {getHeader()}
            </thead>
            <tbody>
                <tr>
                    <td>
                        <CLabel>Filter Nomor Faktur</CLabel><br/>
                        <CInput type="number" id="nomor" required
                            onChange={e => setfilternomor(e.target.value)} />
                    </td>
                    <td><CLabel>Tanggal Awal-Akhir</CLabel><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker value={tanggalawal} onChange={settanggalawal} /><br/>
                            <DateTimePicker value={tanggalakhir} onChange={settanggalakhir} />
                        </MuiPickersUtilsProvider>
                    </td>
                    <td><CLabel>Filter Customer</CLabel><br/>
                    <CSelect required custom name="customer" id="customer"
                        onChange={e => setfiltercustomer(e.target.value)} >
                        <option value="">-</option>
                        {optioncustomer()}
                    </CSelect></td>
                    <td><CLabel>CASH/KREDIT/GIRO</CLabel><br/>
                        <CSelect required custom name="tipepembayaran" id="tipepembayaran"
                            onChange={e => setfiltertipe(e.target.value)} >
                            <option value="CASH">CASH</option>
                            <option value="KREDIT">KREDIT</option>
                            <option value="GIRO">GIRO</option>
                        </CSelect><br/><br/>
                        {selectgiro()}
                    </td>
                    <td colspan="2"></td>
                </tr>
                {renderData()}
            </tbody>
        </table>
        
    )
}

export default TableFakturPenjualan