import React, { useEffect, useState } from 'react'

const SummaryBarang = (mode = 'bulanan') => {
    const [datapenjualan, setDataPenjualan] = useState([])
    const [datapembelian, setDataPembelian] = useState([])
    
    var tanggal = {
        tanggalawal : new Date(),
        tanggalakhir : new Date()
    }

    if( mode === 'harian'){
        tanggal.tanggalawal.setDate(tanggal.tanggalawal.getDate()-1)
    }

    if( mode === 'mingguan'){
        tanggal.tanggalawal.setDate(tanggal.tanggalawal.getDate()-7)
    }
    
    if( mode === 'bulanan'){
        tanggal.tanggalawal.setMonth(tanggal.tanggalawal.getMonth()-1)
    }

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tanggal)
        };
        fetch('http://localhost:8000/api/penjualan/summary/barang', requestOptions)
            .then(response => response.json())
            .then(data => setDataPenjualan(data))
            .catch(err => console.log(err));
        fetch('http://localhost:8000/api/pembelian/summary/barang', requestOptions)
            .then(response => response.json())
            .then(data => setDataPembelian(data))
            .catch(err => console.log(err));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    return (
        {datapenjualan,datapembelian}
    )
}
export default SummaryBarang