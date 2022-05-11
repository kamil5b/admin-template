

    import { 
        CButton, 
        CForm, 
        CInput, 
        CSelect,
        CLabel,
        CCard,
        CCardHeader,
        CCardBody,
        CRow,
        CCol
    } from '@coreui/react';
    import React, { PureComponent,useState,useEffect } from 'react'
    import DateFnsUtils from '@date-io/date-fns';
    import {
      DatePicker,
      MuiPickersUtilsProvider,
    } from '@material-ui/pickers';
    
    
    const FormBarang = () => {

        const [kode, setKodeBarang] = useState("")
        const [nama, setNamaBarang] = useState("")
        const [tipebig, setTipeBig] = useState("")
        const [btm, setBTM] = useState(0)
        const [tipemedium, setTipeMedium] = useState("")
        const [mts, setMTS] = useState(0)
        const [tipesmall, setTipeSmall] = useState("")
        const [hargakecil, setHargaKecil] = useState(0)
        const [tipebarang, setTipeBarang] = useState("")
        const [msg, setMessage] = useState("success")
        const submitBarang = async e => {
            e.preventDefault()
             /*
                kode:
                nama:
                tipebig:
                btm:
                tipemedium:
                mts:
                tipesmall:
                hargakecil:
                tipebarang:
	        */
            await fetch('http://localhost:8000/api/barang', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    kode,
                    nama,
                    tipebig,
                    btm,
                    tipemedium,
                    mts,
                    tipesmall,
                    hargakecil,
                    tipebarang,
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
            <CRow alignHorizontal="center">
                <CCol xl="5" >
                    <CCard>
                        <CCardHeader>
                            <h2>Input Data Barang</h2>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={submitBarang}>

                                <CLabel>Kode Barang</CLabel><br/>
                                <CInput type="text" id="kodebarang" required maxLength={15}
                                            onChange={e => setKodeBarang(e.target.value)} /><br/>
                                            
                                <CLabel>Nama Barang</CLabel><br/>
                                <CInput type="text" id="nama" required
                                            onChange={e => setNamaBarang(e.target.value)} /><br/>

                                 <CLabel>Tipe Quantity Besar</CLabel><br/>
                                <CInput type="text" id="bigqty" required 
                                            onChange={e => setTipeBig(e.target.value)} /><br/>

                                 <CLabel>Tipe Quantity Sedang</CLabel><br/>
                                <CInput type="text" id="medqty" required 
                                            onChange={e => setTipeMedium(e.target.value)} /><br/>

                                <CLabel>Tipe Quantity Kecil</CLabel><br/>
                                <CInput type="text" id="smallqty" required 
                                            onChange={e => setTipeSmall(e.target.value)} /><br/>

                                <CLabel>{tipebig} ke {tipemedium}</CLabel><br/>
                                <CInput type="text" id="btm" required 
                                            onChange={e => setBTM(e.target.value)} /><br/>
                                            
                                <CLabel>{tipemedium} ke {tipesmall}</CLabel><br/>
                                <CInput type="number" id="mts" required 
                                            onChange={e => setMTS(e.target.value)} /><br/>

                                 <CLabel>Harga per {tipesmall}</CLabel><br/>
                                <CInput type="number" id="hargakecil" required
                                            onChange={e => setHargaKecil(e.target.value)} /><br/>

                                 <CLabel>Tipe Barang</CLabel><br/>
                                 <CSelect defaultValue="BARANG JUAL" required custom name="tipebarang" id="tipebarang"
                                    onChange={e => setTipeBarang(e.target.value)} >
                                    <option value="BARANG JUAL">BARANG JUAL</option>
                                    <option value="INVENTARIS">INVENTARIS</option>
                                    <option value="ASSET">ASSET</option>
                                </CSelect><br/><br/>

                                <CButton type="submit" color="primary" className="px-4">Submit Barang</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
            
        )
    }
    
    export default FormBarang