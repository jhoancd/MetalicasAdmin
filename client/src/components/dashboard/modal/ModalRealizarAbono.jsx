import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label
} from "reactstrap";
import { useForm } from 'react-hook-form';
import Axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";


export default function ModalRealizarAbono({ modalAbono, toggleAbono, detallesFactura, ventas }) {

    const { register, handleSubmit } = useForm()

    const notify = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    // QUERY AGREGAR ABONO
    const agregarAbono = (data) => {
        Axios.put("http://192.168.20.41:3001/agregarAbono", {
            factura: detallesFactura.factura,
            abono: data,
            historial: ventas
        }).then(() => {
            notify("Agregado correctamente");
        }).catch((err) => {
            notifyError(`Error al agregar abono: ${err}`);
        })

    }

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
            <Modal isOpen={modalAbono} toggle={toggleAbono} fullscreen="sm" size="lg" scrollable={true} animation="false">
                <ModalHeader toggle={toggleAbono}><i className="bi bi-check"> </i>Realizar abono factura {detallesFactura.factura}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <label htmlFor="fecha">Fecha</label>
                            <input {...register("fecha")} type="date" className="form-control" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="abono">Abono</label>
                            <input {...register("abono", { valueAsNumber: true })} type="number" className="form-control" required />
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

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="outline-danger" onClick={toggleAbono}>
                        <i className="bi bi-x"> </i> Cancelar
                    </Button>
                    <Button color="primary" onClick={handleSubmit((data) => {
                        agregarAbono(data)
                    })}>
                        <i className="bi bi-check"> </i> Guardar
                    </Button>

                </ModalFooter>
            </Modal>
        </div>
    )
}