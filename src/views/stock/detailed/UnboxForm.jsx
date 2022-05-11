
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
    CSelect
} from '@coreui/react'

const UnboxForm = (props) => {
    const [tipequantity, setTipeQuantity] = useState(props.stock.BarangStock.TipeBigQty)
    const [quantity, setQuantity] = useState(0)
    const [msg, setMessage] = useState("success")


    const optiontipe = () => {
      return (
          <>
          <option key={props.stock.BarangStock.TipeBigQty} value={props.stock.BarangStock.TipeBigQty}>{props.stock.BarangStock.TipeBigQty}</option>
          <option key={props.stock.BarangStock.TipeMediumQty}  value={props.stock.BarangStock.TipeMediumQty}>{props.stock.BarangStock.TipeMediumQty}</option>
          </>
      )
    } 

    const hasil = () => {
      if(tipequantity===props.stock.BarangStock.TipeBigQty){
        return props.stock.MediumQty + (quantity * props.stock.BarangStock.BigToMedium)
      }
      if(tipequantity===props.stock.BarangStock.TipeMediumQty){
        return props.stock.SmallQty + (quantity * props.stock.BarangStock.MediumToSmall)
      }
      return 0
    }

    const unboxing = async e => {
        e.preventDefault()
        /**
        /*
          {
            nomorstock :
            quantity :
            tipequantity :
          }
        */
       let nomorstock = props.stock.NomorStock.toString()
        await fetch('http://localhost:8000/api/stock/unbox', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nomorstock,
                quantity,
                tipequantity
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
              <CDropdownToggle color="info">
                Unbox
              </CDropdownToggle>
              <CDropdownMenu placement="right">
                <CForm className="px-4 py-3" onSubmit={unboxing} >
                  <CFormGroup>
                    <CLabel >Quantity</CLabel>
                    <CInput className="form-control" id="quantity" type="number" placeholder={0}
                    onChange={e => setQuantity(e.target.value)} />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Tipe Quantity</CLabel>
                      <CSelect required custom name="tipequantity" id="tipequantity"
                          onChange={e => setTipeQuantity(e.target.value)} >
                          {optiontipe()}
                      </CSelect><br/>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Hasil Unbox </CLabel>
                    <CInput className="form-control" id="postquantity" type="number" disabled placeholder={hasil()}/>
                    <br/>
                  </CFormGroup>
                  <CFormGroup className="mt-2">
                    <CButton color="primary" type="submit">Unbox</CButton>
                  </CFormGroup>
                </CForm>
              </CDropdownMenu>
            </CDropdown>
        )
    }
            
export default UnboxForm