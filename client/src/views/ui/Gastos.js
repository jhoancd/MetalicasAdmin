import React, { useEffect, useState } from "react";
import {
  Col, Table, Card, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroupText, InputGroup
} from "reactstrap";
import { hoy, moneda } from "../../components/dashboard/tools";
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Axios from "axios"
import Pill from "../../components/dashboard/Pill";


const Gastos = () => {
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fecha: hoy()
    }
  })

  const [gastos, setGastos] = useState([]);
  const [modalGasto, setModalGasto] = useState(false);
  const toggle = () => setModalGasto(!modalGasto);

  // QUERY OBTENER GASTOS
  const obtenerGastos = () => {
    Axios.get("http://192.168.20.41:3001/obtenerGastos").then((res) => {
      setGastos(res.data)
    }).catch((err) => {
      notifyError(`Error al obtener ventas: ${err}`);
    })
  }

  // QUERY AGREGAR GASTOS
  const agregarGasto = (data) => {
    Axios.post("http://192.168.20.41:3001/agregarGasto", {
      fecha: data.fecha,
      descripcion: data.descripcion,
      motivo: data.motivo,
      almacen: data.almacen,
      valor: data.valor
    }).then(() => {
      notify("Agregado correctamente");
      toggle()
    }).catch((err) => {
      notifyError(`Error al agregar gasto: ${err}`);
    })
  }

  useEffect(() => {
    obtenerGastos();
  })

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

      {/* MODAL REGISTRAR GASTO */}
      <div>
        <Modal isOpen={modalGasto} toggle={toggle} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggle}><i className="bi bi-arrow-down"> </i>Registrar gasto</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="fecha">Fecha</Label>
                <input
                  {...register("fecha")}
                  className="form-control"
                  type="date"
                />
              </FormGroup>
              <FormGroup>
                <Label for="descripcion">Descripcion</Label>
                <input
                  {...register("descripcion")}
                  className="form-control"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="motivo">Motivo</Label>
                <select
                  {...register("motivo")}
                  className="form-control"
                >
                  <option value="compra">Compra</option>
                  <option value="adelanto">Adelanto</option>
                  <option value="inversion">Inversión</option>
                  <option value="sueldo">Sueldo</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="almacen">Almacen</Label>
                <select
                  {...register("almacen")}
                  className="form-control"
                  type="select"
                >
                  <option value="Danfel">Danfel</option>
                  <option value="Dyf">DyF</option>
                  <option value="Nathan">Nathan</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="valor">Valor</Label>
                <input
                  {...register("valor")}
                  className="form-control"
                  type="number"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-danger" onClick={toggle}>
              <i className="bi bi-x"> </i> Cancelar
            </Button>
            <Button color="primary" onClick={
              handleSubmit((data) => {
                agregarGasto(data)
                toggle()
                reset()
              })
            }>
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
                {
                  gastos.map((val, key) => {
                    return (<tr key={val.id}>
                      <th>{val.fecha}</th>
                      <td>{val.descripcion}</td>
                      <td><Pill motivo={val.motivo} /></td>
                      <td>{val.almacen}</td>
                      <td>{moneda(val.valor)}</td>
                    </tr>)
                  })
                }

              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Gastos;
