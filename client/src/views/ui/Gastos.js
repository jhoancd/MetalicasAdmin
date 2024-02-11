import React, { useState } from "react";
import {
  Container, Row, Col, Table, Card, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroupText, InputGroup
} from "reactstrap";

const Gastos = () => {

  const [modalGasto, setModalGasto] = useState(false);
  const toggle = () => setModalGasto(!modalGasto);

  return (


    <div>
      {/* MODAL REGISTRAR GASTO */}
      <div>
        <Modal isOpen={modalGasto} toggle={toggle} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggle}><i className="bi bi-arrow-down"> </i>Registrar gasto</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="fecha">Fecha</Label>
                <Input
                  name="fecha"
                  type="date"
                />
              </FormGroup>
              <FormGroup>
                <Label for="descripcion">Descripcion</Label>
                <Input
                  name="descripcion"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="motivo">Motivo</Label>
                <Input
                  name="motivo"
                  type="select"
                >
                  <option value="compra">Compra</option>
                  <option value="adelanto">Adelanto</option>
                  <option value="inversion">Inversión</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="almacen">Almacen</Label>
                <Input
                  name="almacen"
                  type="select"
                >
                  <option value="danfel">Danfel</option>
                  <option value="dyf">DyF</option>
                  <option value="nathan">Nathan</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="valor">Valor</Label>
                <Input
                  name="valor"
                  type="number"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-danger" onClick={toggle}>
              <i className="bi bi-x"> </i> Cancelar
            </Button>
            <Button color="primary" onClick={toggle}>
              <i className="bi bi-check"> </i> Guardar
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0 separar">
            <span>
              <i className="bi bi-arrow-down me-2"> </i>
              Gastos
            </span>
            <div>
              <Button color="primary" onClick={toggle} size="sm"><i className="bi bi-plus"> </i>Agregar gasto</Button>
            </div>
          </CardTitle>
          <CardBody className="tabla">
            {/* <InputGroup style={{ marginBottom: "10px" }}>
              <InputGroupText>
                <i className="bi bi-search"></i>
              </InputGroupText>
              <Input placeholder="Buscar por factura  " type="text" />
            </InputGroup> */}
            <Table bordered striped responsive hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripcion</th>
                  <th>Motivo</th>
                  <th>Almacen</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>2/02/2024</th>
                  <td>12 Perillas</td>
                  <td><span className="badge text-bg-danger rounded-pill"><i className="bi bi-arrow-down"> </i>Compra</span></td>
                  <td>Danfel</td>
                  <td>$2.600.000</td>
                </tr>
                <tr>
                  <th>2/02/2024</th>
                  <td>Ely</td>
                  <td><span className="badge text-bg-warning rounded-pill"><i className="bi bi-cash"> </i>Adelanto</span></td>
                  <td>Danfel</td>
                  <td>$400.000</td>
                </tr>
                <tr>
                  <th>2/02/2024</th>
                  <td>Batidora 12Lt</td>
                  <td><span className="badge text-bg-primary rounded-pill"><i className="bi bi-arrow-repeat"> </i>Inversión</span></td>
                  <td>DyF</td>
                  <td>$2.600.000</td>
                </tr>
                <tr>
                  <th>2/02/2024</th>
                  <td>Sueldos</td>
                  <td><span className="badge text-bg-secondary rounded-pill"><i className="bi bi-wallet2"> </i>Sueldo</span></td>
                  <td>DyF</td>
                  <td>$2.600.000</td>
                </tr>

              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Gastos;
