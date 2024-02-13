import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { sum, moneda } from "../tools"
import ModalDetallePagos from "./ModalDetallePagos";
import ModalRealizarAbono from "./ModalRealizarAbono";
import { useEffect, useState } from "react";

export default function Modalfactura({ modalFactura, toggleFactura, detallesFactura, ventas, obtenerVentas }) {
    let historial;
    let totalAbono = 0;

    if (ventas == "") {
        historial = []
    } else {
        historial = JSON.parse(ventas)
    }

    // MODAL PAGOS
    const [modalPagos, setModalPagos] = useState(false);
    const togglePagos = () => setModalPagos(!modalPagos);

    // MODAL ABONO
    const [modalAbono, setModalAbono] = useState(false);
    const toggleAbono = () => setModalAbono(!modalAbono);

    useEffect(() => {
        obtenerVentas()
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
                                sum(detallesFactura) <= totalAbono ?
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
                                    <td>{moneda(detallesFactura.items.item1.precio)}</td>
                                    <td>{moneda(detallesFactura.items.item1.cantidad * detallesFactura.items.item1.precio)}</td>
                                </tr>
                                <tr>
                                    <td>{detallesFactura.items.item2.cantidad}</td>
                                    <td>{detallesFactura.items.item2.articulo}</td>
                                    <td>{moneda(detallesFactura.items.item2.precio)}</td>
                                    <td>{moneda(detallesFactura.items.item2.cantidad * detallesFactura.items.item2.precio)}</td>
                                </tr>
                                <tr>
                                    <td>{detallesFactura.items.item3.cantidad}</td>
                                    <td>{detallesFactura.items.item3.articulo}</td>
                                    <td>{moneda(detallesFactura.items.item3.precio)}</td>
                                    <td>{moneda(detallesFactura.items.item3.cantidad * detallesFactura.items.item3.precio)}</td>
                                </tr>
                                <tr>
                                    <td>{detallesFactura.items.item4.cantidad}</td>
                                    <td>{detallesFactura.items.item4.articulo}</td>
                                    <td>{moneda(detallesFactura.items.item4.precio)}</td>
                                    <td>{moneda(detallesFactura.items.item4.cantidad * detallesFactura.items.item4.precio)}</td>
                                </tr>
                                <tr>
                                    <td>{detallesFactura.items.item5.cantidad}</td>
                                    <td>{detallesFactura.items.item5.articulo}</td>
                                    <td>{moneda(detallesFactura.items.item5.precio)}</td>
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
                                <span>Abono <br /> <b> {moneda(totalAbono)}</b></span>
                            </div>
                            <div className="col-6 groupText">
                                <span>Pendiente <br /> <b>{moneda(sum(detallesFactura) - totalAbono)}</b></span>
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
                            sum(detallesFactura) <= totalAbono ?
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