import { url } from "../../components/dashboard/var";
import { sum } from "../../components/dashboard/tools";
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


  const ventasBrutas = (almacen) => {

  }


  console.log(dataVentas)


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
              <div class="col-md-3">
                <label forHtml="dateStart" class="form-label">Inicio</label>
                <input
                  type="date"
                  class="form-control"
                  id="dateStart"
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div class="col-md-3">
                <label for="dateEnd" class="form-label">Fin</label>
                <input
                  type="date"
                  class="form-control"
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
                  <td>
                    {
                    }
                  </td>
                  <td>$7.800.000</td>
                  <td>$5.300.000</td>
                  <td>$1.300.000</td>
                  <td>$700.000</td>
                </tr>
                <tr>
                  <td>DyF</td>
                  <td>$12.250.000</td>
                  <td>$7.800.000</td>
                  <td>$5.300.000</td>
                  <td>$1.300.000</td>
                  <td>$700.000</td>
                </tr>                <tr>
                  <td>Nathan</td>
                  <td>$12.250.000</td>
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
