import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { sum, moneda } from "../tools"
import ModalDetallePagos from "./ModalDetallePagos";
import ModalRealizarAbono from "./ModalRealizarAbono";
import { useEffect, useState } from "react";

export default function Modalfactura({ modalFactura, toggleFactura, detallesFactura, ventas, detallesArticulos, obtenerVentas }) {
    let historial;
    let totalAbono = 0;
    let articulos = []

    if (ventas == "") {
        historial = []
    } else {
        historial = JSON.parse(ventas)
        // articulos = Object.values(detallesFactura.items)
    }


    // MODAL PAGOS
    const [modalPagos, setModalPagos] = useState(false);
    const togglePagos = () => setModalPagos(!modalPagos);

    // MODAL ABONO
    const [modalAbono, setModalAbono] = useState(false);
    const toggleAbono = () => setModalAbono(!modalAbono);

    useEffect(() => {
        obtenerVentas();
    })

    return (
        <div>

            {historial.map((val, key) => {
                totalAbono = totalAbono + val.abono;
            })}

            <ModalRealizarAbono
                modalAbono={modalAbono}
                toggleAbono={toggleAbono}
                detallesFactura={detallesFactura}
                ventas={ventas}
                obtenerVentas={obtenerVentas}
            />
            <ModalDetallePagos modalPagos={modalPagos} togglePagos={togglePagos} detallesFactura={detallesFactura} ventas={ventas} />


            <Modal isOpen={modalFactura} toggle={toggleFactura} fullscreen="sm" size="lg" scrollable={true} animation="false">
                <ModalHeader toggle={toggleFactura}> <i className="bi bi-file-earmark-text"> </i> Detalle de la factura</ModalHeader>
                <ModalBody>
                    <div className='row factura'>
                        <div className="col-6 groupText">
                            <span>Factura <br /> <b>{detallesFactura.factura}</b></span>
                        </div>
                        <div className="col-6 groupText">
                            <span>Estado <br /> <b>{
                                sum(detallesArticulos) <= totalAbono ?
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
                                {

                                    detallesArticulos.map((val, key) => {
                                        return (<tr key={key}>
                                            <td>{val.cantidad}</td>
                                            <td>{val.articulo}</td>
                                            <td>{moneda(val.precio)}</td>
                                            <td>{moneda(val.precio * val.cantidad)}</td>
                                        </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="col-12 groupText">
                            <span>Metodo de pago <br /> <b>{detallesFactura.metodo}</b></span>
                        </div>
                        <div className="row">
                            <div className="col-12 groupText">
                                <span>Total <br /> <b>{moneda(sum(detallesArticulos))}</b></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 groupText">
                                <span>Abono <br /> <b> {moneda(totalAbono)}</b></span>
                            </div>
                            <div className="col-6 groupText">
                                <span>Pendiente <br /> <b>{moneda(sum(detallesArticulos) - totalAbono)}</b></span>
                            </div>
                        </div>
                    </div>
                    {detallesFactura.redesSociales ?
                        <span className="text-primary"><i className="bi bi-check"></i>Redes Sociales: <b>{detallesFactura.nombreRedes}</b></span> :
                        <span>{' '}</span>}

                </ModalBody>
                <ModalFooter>
                    <Button color="outline-danger" onClick={toggleFactura}>
                        <i className="bi bi-x"> </i> Cerrar
                    </Button>
                    <div className="btn-group">
                        {
                            sum(detallesArticulos) <= totalAbono ?
                                <Button color="outline-primary" onClick={togglePagos}>
                                    <i className="bi bi-eye"> </i> Historial
                                </Button> :
                                <>  <Button color="outline-primary" onClick={togglePagos}>
                                    <i className="bi bi-eye"> </i> Historial
                                </Button>
                                    <Button color="primary" onClick={toggleAbono}>
                                        <i className="bi bi-plus"> </i> Abono
                                    </Button>
                                </>
                        }

                    </div>

                </ModalFooter>
            </Modal>
        </div >
    )
}