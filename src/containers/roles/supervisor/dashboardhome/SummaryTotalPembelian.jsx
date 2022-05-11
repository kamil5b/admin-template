import { CInput } from '@coreui/react'
import React, { PureComponent, useEffect, useState } from 'react'

const SummaryTotalPembelian = ({props : per, limit : max = 20}) => {
    const [datapembelian, setDataPembelian] = useState([])
    const [tahun, setTahun] = useState("")
    const [bulan, setBulan] = useState("")
    const [minggu, setMinggu] = useState("")
    const [tanggal, setTanggal] = useState("")

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({per})
        };
        fetch('http://localhost:8000/api/pembelian/summary', requestOptions)
            .then(response => response.json())
            .then(data => setDataPembelian(data))
            .catch(err => console.log(err));
        
    }, [per]);

    
    const getHeader = () => {
        if(datapembelian.length === 0){
            return (<></>)
        }
        let data = datapembelian[0]
        let keys = Object.keys(data)
        return keys.map((key)=>{
            if(key === "TotalDiskontil"){
                return <th key={key}>TOTAL DISKONTIL</th>
            }
            if(key === "Total"){
                return <th key={key}>TOTAL PEMBELIAN</th>
            }
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }
    const getFilter = () => {
        if(datapembelian.length === 0){
            return (<></>)
        }
        let data = datapembelian[0]
        let keys = Object.keys(data)
        return keys.map((key)=>{
            if(key === "Tahun"){
                return <th key={key}><CInput placeholder="Filter Tahun" type="text" 
                                            onChange={e => setTahun(e.target.value)}/></th>
            }
            if(key === "Bulan"){
                return <th key={key}><CInput placeholder="Filter Bulan" type="text" 
                                            onChange={e => setBulan(e.target.value)}/></th>
            }
            if(key === "Minggu"){
                return <th key={key}><CInput placeholder="Filter Minggu" type="text" 
                                            onChange={e => setMinggu(e.target.value)}/></th>
            }
            if(key === "Tanggal"){
                return <th key={key}><CInput placeholder="Filter Tanggal" type="text" 
                                            onChange={e => setTanggal(e.target.value)}/></th>
            }
            return (<th></th>)
        })
    }

    const RenderRow = (props) =>{
        return props.keys.map((key, index)=>{
            return <td key={props.data[key]}>{props.data[key]}</td>
        })
       }

    const getRowsData = () => {
        if(datapembelian.length === 0){
            return (<></>)
        }//0 1 2 | 3 4
        let data = datapembelian[0]
        let keys = Object.keys(data)
        console.log(max)
        if (datapembelian.length > max) {datapembelian.length = max}
        return datapembelian
            .filter(d => d.Tahun.toString().includes(tahun))
            .filter(d => {if(d.Bulan != undefined){return d.Bulan.toString().includes(bulan)} return d})
            .filter(d => {if(d.Minggu != undefined){return d.Minggu.toString().includes(minggu)} return d})
            .filter(d => {if(d.Tanggal != undefined){return d.Tanggal.toString().includes(tanggal)} return d})
            .map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    return (
        <table className = "table table-striped table-bordered">
            <thead>
                
                {getHeader()}
                <tr>{getFilter()}</tr>
            </thead>
            <tbody>
                {getRowsData()}
            </tbody>
        </table>
    )
    //return (<></>)
}

export default SummaryTotalPembelian