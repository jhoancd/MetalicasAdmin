import {
    Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { sum, moneda } from "../tools"


export default function ModalDetallesPagos({ modalPagos, togglePagos, detallesFactura }) {
    return (
        <div>
            <Modal isOpen={modalPagos} toggle={togglePagos} fullscreen="sm" size="lg" scrollable={true} animation="false">
                <ModalHeader toggle={togglePagos}><i className="bi bi-currency-dollar"> </i>Registro de pagos</ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Abono</th>
                                <th>Metodo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{detallesFactura.fecha}</td>
                                <td>{moneda(detallesFactura.pago)}</td>
                                <td>{detallesFactura.metodo}</td>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="outline-danger" onClick={togglePagos}>
                        <i className="bi bi-x"> </i> Cerrar
                    </Button>

                </ModalFooter>
            </Modal>
        </div>
    )
}

