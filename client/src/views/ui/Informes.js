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

  const dataVentas = ventas.map((val) => {
    const ventas = JSON.parse(val.venta)
    return ventas;
  })


  //dataVentas = dataVentas.filter(val => val.fecha >= hoy() && val.fecha <= hoy())

  const ventasBrutas = (almacen) => {
    // Primero filtro las ventas por almacen
    // depues con el filter sumo los totales
    let total = 0;
    total = dataVentas.filter(val => val.almacen == almacen)
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
            <Table bordered className="mt-2">
              <thead>
                <tr>
                  <th>Almacen</th>
                  <th>Venta</th>
                  <th>Abonos</th>
                  <th>Pendientes</th>
                  <th>Transferencia</th>
                  <th>Gastos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Danfel</td>
                  <td>{ventasBrutas("danfel")}
                  </td>
                  <td>$7.800.000</td>
                  <td>$5.300.000</td>
                  <td>$1.300.000</td>
                  <td>$700.000</td>
                </tr>
                <tr>
                  <td>DyF</td>
                  <td>{ventasBrutas("dyf")}</td>
                  <td>$7.800.000</td>
                  <td>$5.300.000</td>
                  <td>$1.300.000</td>
                  <td>$700.000</td>
                </tr>                <tr>
                  <td>Nathan</td>
                  <td>{ventasBrutas("nathan")}</td>
                  <td>$7.800.000</td>
                  <td>$5.300.000</td>
                  <td>$1.300.000</td>
                  <td>$700.000</td>
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
