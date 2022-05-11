import React from "react";

const PrintSource = (props) => {

  const renderbody = () => {
    
    let datapenjualan = props.data
    let i = 0
    return datapenjualan.map(d => {
      console.log(d)
      i = i+1
      return (
        <tr>
          <td>{i}</td>
          <td>{d.NamaBarang}</td>
          <td>{d.Quantity}</td>
          <td>{d.TipeQuantity}</td>
          <td>{d.HargaJualKecil}</td>
          <td>{d.TotalHarga}</td>
        </tr>
      )
    })
  }
  const totalpenjualan = () => {
        
    if (props.data == null) {
        return 0
    }
    let beli = props.data
    let total = 0
    beli.map(data => total = total + data.TotalHarga)
    return total
  }
  const totalpotongan = () => {
          
    if (props.data == null) {
        return 0
    }
    let beli = props.data
    let total = 0
    beli.map(data => total = total + data.DiskontilPenjualan)
    return total
  }
  let jatuhtempo = () => {
    if(props.detail == undefined){
      return <></>
    }
    let tempo = props.detail.JatuhTempo
    if(tempo.slice(0,4) == "0001"){
        return <></>
    }
    let tmp = tempo.slice(8,10) + "/"+ tempo.slice(5,7) + "/"+tempo.slice(0,4)
    return (
      <tr>
        <td colspan="4"></td>
        <td >Jatuh Tempo : </td>
        <td >{tmp}</td>
      </tr>
    )
  }
  let tipe = () => {
    if(props.detail == undefined){
      return ""
    }
    if(props.detail.TipePembayaran == "GIRO"){
        return props.detail.NomorGiro
    }
    return props.detail.TipePembayaran
  }
  let header = () => {
    if (props.detail == undefined){
      return <></>
    }
    let tanggal = props.detail.TanggalFaktur
    let date = tanggal.slice(8,10) + "/"+ tanggal.slice(5,7) + "/"+tanggal.slice(0,4)
    return (
      <tr>
        <th colspan="4">{date}</th>
        <th colspan="2">No : {props.detail.NomorFaktur}</th>
      </tr>
    )
  }
  
  return (
    <div className="print-component row justify-content-center">
      <div className="col-auto mx-3">
        <table className=" table table-striped table-bordered">
          <thead>
            {header()}
            <tr>
              <th>NO</th>
              <th>NAMA</th>
              <th>QTY</th>
              <th>TIPE QTY</th>
              <th>HARGA SATUAN</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {renderbody()}
            <tr>
              <td colspan="4"></td>
              <td >Potongan :</td>
              <td>{totalpotongan()}</td>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td>Total Harga :</td>
              <td>{totalpenjualan()}</td>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td> Tipe Pembayaran :</td>
              <td >{tipe()}</td>
            </tr>
            {jatuhtempo()}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

class ComponentToPrint extends React.Component {
  render() {
    return <PrintSource detail={this.props.detail} data={this.props.fakturdata} />;
  }
}

export default ComponentToPrint;