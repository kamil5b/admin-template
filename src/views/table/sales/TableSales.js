import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect,CButton
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const TableSales = () => {

    const [datasales, setDataSales] = useState([])
    const [msg, setMessage] = useState("success")
    const [filternomor, setFilterNomor] = useState("") //NOMOR SALES
    const [filternik, setFilterNIK] = useState("") //NIK SALES
    const [filternama, setFilterNama] = useState("")  //NAMA SALES
    const [filterfaktur, setFilterFaktur] = useState("") //NOMOR FAKTUR
    const [filterinsentif, setFilterInsentif] = useState("") //NOMOR FAKTUR

    const [tanggalawal,setTanggalAwal] = useState(new Date())
    const [tanggalakhir,setTanggalAkhir] = useState(new Date())

    useEffect(() => {
        var d = new Date();
        var pastYear = d.getFullYear() - 1;
        d.setFullYear(pastYear);
        setTanggalAwal(d)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8000/api/sales', requestOptions)
            .then(response => response.json())
            .then(data => setDataSales(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    const getHeaderSales = () => {
        return (
            <tr>
                <th scope="col">Nomor Sales</th>
                <th scope="col">NIK</th>
                <th scope="col">Nama Sales</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Total Penjualan</th>
                <th scope="col">Insentif</th>
                <th scope="col">Insentif Edit</th>
            </tr>
        )
    }
    const insentifbutton = (e) => {
        let insentif = e.target.value
        let nomorsales = e.target.name
        console.log({insentif,nomorsales})
        fetch('http://localhost:8000/api/sales', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
               nomorsales, 
               insentif
            })
        }).then(response => response.json())
        .then(data => setMessage(data))
        .catch(err => console.log(err));
        if(msg != "success"){
            alert(msg)
setMessage("success")
        };
        window.location.reload();
        return false;
    }
    const renderDataSales = () => {
        if(datasales.message != undefined){
            alert(datasales.message)
            return <></>
        }
        let sales = datasales
        .filter(data => {
            let date = new Date(data.FakturPenjualan.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
        .filter(data => data.Karyawan.name.includes(filternama))
        .filter(data => data.Karyawan.nik.includes(filternik))
        .filter(data => data.FakturPenjualan.NomorFaktur.toString().includes(filterfaktur))
        .filter(data => data.NomorSales.toString().includes(filternomor))
        return sales.map(data => {
            let tanggal = data.FakturPenjualan.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            let buttons = (
                <>
                <CButton className="mr-2" color="success" 
                onClick={insentifbutton} value={"SUDAH TURUN"} name={data.NomorSales.toString()}>
                    Insentif Turun
                </CButton>
                <CButton color="danger"
                onClick={insentifbutton} value={"TIDAK TURUN"} name={data.NomorSales.toString()}>
                    Tolak Insentif
                </CButton>
                </>
            )
            return (
                <tr key={data.NomorSales}>
                    <td>{data.NomorSales}</td>
                    <td>{data.Karyawan.nik}</td>
                    <td>{data.Karyawan.name}</td>
                    <td>{data.FakturPenjualan.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.TotalPenjualan}</td>
                    <td>{data.Insentif}</td>
                </tr>
            )
        })
    }
    return (
        <>
        <CRow className="py-4">
            <CCol>
                <CLabel>Filter Nomor Sales</CLabel><br/>
                <CInput type="text" id="kodesales"  maxLength={15}
                    onChange={e => setFilterNomor(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter NIK Sales</CLabel><br/>
                <CInput type="text" id="nik" 
                    onChange={e => setFilterNIK(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Nama Sales</CLabel><br/>
                <CInput type="text" id="namasales" 
                    onChange={e => setFilterNama(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Tanggal Faktur</CLabel><br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CRow>
                        <CCol>
                            Dari :<DateTimePicker value={tanggalawal} onChange={setTanggalAwal} />
                        </CCol>
                        <CCol>
                            Sampai : <DateTimePicker value={tanggalakhir} onChange={setTanggalAkhir} />
                        </CCol>
                    </CRow>
                    
                </MuiPickersUtilsProvider>
            </CCol>
            
            <CCol>
                <CLabel>Filter Nomor Faktur</CLabel><br/>
                <CInput type="text" id="faktur" required
                    onChange={e => setFilterFaktur(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Insentif</CLabel><br/>
                    <CSelect defaultValue="" custom name="insentif" id="insentif"
                        onChange={e => setFilterInsentif(e.target.value)} >
                        <option selected value="">SEMUA</option>
                        <option value="AKAN TURUN">AKAN TURUN</option>
                        <option value="TIDAK TURUN">TIDAK TURUN</option>
                        <option value="SUDAH TURUN">SUDAH TURUN</option>
                    </CSelect>
            </CCol>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderSales()}
                </thead>
                <tbody>
                    {renderDataSales()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TableSales