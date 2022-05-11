
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
    CTextarea,
    CCard,
    CCardBody
} from '@coreui/react'

const UpdateToko = (props) => {

    const [nama, setNamaToko] = useState(props.toko.NamaToko)
    const [nomor, setNomorTelepon] = useState(props.toko.NomorTelepon)
    const [alamat, setAlamat] = useState(props.toko.Alamat)
    const [msg, setMessage] = useState("success")
    /*
		{
			nomortoko:
			nama:
			nomor:
			alamat:
		}
	*/

    const update = async e => {
        e.preventDefault()
       let nomortoko = props.toko.NomorToko.toString()
        await fetch('http://localhost:8000/api/toko', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nomortoko,
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
            <CDropdown className="m-1">
              <CDropdownToggle color="info" >
                Update Toko
              </CDropdownToggle>
              <CDropdownMenu style={{width:"200px"}}>
                <CCard>
                  <CCardBody>
                  <CForm className="px-6 py-4" onSubmit={update}  >
                  <CFormGroup>
                    <CLabel >Nama</CLabel>
                    <CInput className="form-control" id="nama" type="text" value={nama}
                    onChange={e => setNamaToko(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >Nomor</CLabel>
                    <CInput className="form-control" id="nama" type="tel" value={nomor}
                    onChange={e => setNomorTelepon(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Alamat </CLabel>
                    <CTextarea 
                        name="alamat" 
                        id="alamat" 
                        rows="9"
                        value={props.toko.Alamat}
                        onChange={e => setAlamat(alamat)} 
                      />          
                      <br/>
                  </CFormGroup>
                  <CFormGroup className="mt-2">
                    <CButton color="primary" type="submit">Update</CButton>
                  </CFormGroup>
                </CForm>
                  </CCardBody>
                </CCard>
                
              </CDropdownMenu>
            </CDropdown>
        )
    }
            
export default UpdateToko