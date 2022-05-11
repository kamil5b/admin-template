import SummaryTanggal from "../../utils/SummaryTanggal"

const TableSummaryPenjualan = () => {

    const datasummary = SummaryTanggal()
    const details = datasummary.datapenjualan.Details
    const getHeader = () => {
        return (
            <tr>
                <th scope="col">Tanggal Faktur</th>
                <th scope="col">Total Diskontil</th>
                <th scope="col">Total Penjualan</th>
            </tr>
        )
    }
    /*
    const renderRow = (data) => {
        return (
            <tr>
                <td>{data.TanggalFaktur}</td>
                <td>{data.TotalDiskontil}</td>
                <td>{data.TotalPenjualan}</td>
            </tr>
        )
    }*/

    const renderDatas = () => {
        
        return details.map(detail => {
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
        <table className = "table table-striped table-bordered">
            <thead>
                {getHeader()}
            </thead>
            <tbody>
                {renderDatas()}
            </tbody>
        </table>
    )
}

export default TableSummaryPenjualan