import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useForm } from 'react-hook-form';
import {
  Col, Table, Card, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroupText, InputGroup
} from "reactstrap";



const Ventas = () => {

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

  const sum = (data) => {
    let mul1 = data.items.item1.precio * data.items.item1.cantidad
    let mul2 = data.items.item2.precio * data.items.item2.cantidad
    let mul3 = data.items.item3.precio * data.items.item3.cantidad
    let mul4 = data.items.item4.precio * data.items.item4.cantidad
    let mul5 = data.items.item5.precio * data.items.item5.cantidad

    return mul1 + mul2 + mul3 + mul4 + mul5
  }

  const [cantidad, precio] = watch(["items.item1.cantidad", "items.item1.precio"])

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


  return (
    <div>

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
                  <input {...register("factura")} type="number" className="form-control" required />
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
            <Button color="outline-danger" onClick={toggle}>
              <i className="bi bi-x"> </i> Cancelar
            </Button>
            <Button color="primary" type="submit" onClick={handleSubmit((data) => {
              console.log(data)
            })}>
              <i className="bi bi-check"> </i> Guardar
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>

      {/* MODAL FACTURA */}
      <div>
        <Modal isOpen={modalFactura} toggle={toggleFactura} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggleFactura}> <i className="bi bi-file-earmark-text"> </i> Detalle de la factura</ModalHeader>
          <ModalBody>
            <div className='row factura'>
              <div className="col-6 groupText">
                <span>Factura <br /> <b>4581</b></span>
              </div>
              <div className="col-6 groupText">
                <span>Estado <br /> <b><span className="badge text-bg-warning rounded-pill"><i className="bi bi-exclamation-circle"> </i>Pendiente</span></b></span>
              </div>
              <div className="col-6">
              </div>
            </div>
            <div>
              <div className="col-6 groupText">
                <span>Fecha <br /> <b>03/02/2024</b></span>
              </div>
              <div className="col-6 groupText">
                <span>Almacen <br /> <b>Metalicas Danfel</b></span>
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
                    <td>4</td>
                    <td>Asadores 40cm</td>
                    <td>$150.000</td>
                    <td>$700.000</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Calentador VC, 60cm, E</td>
                    <td>$150.000</td>
                    <td>$1.700.000</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Cocina 3P,2D,1S y patas en acero</td>
                    <td>$150.000</td>
                    <td>$700.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="col-12 groupText">
                <span>Metodo de pago <br /> <b>Efectivo</b></span>
              </div>
              <div className="row">
                <div className="col-12 groupText">
                  <span>Total <br /> <b>$4.470.000</b></span>
                </div>
              </div>
              <div className="row">
                <div className="col-6 groupText">
                  <span>Abono <br /> <b>$3.000.000</b></span>
                </div>
                <div className="col-6 groupText">
                  <span>Pendiente <br /> <b>$1.470.000</b></span>
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
      </div>

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
                <tr>
                  <th scope="row">2/02/2024</th>
                  <td>5736</td>
                  <td>Vitrina 13 bandejas con entrepaño</td>
                  <td>Danfel</td>
                  <td><span className="badge text-bg-success rounded-pill"><i className="bi bi-check-circle"> </i>Pago</span></td>
                  <td>$2.600.000</td>
                  <td>
                    <Button color="outline-primary" onClick={toggleFactura} size="sm"><i className="bi bi-file-earmark-text"> </i> Detalles</Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3/02/2024</th>
                  <td>0142</td>
                  <td>Cilindradora 2hp</td>
                  <td>DyF</td>
                  <td><span className="badge text-bg-warning rounded-pill"><i className="bi bi-exclamation-circle"> </i>Pendiente</span></td>
                  <td>$820.000</td>
                  <td>
                    <Button color="outline-primary" onClick={toggleFactura} size="sm"><i className="bi bi-file-earmark-text"> </i> Detalles</Button>
                  </td>
                </tr>

              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Ventas;
