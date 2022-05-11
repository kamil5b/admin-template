
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
    CCol,
    CCardBody,
    CTextarea,
    CRow
} from '@coreui/react'

const FormSales = (props) => {

    const [nominal, setNominal] = useState(props.sales.NominalInsentif)
    const [msg, setMessage] = useState("success")
    /*
		{
			nomorsales:
			insentif:
            nominal:
		}
	*/
    const insentifsales = async e => {
        e.preventDefault()
        let nomorsales = props.sales.NomorSales.toString()
        await fetch('http://localhost:8000/api/sales', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorsales,
              nominal
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
    const buttonIntensif = () => {
        /*
        if(props.sales.Insentif == "SUDAH TURUN"){
            <CButton className="mr-2" color="success" disabled>
                Insentif Sudah Turun
            </CButton>
        }else{*/
            return(
            <CForm  onSubmit={insentifsales}  >
                <CRow>
                    <CCol>
                        <CFormGroup className="mt-2">
                            <CInput type="number" id="insentif" required
                                onChange={e => setNominal(e.target.value)} />
                        </CFormGroup>
                    </CCol>
                    <CCol>
                        <CFormGroup className="mt-2">
                            <CButton color="primary" type="submit">Edit Insentif</CButton>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CForm>
            )
        //}
    }
    return (
            buttonIntensif()
        )
    }
            
export default FormSales