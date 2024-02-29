import {
    Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label
} from "reactstrap";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { sum, moneda, hoy } from "../tools"
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {url} from "../var.js"



export default function ModalRegistrarVenta({ modalVenta, toggle, agregarVenta }) {

  const notifyError = (msg) => toast.error(msg);
  const [inventario, setInventario] = useState([])



    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            fecha: hoy(),
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
    const pago = watch("abono")

    const obtenerInventario = () =>{
            Axios.get(`${url}/obtenerInventario`).then((res) => {
              setInventario(res.data)
            }).catch((err) => {
              notifyError(`Error al obtener inventario: ${err}`);
            })
    }
   
    const articulos = () => {
        return inventario.map((val) => {
            return (<option value={val.descripcion}>{val.descripcion}</option>)
        })
    }

    const [redesShow, setRedesShow] = useState("none")
    const handleRedes = () => {
        if (redesShow === "none") {
            setRedesShow("block")
        } else {
            setRedesShow("none")

        }
    }

    useEffect(() => {
        obtenerInventario()
    })

    return (<div>
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

        <Modal isOpen={modalVenta} toggle={toggle} fullscreen="sm" size="lg" scrollable={true} animation="false">
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
                                            {articulos()}
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
                                            {articulos()}
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
                                            {articulos()}
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
                                            {articulos()}
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
                                            {articulos()}
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
                        <label htmlFor="abono">Pago</label>
                        <input {...register("abono", { valueAsNumber: true })} type="number" className="form-control" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="metodo">Metodo</Label>
                        <select className="form-control" {...register("metodo")} type="select">
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="Datafono">Datafono</option>
                            <option value="Sistecredito">Sistecredito</option>
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
    )
}