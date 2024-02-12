import React, { useEffect, useState } from "react";
import Axios from "axios"
import {
  Col, Table, Card, CardTitle, CardBody, Button, Input, InputGroupText, InputGroup
} from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import { sum, moneda } from "../../components/dashboard/tools"
import ModalRegistrarVenta from "../../components/dashboard/modal/ModalRegistarVenta";
import ModalFactura from "../../components/dashboard/modal/ModalFactura";


const Ventas = () => {

  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [ventas, setVentas] = useState([])
  const [detallesFactura, setDetallesFactura] = useState({
    "pago": 0,
    "fecha": "",
    "items": {
      "item1": {
        "precio": 0,
        "articulo": "",
        "cantidad": 0
      },
      "item2": {
        "precio": 0,
        "articulo": "",
        "cantidad": 0
      },
      "item3": {
        "precio": 0,
        "articulo": "",
        "cantidad": 0
      },
      "item4": {
        "precio": 0,
        "articulo": "",
        "cantidad": 0
      },
      "item5": {
        "precio": 0,
        "articulo": "",
        "cantidad": 0
      }
    },
    "metodo": "",
    "almacen": "",
    "factura": 0,
    "nombreRedes": "",
    "redesSociales": false
  })

  //MODAL REGISTRAR VENTA
  const [modalVenta, setModalVenta] = useState(false);
  const toggle = () => setModalVenta(!modalVenta);

  // MODAL TRASLADO
  const [modalFactura, setModalFactura] = useState(false);
  const toggleFactura = () => setModalFactura(!modalFactura);

  // QUERY HISTORIAL
  const registrarHistorial = (tipo, almacen, descripcion) => {
    let fecha = new Date()
    let hora24, hora12, hora;
    function addZero(i) {
      if (i < 10) { i = "0" + i }
      return i;
    }
    hora24 = hora12 = new Date().getHours();
    if (hora24 > 12) {
      hora12 -= (hora24 - 12) + 1;
      hora = hora12 + ":" + new Date().getMinutes() + " pm"
    } else {
      hora = hora12 + ":" + new Date().getMinutes() + " am"
    }

    let fechaText = fecha.toLocaleString("es-ES", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) + " a las " + addZero(hora);

    Axios.post("http://192.168.20.41:3001/registrarHistorial", {
      almacenHistorial: almacen,
      descripcionHistorial: descripcion,
      fechaHistorial: fechaText,
      tipoHistorial: tipo
    }).catch((err) => {
      notifyError(`Error al registrar historial: ${err}`);
    })
  }

  // QUERY AGREGAR VENTA
  const agregarVenta = (data) => {

    Axios.post("http://192.168.20.41:3001/agregarVenta", {
      data: data,
      pagos: {
        "fecha": data.fecha,
        "pago": data.pago,
        "metodo": data.metodo
      }
    }).then(() => {
      notify("Agregado correctamente");
      toggle()
      registrarHistorial(
        "Venta", data.almacen,
        `Se realizo venta de <b>${data.items.item1.articulo}</b> por un valor de ${data.items.item1.precio}`)
    }).catch((err) => {
      notifyError(`Error al agregar inventario: ${err}`);
    })
  }

  // QUERY OBTENER VENTA
  const obtenerVentas = () => {
    Axios.get("http://192.168.20.41:3001/obtenerVentas").then((res) => {
      setVentas(res.data)
    }).catch((err) => {
      notifyError(`Error al obtener ventas: ${err}`);
    })
  }

  useEffect(() => {
    obtenerVentas()
  })
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <ModalRegistrarVenta modalVenta={modalVenta} toggle={toggle} agregarVenta={agregarVenta} />
      <ModalFactura modalFactura={modalFactura} toggleFactura={toggleFactura} detallesFactura={detallesFactura} />

      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0 separar">
            <span>
              <i className="bi bi-currency-dollar me-2"> </i>
              Ventas
            </span>
            <div>
              <Button color="primary" size="sm" onClick={toggle}><i className="bi bi-plus"> </i>Registrar venta</Button>
            </div>
          </CardTitle>
          <CardBody className="tabla">
            <InputGroup style={{ marginBottom: "10px" }}>
              <InputGroupText>
                <i className="bi bi-search"></i>
              </InputGroupText>
              <Input placeholder="Buscar por factura  " type="text" />
            </InputGroup>
            <Table bordered striped responsive hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Factura</th>
                  <th>Articulo</th>
                  <th>Almacen</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((val, key) => {
                  let venta = JSON.parse(val.venta)
                  return (<tr key={key}>
                    <th>{venta.fecha}</th>
                    <td>{venta.factura}</td>
                    <td>{venta.items.item1.articulo}</td>
                    <td>{venta.almacen}</td>
                    <td>{
                      sum(venta) <= venta.pago ?
                        <span className="badge text-bg-success rounded-pill"><i className="bi bi-check-circle"> </i>Pago</span> :
                        <span className="badge text-bg-warning rounded-pill"><i className="bi bi-exclamation-circle"> </i>Pendiente</span>
                    }</td>
                    <td>{moneda(sum(venta))}</td>
                    <td>
                      <Button color="outline-primary" onClick={() => { toggleFactura(); setDetallesFactura(venta) }} size="sm"><i className="bi bi-file-earmark-text"> </i> Detalles</Button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Ventas;
