import React, { useEffect, useState } from 'react'
import {
    CRow,CCol,CInput,CLabel,CSelect
} from '@coreui/react'
import Cookies from 'js-cookie'

import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
const TableSales = (props) => {

    const [datasales, setDataSales] = useState({})
    const [filterkode, setFilterKode] = useState("")
    const [filterfaktur, setFilterFaktur] = useState("")
    const [filterinsentif, setFilterInsentif] = useState("")

    const [tanggalawal,setTanggalAwal] = useState(new Date())
    const [tanggalakhir,setTanggalAkhir] = useState(new Date())

    useEffect(() => {
        
        var d = new Date();
        var pastYear = d.getFullYear() - 1;
        d.setFullYear(pastYear);
        setTanggalAwal(d)
        // POST request using fetch inside useEffect
        let nik = props.user.nik
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                nik
            })
        };
        fetch('http://localhost:8000/api/sales', requestOptions)
            .then(response => response.json())
            .then(data => setDataSales(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    /*\
        sale := models.Sales{
			NomorSales:      s.NomorSales,
			FakturPenjualan: faktur,
			TotalPenjualan:  s.TotalPenjualan,
			Insentif:        s.Insentif,
		}
        type individu struct {
            Sales          []models.Sales
            TotalSales     int
            TotalPenjualan int
            TotalInsentif  int
        }
    */
    const getHeaderSales = () => {
        return (
            <tr>
                <th scope="col">Nomor Sales</th>
                <th scope="col">Nomor Faktur</th>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Total Penjualan</th>
                <th scope="col">Insentif</th>
            </tr>
        )
    }
    const renderDataSales = () => {
        if(datasales.Sales == undefined){
            return(<></>)
        }
        let sales = datasales.Sales
        .filter(data => {
            let date = new Date(data.FakturPenjualan.TanggalFaktur)
            return date >= tanggalawal && date <= tanggalakhir
        })
        .filter(data => data.FakturPenjualan.NomorFaktur.toString().includes(filterfaktur))
        .filter(data => data.NomorSales.toString().includes(filterkode))

        return sales.map(data => {
            let tanggal = data.FakturPenjualan.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            return (
                <tr key={data.NomorSales}>
                    <td>{data.NomorSales}</td>
                    <td>{data.FakturPenjualan.NomorFaktur}</td>
                    <td>{date}</td>
                    <td>{data.TotalPenjualan}</td>
                    <td>{data.NominalInsentif}</td>
                </tr>
            )
        })
    }
    return (
        <>
        <CRow className="py-4">
            <CCol>
                <CLabel>Filter Kode Sales</CLabel><br/>
                <CInput type="text" id="kodesales" required maxLength={15}
                    onChange={e => setFilterKode(e.target.value)}/>
            </CCol>
            <CCol>
                <CLabel>Filter Nomor Faktur</CLabel><br/>
                <CInput type="text" id="nomorfaktur" required
                    onChange={e => setFilterFaktur(e.target.value)}/>
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
        </CRow>
        <CRow className="py-4">
            <CCol>
                <b>Total Sales : {datasales.TotalSales}</b>
            </CCol>
            <CCol>
                <b>Total Penjualan : {datasales.TotalPenjualan}</b>
            </CCol>
            <CCol>
                <b>Total Insentif : {datasales.TotalInsentif}</b>
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