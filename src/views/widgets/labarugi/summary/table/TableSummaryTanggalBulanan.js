import SummaryTanggal from "src/utils/SummaryTanggal"
import {
    CRow,
    CCol,
} from '@coreui/react'

const TableSummaryTanggalBulanan = () => {

    const datasummary = SummaryTanggal()
    const detailpembelian = datasummary.datapembelian.Details
    const getHeadePembelian = () => {
        return (
            <tr>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Total Diskontil</th>
                <th scope="col">Total Pembelian</th>
            </tr>
        )
    }

    const renderDataPembelian = () => {
        if (detailpembelian == undefined) {
            return (<></>)
        }
        return detailpembelian.map(detail => {
            let tanggalfaktur = Date.parse(detail.TanggalFaktur)
            let tanggal = detail.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            return (
                <tr key={tanggalfaktur}>
                    <td>{date}</td>
                    <td>{detail.TotalDiskontil}</td>
                    <td>{detail.TotalPembelian}</td>
                </tr>
            )
        })
    }

    const detailpenjualan = datasummary.datapenjualan.Details
    const getHeaderPenjualan = () => {
        return (
            <tr>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Total Diskontil</th>
                <th scope="col">Total Penjualan</th>
            </tr>
        )
    }

    const renderDataPenjualan = () => {
        if (detailpenjualan == undefined) {
            return (<></>)
        }
        return detailpenjualan.map(detail => {
            let tanggalfaktur = Date.parse(detail.TanggalFaktur)
            let tanggal = detail.TanggalFaktur
            let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
            return (
                <tr key={tanggalfaktur}>
                    <td>{date}</td>
                    <td>{detail.TotalDiskontil}</td>
                    <td>{detail.TotalPenjualan}</td>
                </tr>
            )
        })
    }

    return (
    <CRow>
        <CCol sm="6" lg="6">
            <table className = "table table-striped table-bordered">
                <thead>
                    {getHeaderPenjualan()}
                </thead>
                <tbody>
                    {renderDataPenjualan()}
                </tbody>
            </table>
        </CCol>
        <CCol sm="6" lg="6">
            <table className = "table table-striped table-bordered">
                <thead>
                    {getHeadePembelian()}
                </thead>
                <tbody>
                    {renderDataPembelian()}
                </tbody>
            </table>
        </CCol>
    </CRow>
        
    )
}

export default TableSummaryTanggalBulanan