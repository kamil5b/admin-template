import { CButton, CForm, CInput, CLabel, CSelect } from '@coreui/react';
import React, { PureComponent,useState, useEffect } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


const InputGiro = () => {
    const [nomorgiro, setNomorGiro] = useState("")
    const [nominal, setNominal] = useState("");
    const [tanggal, setTanggalGiro] = useState(new Date());
    const [bank, setNomorBank] = useState(0)
    const [databank, setDataBank] = useState([])
    const [msg, setMessage] = useState("success")
    useEffect(() => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/bank', requestOptions)
            .then(response => response.json())
            .then(data => setDataBank(data))
            .catch(err => console.log(err));

    }, [])

    const submitGiro = async e => {
        e.preventDefault()
        /*
		{
			nomorgiro:
			nominal:
			tanggal:
			nomorbank:
		}
	    */
       let nomorbank = bank.toString()
        await fetch('http://localhost:8000/api/giro', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nomorgiro,
                nominal,
                tanggal,
                nomorbank
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
    const optionbank = () => {
        return databank.map(detail => {
            return (
                <option value={detail.NomorBank}>{detail.NomorBank} - {detail.NamaBank}</option>
            )
        })
    }
    return (
        <CForm onSubmit={submitGiro}>
            <CLabel>Nomor Giro</CLabel><br/>
            <CInput type="text" id="nomorgiro" required
                        onChange={e => setNomorGiro(e.target.value)} maxLength={15}/><br/>
            
            <CLabel>Nominal</CLabel><br/>
            <CInput type="number" id="nominal" required
                        onChange={e => setNominal(e.target.value)}/><br/>

            <CLabel>Tanggal Efektif Giro</CLabel><br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={tanggal} onChange={setTanggalGiro}/>
            </MuiPickersUtilsProvider><br/><br/>

            <CLabel>Bank</CLabel>
                <CSelect required custom name="bank" id="bank"
                    onChange={e => setNomorBank(e.target.value)} >
                {optionbank()}
            </CSelect><br/><br/>
            
            <CButton type="submit" color="primary" className="px-4">Submit Giro</CButton>
        </CForm>
        
    )
}

export default InputGiro