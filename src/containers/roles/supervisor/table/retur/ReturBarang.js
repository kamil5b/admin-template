
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

const ReturBarang = (props) => {

    const [quantity, setQuantity] = useState(0)
    const [diskontil, setDiskontil] = useState(props.data.DiskontilPembelian)
    const [desc, setDescription] = useState("")
    const [msg, setMessage] = useState("success")
    /*
		{
			nomorfaktur:
			quantity:
			tipequantity:
			kodebarang:
			diskontil:
			desc:
		}
	*/
    const update = async e => {
        e.preventDefault()
        let nomorfaktur = props.data.NomorFaktur.toString()
        let kodebarang = props.data.KodeBarang
        let tipequantity = props.data.TipeQuantity
        await fetch('http://localhost:8000/api/retur', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              nomorfaktur,
              quantity,
              tipequantity,
              kodebarang,
              diskontil,
              desc
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
                Retur Barang
              </CDropdownToggle>
              <CDropdownMenu style={{width:"200px"}}>
                <CCard>
                  <CCardBody>
                  <CForm className="px-6 py-4" onSubmit={update}  >

                  
                  <CLabel>Quantity</CLabel><br/>
                  <CInput type="number" id="quantity" required
                        onChange={e => setQuantity(e.target.value)} /><br/>

                  <CLabel>Tipe Quantity</CLabel>
                  <CInput type="number" id="tipequantity" value={props.data.TipeQuantity}
                  placeholder={props.data.TipeQuantity} disabled /><br/>

                  <CLabel>Diskontil</CLabel><br/>
                  <CInput type="number" id="diskontil" required
                        onChange={e => setDiskontil(e.target.value)} /><br/>

                  <CLabel>Description</CLabel><br/>
                  <CTextarea 
                      name="desc" 
                      id="desc" 
                      rows="4"
                      onChange={e => setDescription(e.target.value)}
                      required 
                  /><br/>

                  <CFormGroup className="mt-2">
                    <CButton color="primary" type="submit">Retur</CButton>
                  </CFormGroup>
                </CForm>
                  </CCardBody>
                </CCard>
                
              </CDropdownMenu>
            </CDropdown>
        )
    }
            
export default ReturBarang