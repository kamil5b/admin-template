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


const FormPenjualan = () => {
    const [datafaktur, setDataFaktur] = useState([])
    const [databarang, setDataBarang] = useState([])
    const [datasalesman, setDataSalesman] = useState([])
    const [msg, setMessage] = useState("success")

    const [nomorfaktur, setNomorFaktur] = useState(0)
    const [nik, setNIK] = useState("")
    const [kodebarang, setKodeBarang] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [tipequantity, setTipeQuantity] = useState("")
    const [diskontil, setDiskontil] = useState(0)

    useEffect(() => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/faktur/penjualan', requestOptions)
            .then(response => response.json())
            .then(data => setDataFaktur(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/barang
        fetch('http://localhost:8000/api/barang', requestOptions)
            .then(response => response.json())
            .then(data => setDataBarang(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/user', requestOptions)
            .then(response => response.json())
            .then(data => setDataSalesman(data))
            .catch(err => console.log(err));
    }, []);
    const submitPenjualan = async e => {
        e.preventDefault()
        /**
        {
			nomorfaktur:
			quantity:
			tipequantity:
			tipepembayaran:
			kodebarang:
			diskontil:
			nomorcustomer:
			jatuhtempo:
		}
     */
        await fetch('http://localhost:8000/api/penjualan', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nik,
                nomorfaktur,
                quantity,
                tipequantity,
                kodebarang,
                diskontil
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
    const optionsalesman = () => {
        if (datasalesman == undefined) {
            return (<></>)
        }
        return datasalesman.map(detail => {
            return (
                <option value={detail.nik}>{detail.nik} - {detail.name}</option>
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
    
    const totalharga = () => {
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
        return quantitykecil * barang.HargaJualKecil - diskontil
    }

    return (
        <CRow alignHorizontal="center">
            <CCol xl="5" >
                <CCard>
                    <CCardHeader>
                        <h2>Input Data Penjualan</h2>
                    </CCardHeader>
                    <CCardBody>
                        <CForm onSubmit={submitPenjualan}>
                            <CLabel>Nomor Faktur</CLabel>
                            <CSelect required custom name="nomorfaktur" id="nomorfaktur"
                                onChange={e => setNomorFaktur(e.target.value)} >
                                <option value="0">-</option>
                                {optionfaktur()}
                            </CSelect><br/><br/>

                            <CLabel>Salesman</CLabel>
                            <CSelect required custom name="salesman" id="salesman"
                                onChange={e => setNIK(e.target.value)} >
                                <option value="" selected disabled>-</option>
                                {optionsalesman()}
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

                            <CLabel>Diskontil</CLabel><br/>
                            <CInput type="number" id="diskontil" required
                                        onChange={e => setDiskontil(e.target.value)} /><br/>

                            <CLabel>Total Harga Jual</CLabel><br/>
                            <CInput type="number" id="hargajual" disabled placeholder = {totalharga()} /><br/>

                            <CButton type="submit" color="primary" className="px-4">Submit Penjualan</CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        
        
    )
}

export default FormPenjualan