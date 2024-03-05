import {
    Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label
} from "reactstrap";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { sum, moneda, hoy } from "../tools"
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { url } from "../var.js"
import Select from "react-select";


export default function ModalRegistrarVenta({ modalVenta, toggle, agregarVenta }) {

    const notifyError = (msg) => toast.error(msg);
    const [inventario, setInventario] = useState([])
    const [listaItems, setListaItems] = useState([])
    const [selectItem, setSelectItem] = useState("")
    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            fecha: hoy(),
            precio: 0,
            cantidad: 0
        }
    })

    const eliminar = itemId => {
        const filtredData = listaItems.filter(item => item.id !== itemId);
        setListaItems(filtredData);
    };

    // Obtener el valor del select y almacenarlo
    const handelSelectChange = (e) => {
        setSelectItem(e)
    }

    // Funcion para agregar el articulo al codigo
    const agregarArticulo = () => {
        const item = {
            "id": selectItem.value,
            "cantidad": watch("cantidad"),
            "articulo": selectItem.label,
            "precio": watch("precio")
        }
        setListaItems([...listaItems, item])
    }

    const data = watch()

    const pago = watch("abono")

    const obtenerInventario = () => {
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
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    <input className="form-control"
                                        type="number"
                                        {...register("cantidad")}
                                    />
                                </div>
                                <div className="col-6">
                                    <Select
                                        defaultValue={{ label: "Seleccione un articulo", value: "Default" }}
                                        options={inventario.map(val => {
                                            return ({ label: val.descripcion, value: val.id })
                                        }
                                        )}
                                        onChange={handelSelectChange}
                                    />
                                </div>
                                <div className="col-3">
                                    <input className="form-control"
                                        type="number"
                                        {...register("precio")}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <button
                                    className="btn btn-primary btn-large"
                                    onClick={() => { reset() }}
                                > Agregar</button>
                            </div>
                        </div>

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
                                    <th style={{ width: "10%" }}>Total</th>
                                    <th style={{ width: "10%" }}>Del</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaItems.map((val, key) => {
                                        return <tr key={key}>
                                            <td>
                                                {val.cantidad}
                                            </td>
                                            <td>
                                                {val.articulo}
                                            </td>
                                            <td>
                                                {val.precio}
                                            </td>
                                            <td>
                                                {val.cantidad * val.precio}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => eliminar(val.id)}
                                                > - </button>
                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </Table>
                        <div className="mb-2 fs-5 text-end"><b>Total: </b> </div>

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
                <span style={{ padding: "0 4px" }} className={`rounded-pill ${/*sum(data) <= pago*/ true ? "text-bg-success" : "text-bg-warning"}`}><i className={`bi ${true ? "bi-check-circle" : "bi-exclamation-circle"}`}> </i></span>
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