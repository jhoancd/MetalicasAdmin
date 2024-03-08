import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Axios from "axios"
import { useEffect, useState } from "react";
import { url } from "../dashboard/var";
import { moneda, hoy } from "../dashboard/tools";

const ResumenVentas = () => {

    const [ventas, setVentas] = useState([])
    const [gastos, setGastos] = useState([])
    const [fechaInicio, setFechaInicio] = useState(hoy())
    const [fechaFin, setFechaFin] = useState(hoy())

    // QUERY OBTENER VENTAS
    const obtenerVentas = () => {
        Axios.get(`${url}/obtenerVentas`).then((res) => {
            setVentas(res.data)
        }).catch((err) => {
            //   notifyError(`Error al obtener ventas: ${err}`);
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

    // Suma todos los valores
    const abonos = ventas.reduce((acc, el) => {
        // une todos los abonos en un solo array plano
        return acc.concat(JSON.parse(el.pagos))
    }, [])

    // Filtrar datos por un rango de fechas
    const filtroFechas = (array, fechaInicio = hoy(), fechaFin = hoy()) => {
        const arrayFiltrado = array.filter(item => {
            const fecha = item.fecha;
            return fecha >= fechaInicio && fecha <= fechaFin;
        });
        return arrayFiltrado
    }


    useEffect(() => {
        obtenerVentas()
        obtenerGastos()
    })


    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Resumen de ventas</CardTitle>
                    <CardSubtitle className="text-muted" tag="h6">
                        Ventas totales
                    </CardSubtitle>
                    <div className="bg-primary text-white my-3 p-3 rounded">
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
                        <Row className="mt-2">
                            <Col md="4">
                                <h6>Ventas totales</h6>
                                <h4 className="mb-0 fw-bold">
                                    {
                                        moneda(abonos.reduce((acc, val) => acc + val.abono, 0))
                                    }
                                </h4>
                            </Col>
                            <Col md="4">
                                <h6>Hoy</h6>
                                <h4 className="mb-0 fw-bold">
                                    {
                                        moneda(filtroFechas(abonos)
                                            .reduce((acc, val) => acc + val.abono, 0))
                                    }
                                </h4>
                            </Col>
                            <Col md="4">
                                <h6>Gastos</h6>
                                <h4 className="mb-0 fw-bold">
                                    {
                                        moneda(filtroFechas(gastos).reduce((acc, val) => acc + val.valor, 0))
                                    }
                                </h4>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ResumenVentas;
