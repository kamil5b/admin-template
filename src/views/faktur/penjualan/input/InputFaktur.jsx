import { 
    CButton, 
    CForm, 
    CInput, 
    CSelect,
    CLabel,
} from '@coreui/react';
import React, { PureComponent,useState, useEffect } from 'react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const InputFaktur = () => {
    const [nmr, setFaktur] = useState(0)
    const [tanggal, handleDateChange] = useState(new Date());
    const [msg, setMessage] = useState("success")

    const [datagiro, setDataGiro] = useState([])
    const [datacustomer, setDataCustomer] = useState([])
    const [tipepembayaran, setTipePembayaran] = useState("CASH")
    const [jatuhtempo, setJatuhTempo] = useState(new Date())
    const [customer, setNomorUrut] = useState(0)
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/giro', requestOptions)
            .then(response => response.json())
            .then(data => setDataGiro(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/customer', requestOptions)
            .then(response => response.json())
            .then(data => setDataCustomer(data))
            .catch(err => console.log(err));
    }, [])
    const submitFaktur = async e => {
        e.preventDefault()
        let nomorcustomer = customer
        let nomor = nmr
        
        await fetch('http://localhost:8000/api/faktur/penjualan', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nomor,
                tanggal,
                tipepembayaran,
                nomorcustomer,
                jatuhtempo
            })
        }).then(response => response.json())
        .then(data => setMessage(data))
        .catch(err => console.log(err));
        if(msg != "success"){
            alert(msg)
            setMessage("success")
        };
        window.location.reload();
    }
    
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
    const jatuhtempokredit = () => {
        if (tipepembayaran === "KREDIT"){
            return(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    
                    <CLabel>Jatuh Tempo</CLabel><br/>
                    <DatePicker value={jatuhtempo} onChange={setJatuhTempo}/>
            <br/><br/>
                </MuiPickersUtilsProvider>
            )
            
        }else{
            return (<></>)
        }
    }

    return (
        <CForm onSubmit={submitFaktur}>
            <CInput type="number" id="nomor" required
                        onChange={e => setFaktur(e.target.value)} /><br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker value={tanggal} onChange={handleDateChange} />
            </MuiPickersUtilsProvider><br/><br/>
            <CLabel>Nomor Customer</CLabel><br/>
            <CSelect required custom name="customer" id="customer"
                onChange={e => setNomorUrut(e.target.value)} >
                <option value="0" selected disabled>-</option>
                {optioncustomer()}
            </CSelect><br/><br/>

            <CLabel>CASH/KREDIT/GIRO</CLabel>
            <CSelect required custom name="tipepembayaran" id="tipepembayaran"
                onChange={e => setTipePembayaran(e.target.value)} >
                <option value="CASH">CASH</option>
                <option value="KREDIT">KREDIT</option>
                {optiongiro()}
            </CSelect><br/><br/>

            {jatuhtempokredit()}
            <CButton type="submit" color="primary" className="px-4">Submit Faktur Penjualan</CButton>
        </CForm>
        
    )
}

export default InputFaktur