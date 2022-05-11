
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

const UpdateCustomer = (props) => {

    const [nama, setNamaCustomer] = useState(props.customer.NamaCustomer)
    const [nomor, setNomorTelepon] = useState(props.customer.NomorHP)
    const [alamat, setAlamat] = useState(props.customer.Alamat)
    const [msg, setMessage] = useState("success")
    /*
		{
			nomorcustomer:
			nama:
			nomor:
			alamat:
		}
	*/

    const update = async e => {
        e.preventDefault()
       let nomorcustomer = props.customer.NomorUrut.toString()
        await fetch('http://localhost:8000/api/customer', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nomorcustomer,
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
                Update Customer
              </CDropdownToggle>
              <CDropdownMenu style={{width:"200px"}}>
                <CCard>
                  <CCardBody>
                  <CForm className="px-6 py-4" onSubmit={update}  >
                  <CFormGroup>
                    <CLabel >Nama</CLabel>
                    <CInput className="form-control" id="nama" type="text" value={nama}
                    onChange={e => setNamaCustomer(e.target.value)} />
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
                        value={props.customer.Alamat}
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
            
export default UpdateCustomer