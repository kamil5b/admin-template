
import React, { useState, useEffect } from 'react'
import {
    CRow, 
    CInput, 
    CSelect,
    CLabel,
} from '@coreui/react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';



const TableFakturPembelian = (props) => {
    
    const [datafaktur, setDataFaktur] = useState([])
    const [datatoko, setDataToko] = useState([])
    const [datagiro, setDataGiro] = useState([])
    const [tanggalawal, settanggalawal] = useState(new Date())
    const [tanggalakhir, settanggalakhir] = useState(new Date())
    const [filternomor, setfilternomor] = useState("")
    const [filtertoko, setfiltertoko] = useState("")
    const [filtertipe, setfiltertipe] = useState("")
    const [filtergiro, setfiltergiro] = useState("")

    useEffect(() => {
        var d = new Date();
        var pastYear = d.getFullYear() - 1;
        d.setFullYear(pastYear);
        settanggalawal(d)
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://localhost:8000/api/faktur/pembelian', requestOptions)
            .then(response => response.json())
                .then(data => setDataFaktur(data))
                .catch(err => console.log(err));
        fetch('http://localhost:8000/api/toko', requestOptions)
            .then(response => response.json())
            .then(data => setDataToko(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/giro', requestOptions)
            .then(response => response.json())
            .then(data => setDataGiro(data))
            .catch(err => console.log(err));
        //192.168.1.18:8000/api/penjualan/summary
            
    }, []);
    const optiongiro = () => {
        if (datagiro == undefined) {
            return (<></>)
        }
        return datagiro.map(detail => {
            return (
                <option value={detail.NomorGiro}>{detail.NomorGiro}</option>
            )
        })
    }
    const selectgiro = () => {
        if(filtertipe == "GIRO"){
            return (
                <>
                    <CLabel>Nomor Giro</CLabel><br/>
                    <CSelect required custom name="giro" id="giro"
                        onChange={e => setfiltergiro(e.target.value)} defaultValue="" >
                        <option selected value="">-</option>
                        {optiongiro()}
                    </CSelect>
                </>
            )
                
        }
        return (<></>)
    }
    const optiontoko = () => {
        if (datatoko == undefined) {
            return (<></>)
        }
        return datatoko.map(detail => {
            return (
                <option value={detail.NomorToko}>{detail.NomorToko} - {detail.NamaToko}</option>
            )
        })
    }
    /*
    .filter(data => {
            let date = new Date(data.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
        .filter(data => data.NomorFaktur == filternomor)
        .filter(data => data.NomorCustomer.includes(filtercustomer))
        .filter(data => data.TipePembayaran.includes(filtertipe))
        .filter(data => data.NomorGiro.includes(filtergiro))
    */
   
    const getHeader = () => {
        return (
            <tr>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Nama Toko</th>
                <th scope="col">CASH/KREDIT/GIRO</th>
                <th scope="col">Jatuh Tempo</th>
            </tr>
        )
    }

    const renderData = () => { 
        console.log(props)
        if (datafaktur === undefined) {
            return (<></>)
        }
        let faktur = datafaktur
        .filter(data => {
            let date = new Date(data.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
        .filter(data => data.NomorFaktur.toString().includes(filternomor))
        .filter(data => data.NomorEntitas.toString().includes(filtertoko))
        .filter(data => data.TipePembayaran.includes(filtertipe))
        .filter(data => data.NomorGiro.includes(filtergiro))
        return faktur.map(detail => {
            let tanggal = detail.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let jatuhtempo = () => {
                let tempo = detail.JatuhTempo
                if(tempo.slice(0,4) == "0001"){
                    return "-"
                }
                return tempo.slice(8,10) + "/"+ tempo.slice(5,7) + "/"+tempo.slice(0,4)
            }
            let tipe = () => {
                if(detail.TipePembayaran == "GIRO"){
                    return detail.NomorGiro
                }
                return detail.TipePembayaran
            }
            let toko = () => {
                if(detail.NomorEntitas == "0" || datatoko == undefined){
                    return "-"
                }
                let toko = datatoko.find(data => data.NomorToko == detail.NomorEntitas)
                if(toko == undefined){
                    return "-"
                }
                return toko.NamaToko
            }
            return (
                <tr key={detail.NomorFaktur}>
                    <td>{detail.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{toko()}</td>
                    <td>{tipe()}</td>
                    <td>{jatuhtempo()}</td>
                </tr>
            )
        })
    }
/**
        <CCol>
            
        </CCol>
        <CCol>
            <CLabel>CASH/KREDIT/GIRO</CLabel><br/>
            <CSelect required custom name="tipepembayaran" id="tipepembayaran"
                onChange={e => setfiltertipe(e.target.value)} >
                <option value="CASH">CASH</option>
                <option value="KREDIT">KREDIT</option>
                <option value="GIRO">GIRO</option>
            </CSelect><br/><br/>
            {selectgiro()}
            </CCol>
        </CRow>
     */
    return (
        <table className = "table table-striped table-bordered">
            <thead>
                {getHeader()}
            </thead>
            <tbody>
                <tr>
                    <td>
                        <CLabel>Filter Nomor Faktur</CLabel><br/>
                        <CInput type="number" id="nomor" required
                            onChange={e => setfilternomor(e.target.value)} />
                    </td>
                    <td><CLabel>Tanggal Awal-Akhir</CLabel><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker value={tanggalawal} onChange={settanggalawal} /><br/>
                            <DateTimePicker value={tanggalakhir} onChange={settanggalakhir} />
                        </MuiPickersUtilsProvider>
                    </td>
                    <td><CLabel>Filter Toko</CLabel><br/>
                    <CSelect required custom name="toko" id="toko"
                        onChange={e => setfiltertoko(e.target.value)} >
                        <option value="">-</option>
                        {optiontoko()}
                    </CSelect></td>
                    <td><CLabel>CASH/KREDIT/GIRO</CLabel><br/>
            <CSelect required custom name="tipepembayaran" id="tipepembayaran"
                onChange={e => setfiltertipe(e.target.value)} >
                <option value="CASH">CASH</option>
                <option value="KREDIT">KREDIT</option>
                <option value="GIRO">GIRO</option>
            </CSelect><br/><br/>
            {selectgiro()}</td>
                    <td></td>
                </tr>
                {renderData()}
            </tbody>
        </table>
        
    )
}

export default TableFakturPembelian