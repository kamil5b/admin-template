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


const FormPembelian = () => {
    const [datafaktur, setDataFaktur] = useState([])
    const [databarang, setDataBarang] = useState([])
    const [msg, setMessage] = useState("success")
    

    const [nomorfaktur, setNomorFaktur] = useState(0)
    const [kodebarang, setKodeBarang] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [tipequantity, setTipeQuantity] = useState("")
    const [diskontil, setDiskontil] = useState(0)
    const [expired, setExpired] = useState(new Date())
    const [hargabeli, setHargaBeli] = useState(0)

    useEffect(() => {
        /**
     {
        "nomorfaktur":"7",
        "quantity":"3",
        "tipequantity":"karton",
        "tipepembayaran":"150210212182",
        "nomortoko":"2",
        "kodebarang":"8992695190208",
        "expired":"24-09-2024",
        "hargabelikecil":"13500",
        "diskontil":"1500"
    }
     */
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/faktur/pembelian', requestOptions)
            .then(response => response.json())
            .then(data => setDataFaktur(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/barang
        fetch('http://localhost:8000/api/barang', requestOptions)
            .then(response => response.json())
            .then(data => setDataBarang(data))
            .catch(err => console.log(err));
    }, []);
    const submitPembelian = async e => {
        e.preventDefault()
        
        await fetch('http://localhost:8000/api/pembelian', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nomorfaktur,
                quantity,
                tipequantity,
                kodebarang,
                expired,
                hargabeli,
                diskontil,
            })
        })
        .then(response => response.json())
        .then(data => setMessage(data))
        .catch(err => console.log(err));
        if(msg != "success"){
            alert(msg)
setMessage("success")
        }
        window.location.reload();
    }

    const optionfaktur = () => {
        if (datafaktur == undefined) {
            return (<></>)
        }
        return datafaktur.map(detail => {
            let tanggal = detail.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            return (
                <option value={detail.NomorFaktur} >{detail.NomorFaktur} - {date}</option>
            )
        })
    }

    const optionbarang = () => {
        if (databarang == undefined) {
            return (<></>)
        }
        return databarang.map(detail => {
            return (
                <option value={detail.KodeBarang}>{detail.KodeBarang} - {detail.NamaBarang}</option>
            )
        })
    }

    const optiontipe = () => {
        if (kodebarang === "") {
            return (<></>)
        }
        let barang = (databarang.find(brg => brg.KodeBarang === kodebarang))
        return (
            <>
            <option key={barang.TipeBigQty} value={barang.TipeBigQty}>{barang.TipeBigQty}</option>
            <option key={barang.TipeMediumQty}  value={barang.TipeMediumQty}>{barang.TipeMediumQty}</option>
            <option key={barang.TipeSmallQty}  value={barang.TipeSmallQty}>{barang.TipeSmallQty}</option>
            </>
        )
    }
    
    const hargasatuan = () => {
        if (kodebarang === "") {
            return 0
        }
        let barang = (databarang.find(brg => brg.KodeBarang === kodebarang))
        let quantitykecil = 0
        if (tipequantity === barang.TipeSmallQty){
            quantitykecil = quantity
        }else if (tipequantity === barang.TipeMediumQty){
            quantitykecil = quantity * barang.MediumToSmall
        }else if (tipequantity === barang.TipeBigQty){
            quantitykecil = quantity * barang.BigToMedium * barang.MediumToSmall
        }
        return (hargabeli - diskontil)/(quantitykecil)
    }

    return (
        <CRow alignHorizontal="center">
            <CCol xl="5" >
                <CCard>
                    <CCardHeader>
                        <h2>Input Data Pembelian</h2>
                    </CCardHeader>
                    <CCardBody>
                        <CForm onSubmit={submitPembelian}>
                            <CLabel>Nomor Faktur</CLabel>
                            <CSelect required custom name="nomorfaktur" id="nomorfaktur"
                                onChange={e => setNomorFaktur(e.target.value)} >
                                <option value="0">-</option>
                                {optionfaktur()}
                            </CSelect><br/><br/>

                            <CLabel>Kode Barang</CLabel>
                            <CSelect required custom name="kodebarang" id="kodebarang"
                                onChange={e => setKodeBarang(e.target.value)} >
                                <option value="" selected disabled>-</option>
                                {optionbarang()}
                            </CSelect><br/><br/>

                            <CLabel>Quantity</CLabel><br/>
                            <CInput type="number" id="quantity" required
                                        onChange={e => setQuantity(e.target.value)} /><br/>

                            <CLabel>Tipe Quantity</CLabel>
                            <CSelect required custom name="tipequantity" id="tipequantity"
                                onChange={e => setTipeQuantity(e.target.value)} >
                                <option value="" selected disabled>-</option>
                                {optiontipe()}
                            </CSelect><br/><br/>

                            <CLabel>Harga Beli</CLabel><br/>
                            <CInput type="number" id="hargabeli" required
                                        onChange={e => setHargaBeli(e.target.value)} /><br/>

                            <CLabel>Diskontil</CLabel><br/>
                            <CInput type="number" id="diskontil" required
                                        onChange={e => setDiskontil(e.target.value)} /><br/>

                            <CLabel>Harga Per Satuan</CLabel><br/>
                            <CInput type="number" id="satuan" disabled placeholder = {hargasatuan()} /><br/>
                

                            <CLabel>Expired</CLabel><br/>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker value={expired} onChange={setExpired}/>
                            </MuiPickersUtilsProvider><br/><br/>

                            <CButton type="submit" color="primary" className="px-4">Submit Pembelian</CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        
        
    )
}

export default FormPembelian