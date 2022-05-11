import React, {useState} from 'react'
import  { Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CSelect,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Register = () => {

  const [name, setNama] = useState('')
  const [nik, setNIK] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [role, setRole] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  //ROLES = "ADMIN", "FAKTUR", "PENJUALAN", "PEMBELIAN", "MEMBER"

  const submit = async e => {
    e.preventDefault()
    if(password===password2){
      await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            name,
            nik,
            password,
            role,
          })
        });

      setRedirect(true);
    }
  }
  
  if (redirect) {
    return <Redirect to="/"/>;
  }

  const roles = ["ADMIN","SUPERVISOR","SALESMAN","GUDANG","PENJUALAN","PEMBELIAN","PENAGIHAN"]

  const optionroles = () => {

    return roles.map(role => {
        return (
            <option value={role}>{role}</option>
        )
    })
} 

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={submit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Nama Lengkap (KTP)" autoComplete="Nama" 
                      onChange={e => setNama(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="NIK" autoComplete="NIK" 
                      onChange={e => setNIK(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" 
                       onChange={e => setPassword(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password" 
                       onChange={e => setPassword2(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend> 
                    <CSelect onChange={e => setRole(e.target.value)}>
                        <option disabled selected>-</option>
                        {optionroles()}
                    </CSelect>
                  </CInputGroup>
                  <CButton type="submit" color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
