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
    const [total, setTotal] = useState(0)
    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            fecha: hoy(),
        }
    })

    const pago = watch("abono")

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

    // Sumar los valores
    const totales = v => {
        let x = 0;
        listaItems.map(val => {
            x = x + (val.cantidad * val.precio);
        })
        setTotal(x)
    }


    const obtenerInventario = () => {
        Axios.get(`${url}/obtenerInventario`).then((res) => {
            setInventario(res.data)
        }).catch((err) => {
            //    notifyError(`Error al obtener inventario: ${err}`);
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

    obtenerInventario()

    useEffect(() => {
        totales(selectItem)
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
                            <option value="danfel">Danfel</option>
                            <option value="dyf">DyF</option>
                            <option value="nathan">Nathan</option>
                        </select>
                    </FormGroup>
                    <div className="tabla-articulos" style={{ background: "#f1f1f1", padding: "5px", borderRadius: "8px" }}>
                        <div className="container">
                            <div className="row">
                                <label>Articulos: </label>
                                <Select
                                    defaultValue={{ label: "Seleccione un articulo", value: "Default" }}
                                    options={inventario.map(val => {
                                        return ({ label: val.descripcion, value: val.id })
                                    }
                                    )}
                                    onChange={handelSelectChange}
                                />
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    <label> Cantidad: </label>
                                    <input className="form-control"
                                        type="number"
                                        placeholder="Cantidad"
                                        {...register("cantidad")}
                                    />
                                </div>
                                <div className="col-6">
                                    <label> Precio: </label>

                                    <input className="form-control"
                                        type="number"
                                        placeholder="Precio"
                                        {...register("precio")}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2 mb-2" style={{ padding: "0  calc(var(--bs-gutter-x)* 0.5)", }}>
                                <button
                                    className="btn btn-outline-primary btn-large"
                                    onClick={() => { agregarArticulo() }}
                                > <i className="bi bi-plus"></i> Agregar</button>
                            </div>

                        </div>

                        {/* TABLA DE ARTICULOS FACTURA */}
                        <Table
                            responsive
                            size="sm"
                        >
                            <thead style={{ borderRadius: "8px" }}>
                                <tr>
                                    <th style={{ width: "10%", borderRadius: "8px 0 0 0" }}>Cant.</th>
                                    <th style={{ width: "50%" }}>Articulo </th>
                                    <th style={{ width: "10%" }}>Precio</th>
                                    <th style={{ width: "10%", borderRadius: "0 8px 0 0" }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaItems.map((val, key) => {
                                        return <tr key={key} onDoubleClickCapture={() => eliminar(val.id)}>
                                            <td>
                                                {val.cantidad}
                                            </td>
                                            <td>
                                                {val.articulo}
                                            </td>
                                            <td>
                                                {moneda(val.precio)}
                                            </td>
                                            <td>
                                                {moneda(val.cantidad * val.precio)}
                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </Table>
                        <div className="mb-2 fs-5 text-end"><b>Total: {moneda(total)}</b> </div>

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
                            <option value="jhoan">Jhoan</option>
                        </select>
                    </FormGroup>

                </Form>

            </ModalBody>
            <ModalFooter>
                <span style={{ padding: "0 4px" }} className={`rounded-pill ${total <= pago ? "text-bg-success" : "text-bg-warning"}`}><i className={`bi ${total <= pago ? "bi-check-circle" : "bi-exclamation-circle"}`}> </i></span>
                <Button color="outline-danger" onClick={toggle}>
                    <i className="bi bi-x"> </i> Cancelar
                </Button>
                <Button color="primary" type="submit" onClick={handleSubmit((data) => {
                    agregarVenta(data, listaItems)
                    reset()
                })}>
                    <i className="bi bi-check"> </i> Guardar
                </Button>{' '}
            </ModalFooter>
        </Modal>
    </div>
    )
}