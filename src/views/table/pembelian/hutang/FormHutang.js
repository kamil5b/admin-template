
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

const FormHutang = (props) => {

    const [bayar, setBayar] = useState(0)
    const [naik, setNaik] = useState(0)
    const [msg, setMessage] = useState("success")
    const [tanggalbayar,setTanggalBayar] = useState(new Date())
    const [tanggalnaik,setTanggalNaik] = useState(new Date())
    /*
		{
			nomorhutang:
			bayar:
		}
	*/
    const bayarhutang = async e => {
        e.preventDefault()
        let nomorhutang = props.hutang.NomorHutang.toString()
        let tanggal = tanggalbayar
        await fetch('http://localhost:8000/api/hutang/bayar', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorhutang,
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

    const naikhutang = async e => {
        e.preventDefault()
        let nomorhutang = props.hutang.NomorHutang.toString()
        let tanggal = tanggalnaik
        await fetch('http://localhost:8000/api/hutang/naik', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorhutang,
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
                Menu Hutang
              </CDropdownToggle>
              <CDropdownMenu style={{width:"200px"}}>
                <CCard>
                  <CCardBody>
                  <CForm className="px-6 py-4" onSubmit={bayarhutang}  >

                        <CLabel>Bayar Hutang</CLabel><br/>
                        <CInput type="number" id="bayar" required
                                onChange={e => setBayar(e.target.value)} /><br/><br/>
                         <CLabel>Tanggal Bayar</CLabel><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DateTimePicker value={tanggalbayar} onChange={setTanggalBayar} />
                        </MuiPickersUtilsProvider><br/>
                        <CFormGroup className="mt-2">
                            <CButton color="primary" type="submit">Bayar Hutang</CButton>
                        </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard>
                  <CCardBody>
                  <CForm className="px-6 py-4" onSubmit={naikhutang}  >

                        <CLabel>Naik Hutang</CLabel><br/>
                        <CInput type="number" id="naik" required
                                onChange={e => setNaik(e.target.value)} /><br/><br/>
                        <CLabel>Tanggal Naik</CLabel><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DateTimePicker value={tanggalnaik} onChange={setTanggalNaik} />
                        </MuiPickersUtilsProvider><br/>

                        <CFormGroup className="mt-2">
                            <CButton color="primary" type="submit">Naik Hutang</CButton>
                        </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CDropdownMenu>
            </CDropdown>
        )
    }
            
export default FormHutang