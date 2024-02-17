import {
    Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label
} from "reactstrap";
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { sum, moneda, hoy } from "../tools"



export default function ModalRegistrarVenta({ modalVenta, toggle, agregarVenta }) {
    const notify = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);
    const [n, setN] = useState(1);
    let itemDefault = []
    let articulos = [];
    const forms = () => {
        for (let i = 1; i <= n; i++) {
            itemDefault.push(`{
                item${n}: {
                    precio: ${0},
                    cantidad:${0}
                }
            }`
            )

            articulos.push(<tr>
                <td>
                    <input className="form-control"
                        {...register(`items.item${i}.cantidad`, { valueAsNumber: true })}
                        type="number"
                    />
                </td>
                <td>
                    <select input className="form-control"
                        {...register(`items.item${i}.articulo`)}
                        type="select"
                    >
                        <option value=""></option>
                        {
                            inventario.map((val, key) => {
                                return <option value={val.descripcion}>{val.descripcion}</option>
                            })
                        }

                    </select>
                </td>
                <td>
                    <input className="form-control"
                        {...register(`items.item${i}.precio`, { valueAsNumber: true })}
                        type="number"
                    />
                </td>
            </tr>)
        }
    }

    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            fecha: hoy(),
            items: itemDefault
        }
    })

    const data = watch()
    const pago = watch("abono")
    const [inventario, setInventario] = useState([])

    const [redesShow, setRedesShow] = useState("none")
    const handleRedes = () => {
        if (redesShow === "none") {
            setRedesShow("block")
        } else {
            setRedesShow("none")
        }
    }

    // QUERY OBTENER INVENTARIO
    const obtenerInventario = () => {
        Axios.get("http://192.168.20.41:3001/obtenerInventario").then((res) => {
            setInventario(res.data)
        }).catch((err) => {
            notifyError(`Error al obtener inventario: ${err}`);
        })
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
                <Form>
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
                    <div className="row">
                        <div className="col-6">
                            <p>Articulos</p>
                        </div>
                        <div className="col-6">
                            <div class="btn-group" role="group">
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setN(n - 1)}><i className="bi bi-dash"></i></button>
                                <button type="button" className="btn btn-md btn-outline-secondary" disabled>{n}</button>
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setN(n + 1)}><i className="bi bi-plus"></i></button>
                            </div>
                        </div>
                    </div>
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
                                {
                                    forms(n)
                                }
                                {articulos.map(val => {
                                    return (val)
                                })
                                }
                            </tbody>
                        </Table>
                        <div className="mb-2 fs-5 text-end"><b>Total: </b> {/*moneda(sum(data))*/}</div>

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
                {/* <span style={{ padding: "0 4px" }} className={`rounded-pill ${sum(data) <= pago ? "text-bg-success" : "text-bg-warning"}`}><i className={`bi ${sum(data) <= pago ? "bi-check-circle" : "bi-exclamation-circle"}`}> </i></span> */}
                <Button color="outline-danger" onClick={toggle}>
                    <i className="bi bi-x"> </i> Cancelar
                </Button>
                <Button color="primary" type="submit" onClick={
                    handleSubmit((data) => {
                        agregarVenta(data)
                        reset()
                    })}>
                    <i className="bi bi-check"> </i> Guardar
                </Button>{' '}
            </ModalFooter>
        </Modal>
    </div>
    )
}