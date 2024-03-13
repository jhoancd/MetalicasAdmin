import { url } from "../../components/dashboard/var";
import { moneda, hoy } from "../../components/dashboard/tools";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import Axios from "axios"


const Informes = () => {

  const [ventas, setVentas] = useState([])
  const [gastos, setGastos] = useState([])
  const [ventasAlmacen, setVentasAlmacen] = useState([])
  const [fechaInicio, setFechaInicio] = useState()
  const [fechaFin, setFechaFin] = useState()


  // // 1. Mapeo el array y obtengo la columna de ventas
  // // 2. Filtro el mismo array entre un rango de fechas
  // let dataVentas = ventas.map((val) => {
  //   const ventas = JSON.parse(val.venta)
  //   return ventas;
  // }).filter(val => val.fecha >= hoy() && val.fecha <= hoy())

  const dataVentas = (fechaInicio, fechaFin, data) => {
    let dataFilter = [];
    dataFilter = ventas.map((val) => {
      const ventas = JSON.parse(val.venta)
      const pagos = JSON.parse(val.pagos)
      if (data == "ventas") {
        return ventas
      } else if (data == "pagos") {
        return pagos
      }
    })

    dataFilter = dataFilter.filter(val => val.fecha >= fechaInicio && val.fecha <= fechaFin)
    return dataFilter

  }


  // 1. Filtro las ventas por almacen
  // 2. Con el reduce sumo los totales
  const ventasBrutas = (almacen) => {
    let total = 0;
    total = dataVentas(hoy(), hoy(), "ventas").filter(val => val.almacen == almacen)
      .reduce((acc, val) => acc + val.total, 0)
    return moneda(total)
  }


  // QUERY OBTENER VENTAS
  const obtenerVentas = () => {
    Axios.get(`${url}/obtenerVentas`).then((res) => {
      setVentas(res.data)
    }).catch((err) => {
      //notifyError(`Error al obtener ventas: ${err}`);
    })
  }

  // QUERY OBTENER GASTOS
  const obtenerGastos = () => {
    Axios.get(`${url}/obtenerGastos`).then((res) => {
      setGastos(res.data)
    }).catch((err) => {
      console.log(`Error al obtener gastos: ${err}`);
    })
  }

  useEffect(() => {
    obtenerGastos();
    obtenerVentas()
  })

  return (
    <Row>

      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Informe
          </CardTitle>
          <CardBody className="">
            <Row>
              <div className="col-md-3">
                <label forHtml="dateStart" className="form-label">Inicio</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateStart"
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label forHtml="dateEnd" className="form-label">Fin</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateEnd"
                  onChange={(e) => setFechaFin(e.target.value)} />
              </div>
            </Row>
            <Table bordered striped className="mt-2">
              <thead>
                <tr>
                  <th>Almacen</th>
                  <th>Venta Neta</th>
                  <th>Abonos</th>
                  <th>Pendientes</th>
                  <th>Transferencia</th>
                  <th>Gastos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Danfel</td>
                  <td>{console.log(dataVentas(hoy(), hoy(), "ventas"))/*ventasBrutas("danfel")*/}
                  </td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>DyF</td>
                  <td>{ventasBrutas("dyf")}</td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>Nathan</td>
                  <td>{ventasBrutas("nathan")}</td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>$0</td>
                  <td>$0</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

    </Row>
  );
};

export default Informes;
