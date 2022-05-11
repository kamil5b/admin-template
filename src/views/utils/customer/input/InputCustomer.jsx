import { CButton, CForm, CInput, CTextarea } from '@coreui/react';
import React, { PureComponent,useState } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const InputCustomer = () => {
    const [nomor, setNomor] = useState("")
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [msg, setMessage] = useState("success")
    const submitCustomer = async e => {
        e.preventDefault()
        
        await fetch('http://localhost:8000/api/customer', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nama,
                nomor,
                alamat
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


    return (
        <CForm onSubmit={submitCustomer}>
            <CInput type="text" id="nama" required
                        onChange={e => setNama(e.target.value)} placeholder="Nama"/><br/>
            <CInput type="tel" id="nomor" required
                        onChange={e => setNomor(e.target.value)} placeholder="Nomor Telepon" /><br/>
            <CTextarea 
                name="alamat" 
                id="alamat" 
                rows="9"
                placeholder="Alamat"
                onChange={e => setAlamat(e.target.value)}
                required 
            /><br/>
            <CButton type="submit" color="primary" className="px-4">Submit Customer</CButton>
        </CForm>
        
    )
}

export default InputCustomer