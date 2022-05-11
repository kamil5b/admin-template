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
    const [datatoko, setDataToko] = useState([])
    const [tipepembayaran, setTipePembayaran] = useState("CASH")
    const [jatuhtempo, setJatuhTempo] = useState(new Date())
    const [toko, setNomorToko] = useState(0)
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/giro', requestOptions)
            .then(response => response.json())
            .then(data => setDataGiro(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/toko', requestOptions)
            .then(response => response.json())
            .then(data => setDataToko(data))
            .catch(err => console.log(err));
    }, [])
    const submitFaktur = async e => {
        e.preventDefault()
        let nomor = nmr
        let nomortoko = toko
        await fetch('http://localhost:8000/api/faktur/pembelian', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nomor,
                tanggal,
                tipepembayaran,
                nomortoko,
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
            <CLabel>Nomor Toko</CLabel><br/>
            <CSelect required custom name="toko" id="toko"
                onChange={e => setNomorToko(e.target.value)} >
                <option value="0" selected disabled>-</option>
                {optiontoko()}
            </CSelect><br/><br/>

            <CLabel>CASH/KREDIT/GIRO</CLabel><br/>
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