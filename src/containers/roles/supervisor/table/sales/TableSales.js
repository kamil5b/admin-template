import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect,CButton
} from '@coreui/react'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import FormSales from './FormSales'

const TableSales = () => {

    const [datasales, setDataSales] = useState([])
    const [filternomor, setFilterNomor] = useState("") //NOMOR SALES
    const [filternik, setFilterNIK] = useState("") //NIK SALES
    const [filternama, setFilterNama] = useState("")  //NAMA SALES
    const [filterfaktur, setFilterFaktur] = useState("") //NOMOR FAKTUR

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
    const renderDataSales = () => {
        
        console.log(datasales)
        if(datasales[0] == undefined){
            console.log("hehe")
            return <></>
        }
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
        
        console.log("SALES : ")
        console.log(sales)
        return sales.map(data => {
            let tanggal = data.FakturPenjualan.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            
            return (
                <tr key={data.NomorSales}>
                    <td>{data.NomorSales}</td>
                    <td>{data.Karyawan.nik}</td>
                    <td>{data.Karyawan.name}</td>
                    <td>{data.FakturPenjualan.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.TotalPenjualan}</td>
                    <td>{data.NominalInsentif}</td>
                    <td><FormSales sales={data}/></td>
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