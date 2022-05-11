
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
    CCardBody
} from '@coreui/react'

const UpdateBarang = (props) => {

    const [nama, setNamaBarang] = useState(props.barang.NamaBarang)
    const [tipebig, setTipeBig] = useState(props.barang.TipeBigQty)
    const [btm, setBTM] = useState(props.barang.BigToMedium.toString())
    const [tipemedium, setTipeMedium] = useState(props.barang.TipeMediumQty)
    const [mts, setMTS] = useState(props.barang.MediumToSmall.toString())
    const [tipesmall, setTipeSmall] = useState(props.barang.TipeSmallQty)
    const [hargakecil, setHargaKecil] = useState(props.barang.HargaJualKecil.toString())
    const [tipebarang, setTipeBarang] = useState(props.barang.TipeBarang)
    const [msg, setMessage] = useState("success")
    /*
		{
			nomorbarang:
			nama:
			nomor:
			alamat:
		}
	*/

    const update = async e => {
        e.preventDefault()
        let kode = props.barang.KodeBarang
        await fetch('http://localhost:8000/api/barang/update', {
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
            <CDropdown className="m-1">
              <CDropdownToggle split color="info" >
                Update Barang
              </CDropdownToggle>
              <CDropdownMenu style={{width:"200px"}}>
                <CCard>
                  <CCardBody>
                  <CForm className="px-6 py-4" onSubmit={update}  >

                  <CFormGroup>
                    <CLabel >Nama Barang</CLabel>
                    <CInput className="form-control" type="text" value={nama}
                    onChange={e => setNamaBarang(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >Tipe Quantity Besar</CLabel>
                    <CInput className="form-control" type="text" value={tipebig}
                    onChange={e => setTipeBig(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >{tipebig} ke {tipemedium}</CLabel>
                    <CInput className="form-control" type="number" value={btm}
                    onChange={e => setBTM(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >Tipe Quantity Sedang</CLabel>
                    <CInput className="form-control" type="text" value={tipemedium}
                    onChange={e => setTipeMedium(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >{tipemedium} ke {tipesmall}</CLabel>
                    <CInput className="form-control" type="text" value={mts}
                    onChange={e => setMTS(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >Tipe Quantity Small</CLabel>
                    <CInput className="form-control" type="text" value={tipesmall}
                    onChange={e => setTipeSmall(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >Harga Kecil</CLabel>
                    <CInput className="form-control" type="text" value={hargakecil}
                    onChange={e => setHargaKecil(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel >Nama</CLabel>
                    <CSelect defaultValue="" custom name="tipebarang" id="tipebarang" value={tipebarang}
                        onChange={e => setTipeBarang(e.target.value)} >
                        <option selected value="BARANG JUAL">BARANG JUAL</option>
                        <option value="INVENTARIS">INVENTARIS</option>
                        <option value="ASSET">ASSET</option>
                    </CSelect>
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
            
export default UpdateBarang