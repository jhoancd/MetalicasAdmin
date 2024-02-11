import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useForm } from 'react-hook-form';
import {
  Col, Table, Card, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroupText, InputGroup
} from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';



const Ventas = () => {

  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const [ventas, setVentas] = useState([])
  const [detallesFactura, setDetallesFactura] = useState([])

  // FORMATEAR PESO
  const moneda = (val) => {
    return `$${new Intl.NumberFormat().format(val)}`
  }

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      items: {
        item1: {
          precio: 0,
          cantidad: 0
        },
        item2: {
          precio: 0,
          cantidad: 0
        },
        item3: {
          precio: 0,
          cantidad: 0
        },
        item4: {
          precio: 0,
          cantidad: 0
        },
        item5: {
          precio: 0,
          cantidad: 0
        }
      }

    }
  })

  const data = watch()

  const sum = (n) => {
    let mul1 = n.items.item1.precio * n.items.item1.cantidad
    let mul2 = n.items.item2.precio * n.items.item2.cantidad
    let mul3 = n.items.item3.precio * n.items.item3.cantidad
    let mul4 = n.items.item4.precio * n.items.item4.cantidad
    let mul5 = n.items.item5.precio * n.items.item5.cantidad

    return mul1 + mul2 + mul3 + mul4 + mul5
  }

  const pago = watch("pago")

  const [redesShow, setRedesShow] = useState("none")
  const handleRedes = () => {
    if (redesShow === "none") {
      setRedesShow("block")
    } else {
      setRedesShow("none")

    }
  }

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
      data: data
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

      {/* MODAL REGISTRAR VENTA */}
      <div>
        <Modal isOpen={modalVenta} toggle={toggle} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggle}><i className="bi bi-cart-plus"> </i>Registrar venta</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit((data) => {
              console.log(data)
            })}>
              <FormGroup row>
                <Col xs={6} md={6}>
                  <label htmlFor="factura">Factura</label>
                  <input {...register("factura", { valueAsNumber: true })} type="number" className="form-control" required />
                </Col>
                <Col xs={6} md={6}>
                  <label htmlFor="fecha">Fecha</label>
                  <input {...register("fecha")} type="date" className="form-control" />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="almacen">Almacen</Label>
                <select className="form-control" type="select" {...register("almacen")}
                >
                  <option>Selecionar almacen</option>
                  <option value="Danfel">Danfel</option>
                  <option value="DyF">DyF</option>
                  <option value="Nathan">Nathan</option>
                </select>
              </FormGroup>
              <p>Articulos</p>
              <div className="tabla-articulos">

                {/* TABLA DE ARTICULOS FACTURA */}
                <Table
                  responsive
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Cant.</th>
                      <th style={{ width: "50%" }}>Articulo </th>
                      <th style={{ width: "10%" }}>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input className="form-control"
                          {...register("items.item1.cantidad", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                      <td>
                        <select input className="form-control"
                          {...register("items.item1.articulo")}
                          type="select"
                        >
                          <option value=""></option>
                          <option value="Asador de campana">Asador de campana</option>
                          <option value="">Carro de comidas rapidas, P40, V40, A Volcanica, F 2gal</option>
                          <option value="">Cocina 3S, 1D, 2S</option>
                          <option value="">Mesa de 120x60</option>
                          <option value="">Calentador VC, 50cm, E</option>
                        </select>
                      </td>
                      <td>
                        <input className="form-control"
                          {...register("items.item1.precio", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="form-control"
                          {...register("items.item2.cantidad", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                      <td>
                        <select input className="form-control"
                          {...register("items.item2.articulo")}
                          type="select"
                        >
                          <option value=""></option>
                          <option value="Asador de campana">Asador de campana</option>
                          <option value="">Carro de comidas rapidas, P40, V40, A Volcanica, F 2gal</option>
                          <option value="">Cocina 3S, 1D, 2S</option>
                          <option value="">Mesa de 120x60</option>
                          <option value="">Calentador VC, 50cm, E</option>
                        </select>
                      </td>
                      <td>
                        <input className="form-control"
                          {...register("items.item2.precio", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="form-control"
                          {...register("items.item3.cantidad", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                      <td>
                        <select input className="form-control"
                          {...register("items.item3.articulo")}
                          type="select"
                        >
                          <option value=""></option>
                          <option value="Asador de campana">Asador de campana</option>
                          <option value="">Carro de comidas rapidas, P40, V40, A Volcanica, F 2gal</option>
                          <option value="">Cocina 3S, 1D, 2S</option>
                          <option value="">Mesa de 120x60</option>
                          <option value="">Calentador VC, 50cm, E</option>
                        </select>
                      </td>
                      <td>
                        <input className="form-control"
                          {...register("items.item3.precio", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="form-control"
                          {...register("items.item4.cantidad", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                      <td>
                        <select input className="form-control"
                          {...register("items.item4.articulo")}
                          type="select"
                        >
                          <option value=""></option>
                          <option value="Asador de campana">Asador de campana</option>
                          <option value="">Carro de comidas rapidas, P40, V40, A Volcanica, F 2gal</option>
                          <option value="">Cocina 3S, 1D, 2S</option>
                          <option value="">Mesa de 120x60</option>
                          <option value="">Calentador VC, 50cm, E</option>
                        </select>
                      </td>
                      <td>
                        <input className="form-control"
                          {...register("items.item4.precio", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input className="form-control"
                          {...register("items.item5.cantidad", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                      <td>
                        <select input className="form-control"
                          {...register("items.item5.articulo")}
                          type="select"
                        >
                          <option value=""></option>
                          <option value="Asador de campana">Asador de campana</option>
                          <option value="">Carro de comidas rapidas, P40, V40, A Volcanica, F 2gal</option>
                          <option value="">Cocina 3S, 1D, 2S</option>
                          <option value="">Mesa de 120x60</option>
                          <option value="">Calentador VC, 50cm, E</option>
                        </select>
                      </td>
                      <td>
                        <input className="form-control"
                          {...register("items.item5.precio", { valueAsNumber: true })}
                          type="number"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="mb-2 fs-5 text-end"><b>Total: </b> {moneda(sum(data))}</div>

                {/*FIN TABLA DE ARTICULOS FACTURA */}

              </div>
              <FormGroup>
                <label htmlFor="pago">Pago</label>
                <input {...register("pago", { valueAsNumber: true })} type="number" className="form-control" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="metodo">Metodo</Label>
                <select className="form-control" {...register("metodo")} type="select">
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="datafono">Datafono</option>
                  <option value="sistecredito">Sistecredito</option>
                </select>
              </FormGroup>
              <FormGroup >
                <div className="form-check form-switch">
                  <input {...register("redesSociales")} className="form-check-input" type="checkbox" role="switch" onChange={handleRedes} />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Redes Sociales</label>
                </div>
              </FormGroup>
              <FormGroup style={{ display: redesShow }}>
                <label htmlFor="nombreRedes">Nombre:</label>
                <select
                  {...register("nombreRedes")}
                  type="select"
                  className="form-control"
                >
                  <option value=""></option>
                  <option value="mario">Mario</option>
                  <option value="eddy">Eddy</option>
                  <option value="vanesa">Vanesa</option>
                </select>
              </FormGroup>

            </Form>

          </ModalBody>
          <ModalFooter>
            <span style={{ padding: "0 4px" }} className={`rounded-pill ${sum(data) <= pago ? "text-bg-success" : "text-bg-warning"}`}><i className={`bi ${sum(data) <= pago ? "bi-check-circle" : "bi-exclamation-circle"}`}> </i></span>
            <Button color="outline-danger" onClick={toggle}>
              <i className="bi bi-x"> </i> Cancelar
            </Button>
            <Button color="primary" type="submit" onClick={handleSubmit((data) => {
              agregarVenta(data)
            })}>
              <i className="bi bi-check"> </i> Guardar
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>

      {/* MODAL FACTURA */}
      {/* <div>
        <Modal isOpen={modalFactura} toggle={toggleFactura} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggleFactura}> <i className="bi bi-file-earmark-text"> </i> Detalle de la factura</ModalHeader>
          <ModalBody>
            <div className='row factura'>
              <div className="col-6 groupText">
                <span>Factura <br /> <b>{detallesFactura.factura}</b></span>
              </div>
              <div className="col-6 groupText">
                <span>Estado <br /> <b>{
                  sum(detallesFactura) <= detallesFactura.pago ?
                    <span className="badge text-bg-success rounded-pill"><i className="bi bi-check-circle"> </i>Pago</span> :
                    <span className="badge text-bg-warning rounded-pill"><i className="bi bi-exclamation-circle"> </i>Pendiente</span>
                }</b></span>
              </div>
              <div className="col-6">
              </div>
            </div>
            <div>
              <div className="col-6 groupText">
                <span>Fecha <br /> <b>{detallesFactura.fecha}</b></span>
              </div>
              <div className="col-6 groupText">
                <span>Almacen <br /> <b>Metalicas {detallesFactura.almacen}</b></span>
              </div>

            </div>
            <div className="articulos">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th><p>Articulo</p></th>
                    <th><p>Und.</p></th>
                    <th><p>Total</p></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{detallesFactura.items.item1.cantidad}</td>
                    <td>{detallesFactura.items.item1.articulo}</td>
                    <td>{detallesFactura.items.item1.precio}</td>
                    <td>{moneda(detallesFactura.items.item1.cantidad * detallesFactura.items.item1.precio)}</td>
                  </tr>
                  <tr>
                    <td>{detallesFactura.items.item2.cantidad}</td>
                    <td>{detallesFactura.items.item2.articulo}</td>
                    <td>{detallesFactura.items.item2.precio}</td>
                    <td>{moneda(detallesFactura.items.item2.cantidad * detallesFactura.items.item2.precio)}</td>
                  </tr>
                  <tr>
                    <td>{detallesFactura.items.item3.cantidad}</td>
                    <td>{detallesFactura.items.item3.articulo}</td>
                    <td>{detallesFactura.items.item3.precio}</td>
                    <td>{moneda(detallesFactura.items.item3.cantidad * detallesFactura.items.item3.precio)}</td>
                  </tr>
                  <tr>
                    <td>{detallesFactura.items.item4.cantidad}</td>
                    <td>{detallesFactura.items.item4.articulo}</td>
                    <td>{detallesFactura.items.item4.precio}</td>
                    <td>{moneda(detallesFactura.items.item4.cantidad * detallesFactura.items.item4.precio)}</td>
                  </tr>
                  <tr>
                    <td>{detallesFactura.items.item5.cantidad}</td>
                    <td>{detallesFactura.items.item5.articulo}</td>
                    <td>{detallesFactura.items.item5.precio}</td>
                    <td>{moneda(detallesFactura.items.item5.cantidad * detallesFactura.items.item5.precio)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="col-12 groupText">
                <span>Metodo de pago <br /> <b>{detallesFactura.metodo}</b></span>
              </div>
              <div className="row">
                <div className="col-12 groupText">
                  <span>Total <br /> <b>{moneda(sum(detallesFactura))}</b></span>
                </div>
              </div>
              <div className="row">
                <div className="col-6 groupText">
                  <span>Abono <br /> <b>{moneda(detallesFactura.pago)}</b></span>
                </div>
                <div className="col-6 groupText">
                  <span>Pendiente <br /> <b>{moneda(sum(detallesFactura) - detallesFactura.pago)}</b></span>
                </div>
              </div>
            </div>
            <span className="text-primary"><i className="bi bi-check"></i>Redes Sociales: <b>Vanesa</b></span>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-secondary" onClick={toggleFactura}>
              <i className="bi bi-eye"> </i> Ver Pagos
            </Button>
            <Button color="primary" onClick={toggleFactura}>
              <i className="bi bi-currency-dollar"> </i> Realizar Abono
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div> */}

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