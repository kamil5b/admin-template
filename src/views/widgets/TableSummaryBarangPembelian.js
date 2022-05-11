import SummaryBarang from "../../utils/SummaryBarang"
import SummaryTanggal from "../../utils/SummaryTanggal"

const TableSummaryBarangPembelian = () => {

    const datasummary = SummaryBarang()
    const dataPembelian = datasummary.datapembelian
    const getHeader = () => {
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
    /*
    const renderRow = (data) => {
        return (
            <tr>
                <td>{data.TanggalFaktur}</td>
                <td>{data.TotalDiskontil}</td>
                <td>{data.TotalPembelian}</td>
            </tr>
        )
    }*/

    const renderDatas = () => {
        
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

export default TableSummaryBarangPembelian