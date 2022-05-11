import SummaryBarang from "src/utils/SummaryBarang"
import {
    CRow,
} from '@coreui/react'
const TableSummaryBarangMingguan = () => {

    const datasummary = SummaryBarang('mingguan')
    const datapenjualan = datasummary.datapenjualan
    const getHeaderPenjualan = () => {
        return (
            <tr>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Total Penjualan Besar</th>
                <th scope="col">Tipe Quantity Besar</th>
                <th scope="col">Total Penjualan Medium</th>
                <th scope="col">Tipe Quantity Medium</th>
                <th scope="col">Total Penjualan Kecil</th>
                <th scope="col">Tipe Quantity Kecil</th>
                <th scope="col">Harga Jual Kecil</th>
                <th scope="col">Total Diskontil</th>
                <th scope="col">Total Penjualan</th>
            </tr>
        )
    }
    const renderDataPenjualan = () => {
        if (datapenjualan== undefined) {
            
            return (<></>)
        }
        return datapenjualan.map(data => {
            return (
                <tr key={data.BarangJual.KodeBarang}>
                    <td>{data.BarangJual.KodeBarang}</td>
                    <td>{data.BarangJual.NamaBarang}</td>
                    <td>{data.TotalBigQty}</td>
                    <td>{data.BarangJual.TipeBigQty}</td>
                    <td>{data.TotalMediumQty}</td>
                    <td>{data.BarangJual.TipeMediumQty}</td>
                    <td>{data.TotalSmallQty}</td>
                    <td>{data.BarangJual.TipeSmallQty}</td>
                    <td>{data.BarangJual.HargaJualKecil}</td>
                    <td>{data.TotalDiskontil}</td>
                    <td>{data.TotalPenjualan}</td>
                </tr>
            )
        })
    }
    const dataPembelian = datasummary.datapembelian
    const getHeaderPembelian = () => {
        
        return (
            <tr>
                <th scope="col">Kode Barang</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Total Pembelian Besar</th>
                <th scope="col">Tipe Quantity Besar</th>
                <th scope="col">Total Pembelian Medium</th>
                <th scope="col">Tipe Quantity Medium</th>
                <th scope="col">Total Pembelian Kecil</th>
                <th scope="col">Tipe Quantity Kecil</th>
                <th scope="col">Harga Jual Kecil</th>
                <th scope="col">Total Diskontil</th>
                <th scope="col">Total Pembelian</th>
            </tr>
        )
    }

    const renderDataPembelian = () => {
        if (dataPembelian.message != undefined) {
            alert(dataPembelian.message)
            return (<></>)
        }
        return dataPembelian.map(data => {
            return (
                <tr key={data.BarangJual.KodeBarang}>
                    <td>{data.BarangJual.KodeBarang}</td>
                    <td>{data.BarangJual.NamaBarang}</td>
                    <td>{data.TotalBigQty}</td>
                    <td>{data.BarangJual.TipeBigQty}</td>
                    <td>{data.TotalMediumQty}</td>
                    <td>{data.BarangJual.TipeMediumQty}</td>
                    <td>{data.TotalSmallQty}</td>
                    <td>{data.BarangJual.TipeSmallQty}</td>
                    <td>{data.BarangJual.HargaJualKecil}</td>
                    <td>{data.TotalDiskontil}</td>
                    <td>{data.TotalPembelian}</td>
                </tr>
            )
        })
    }

    return (
        <>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                     {getHeaderPenjualan()}
                </thead>
                <tbody>
                    {renderDataPenjualan()}
                </tbody>
            </table>
        </CRow>
        <CRow>
            <table className = "table table-striped table-bordered">
                <thead>
                    {getHeaderPembelian()}
                </thead>
                <tbody>
                    {renderDataPembelian()}
                </tbody>
            </table>
        </CRow>
        </>
    )
}

export default TableSummaryBarangMingguan