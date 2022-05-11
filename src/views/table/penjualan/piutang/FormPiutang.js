
import React, { useState, useEffect } from 'react'


import {
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CButton,
    CSelect,
    CCard,
    CCardBody,
    CTextarea
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const FormPiutang = (props) => {
    const [msg, setMessage] = useState("success")
    const [bayar, setBayar] = useState(0)
    const [naik, setNaik] = useState(0)
    const [tanggalbayar,setTanggalBayar] = useState(new Date())
    const [tanggalnaik,setTanggalNaik] = useState(new Date())
    /*
		{
			nomorpiutang:
			bayar:
		}
	*/
    const bayarpiutang = async e => {
        e.preventDefault()
        let tanggal = tanggalbayar
        let nomorpiutang = props.piutang.NomorPiutang.toString()
        console.log(JSON.stringify({
          nomorpiutang,
          bayar
        }))
        await fetch('http://localhost:8000/api/piutang/bayar', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorpiutang,
              bayar,
              tanggal
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

    const naikpiutang = async e => {
        e.preventDefault()
        let tanggal = tanggalbayar
        let nomorpiutang = props.piutang.NomorPiutang.toString()
        await fetch('http://localhost:8000/api/piutang/naik', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorpiutang,
              naik,
              tanggal
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
            <CDropdown className="m-1">
              <CDropdownToggle color="info" >
                Menu Piutang
              </CDropdownToggle>
              <CDropdownMenu style={{width:"200px"}}>
                <CCard>
                  <CCardBody>
                    <CForm className="px-6 py-4" onSubmit={bayarpiutang}  >

                        <CLabel>Bayar Piutang</CLabel><br/>
                        <CInput type="number" id="bayar" required
                                onChange={e => setBayar(e.target.value)} /><br/><br/>
                        <CLabel>Tanggal Bayar</CLabel><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DateTimePicker value={tanggalbayar} onChange={setTanggalBayar} />
                        </MuiPickersUtilsProvider><br/>
                        <CFormGroup className="mt-2">
                            <CButton color="primary" type="submit">Bayar Piutang</CButton>
                        </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard>
                  <CCardBody>
                  <CForm className="px-6 py-4" onSubmit={naikpiutang}  >

                        <CLabel>Naik Piutang</CLabel><br/>
                        <CInput type="number" id="naik" required
                                onChange={e => setNaik(e.target.value)} /><br/><br/>
                        <CLabel>Tanggal Naik</CLabel><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DateTimePicker value={tanggalnaik} onChange={setTanggalNaik} />
                        </MuiPickersUtilsProvider><br/>
                        <CFormGroup className="mt-2">
                            <CButton color="primary" type="submit">Naik Piutang</CButton>
                        </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CDropdownMenu>
            </CDropdown>
        )
    }
            
export default FormPiutang