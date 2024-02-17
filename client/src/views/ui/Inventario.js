import React, { useEffect, useState } from "react";
import Axios from 'axios';
import {
  Col, Table, Card, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroupText, InputGroup
} from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';

const Inventario = () => {
  const notify = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  //MODAL AGREGAR
  const [modalAgregar, setModalAgregar] = useState(false);
  const toggle = () => setModalAgregar(!modalAgregar);
  // MODAL TRASLADO
  const [modalTraslado, setModalTraslado] = useState(false);
  const toggleTraslado = () => setModalTraslado(!modalTraslado);
  // MODAL INGRESO
  const [modalIngreso, setModalIngreso] = useState(false);
  const toggleIngreso = () => setModalIngreso(!modalIngreso);

  //VALORES INPUTS AGREGAR INVENTARIO
  const [id, setId] = useState()
  const [descripcion, setDescripcion] = useState()
  const [dyf, setDyf] = useState()
  const [danfel, setDanfel] = useState()
  const [nathan, setNathan] = useState()
  const [costo, setCosto] = useState()

  //VALORES INPUTS TRASLADOS
  const [descripcionTraslado, setDescripcionTraslado] = useState();
  const [almacenTrasladoDe, setAlmacenTrasladoDe] = useState("danfel");
  const [almacenTrasladoA, setAlmacenTrasladoA] = useState("danfel");
  const [cantidadTraslado, setCantitadTraslado] = useState()

  //VALORES INPUTS INGRESO
  const [almacenIngreso, setAlmacenIngreso] = useState()
  const [cantidadIngreso, setCantidadIngreso] = useState()

  const [inventario, setInventario] = useState([])
  const [valorBuscado, setValorBuscado] = useState();


  const buscador = (e) => {
    setValorBuscado(e)
  }

  //FILTRADO
  const resultado = !valorBuscado ? inventario : inventario.filter((dato) => dato.descripcion.toLowerCase().includes(valorBuscado.toLocaleLowerCase()))

  // FORMATEAR PESO
  const moneda = (val) => {
    return `$${new Intl.NumberFormat().format(val)}`
  }

  const limpiarCampos = () => {
    setDescripcion("");
    setDyf("")
    setDanfel("")
    setNathan("")
    setCosto("")
  }

  // QUERY HISTORIAL
  const registrarHistorial = (tipo, almacen, descripcion) => {
    let fecha = new Date()
    let hora24, hora12, hora;
    function addZero(i) {
      if (i < 10) { i = "0" + i }
      return i;
    }
    hora24 = hora12 = new Date().getHours();
    if (hora24 > 12) {
      hora12 -= (hora24 - 12) + 1;
      hora = hora12 + ":" + new Date().getMinutes() + " pm"
    } else {
      hora = hora12 + ":" + new Date().getMinutes() + " am"
    }

    let fechaText = fecha.toLocaleString("es-ES", { weekday: "short", year: "numeric", month: "short", day: "numeric" }) + " a las " + addZero(hora);

    Axios.post("http://192.168.20.41:3001/registrarHistorial", {
      almacenHistorial: almacen,
      descripcionHistorial: descripcion,
      fechaHistorial: fechaText,
      tipoHistorial: tipo
    }).catch((err) => {
      notifyError(`Error al registrar historial: ${err}`);
    })
  }


  // QUERY OBTENER INVENTARIO
  const obtenerInventario = () => {
    Axios.get("http://192.168.20.41:3001/obtenerInventario").then((res) => {
      setInventario(res.data)
    }).catch((err) => {
      notifyError(`Error al obtener inventario: ${err}`);
    })
  }

  // QUERY AGREGAR INVENTARIO
  const agregarInventario = () => {
    Axios.post("http://192.168.20.41:3001/agregarInventario", {
      descripcion: descripcion,
      dyf: dyf,
      danfel: danfel,
      nathan: nathan,
      costo: costo
    }).then(() => {
      notify("Agregado correctamente");
      limpiarCampos()
      toggle()
      registrarHistorial(
        "Ingreso", almacenIngreso,
        `Se ingreso <b>${descripcion}</b> a los siguientes almacenes:<br/> <b>Danfel:</b> ${danfel}<br/><b>DyF:</b> ${dyf}<br/><b>Nathan:</b> ${nathan}`)
    }).catch((err) => {
      notifyError(`Error al agregar inventario: ${err}`);
    })
  }

  // QUERY TRASLADO INVENTARIO
  const trasladoInventario = () => {
    Axios.put("http://192.168.20.41:3001/trasladoInventario", {
      id: id,
      descripcionTraslado: descripcionTraslado,
      almacenTrasladoDe: almacenTrasladoDe,
      almacenTrasladoA: almacenTrasladoA,
      cantidadTraslado: cantidadTraslado,
      danfel: danfel,
      dyf: dyf,
      nathan: nathan
    }).then(() => {
      notify("Agregado correctamente");
      toggleTraslado()
      obtenerInventario()
      registrarHistorial(
        "Traslado", almacenTrasladoDe,
        `Se traslado <b>${cantidadTraslado} ${descripcionTraslado}</b> de <b>${almacenTrasladoDe}</b> a <b>${almacenTrasladoA}</b>`)
    }).catch((err) => {
      notifyError(`Error al trasladar inventario: ${err}`);
    })

  }

  //QUERY INGRESO INVENTARIO
  const ingresoInventario = () => {
    Axios.put("http://192.168.20.41:3001/ingresoInventario", {
      id: id,
      almacenIngreso: almacenIngreso,
      cantidadIngreso: cantidadIngreso
    }).then(() => {
      obtenerInventario();
      notify("Ingresado correctamente");
      toggleIngreso()
      registrarHistorial(
        "Ingreso", almacenIngreso,
        `Se ingreso <b>${cantidadIngreso} ${descripcionTraslado}</b> a <b>${almacenIngreso}</b>`)

    }).catch((err) => {
      notifyError(`Error al ingresar inventario: ${err}`);
    })
  }

  const traslado = (val) => {
    setId(val.id);
    setDescripcionTraslado(val.descripcion)
  }

  useEffect(() => {
    obtenerInventario();
  }, [])

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

      {/* MODAL AGREGAR INVENTARIO */}
      <div>
        <Modal isOpen={modalAgregar} toggle={toggle} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggle}>Agregar Producto</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="descripcion">Descripcion</Label>
                <Input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </FormGroup>
              <p>Cantidad</p>
              <FormGroup row>
                <Label
                  for="danfel"
                  xs={3}
                >
                  Danfel:
                </Label>
                <Col xs={9}>
                  <Input
                    id="danfel"
                    name="danfel"
                    type="number"
                    onChange={(e) => setDanfel(e.target.value)}

                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label
                  for="dyf"
                  xs={3}
                >
                  D&F:
                </Label>
                <Col xs={9}>
                  <Input
                    id="dyf"
                    name="dyf"
                    type="number"
                    onChange={(e) => setDyf(e.target.value)}

                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label
                  for="nathan"
                  xs={3}
                >
                  Nathan:
                </Label>
                <Col xs={9}>
                  <Input
                    id="nathan"
                    name="nathan"
                    type="number"
                    onChange={(e) => setNathan(e.target.value)}

                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="costo">Costo</Label>
                <Input
                  id="costo"
                  name="costo"
                  type="number"
                  onChange={(e) => setCosto(e.target.value)}

                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-danger" onClick={toggle}>
              <i className="bi bi-x"> </i> Cancelar
            </Button>
            <Button color="primary" onClick={() => { agregarInventario(); obtenerInventario() }}>
              <i className="bi bi-check"> </i> Guardar
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>

      {/* MODAL TRASLADO */}
      <div>
        <Modal isOpen={modalTraslado} toggle={toggleTraslado} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggleTraslado}><i className="bi bi-arrow-left-right"></i> Traslado de mercancia</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="descripcionTraslado">Articulo</Label>
                <Input
                  id="descripcionTraslado"
                  name="descripcionTraslado"
                  type="text"
                  disabled
                  value={descripcionTraslado}
                />
              </FormGroup>
              <FormGroup row>
                <Col xs={5}>
                  <Label for="almacenTrasladoDe">De:</Label>
                  <Input
                    id="almacenTrasladoDe"
                    name="almacenTrasladoDe"
                    type="select"
                    onChange={(e) => setAlmacenTrasladoDe(e.target.value)}
                  >
                    <option>Selecionar almacen</option>
                    <option value="danfel">Danfel</option>
                    <option value="dyf">D&F</option>
                    <option value="nathan">Nathan</option>
                  </Input>
                </Col>

                <Col xs={2}>
                  <i className="bi bi-arrow-right"></i>

                </Col>

                <Col xs={5}>
                  <Label for="almacenTrasladoA">A:</Label>
                  <Input
                    id="almacenTrasladoA"
                    name="almacenTrasladoA"
                    type="select"
                    onChange={(e) => setAlmacenTrasladoA(e.target.value)}
                  >
                    <option>Selecionar almacen</option>
                    <option value="danfel">Danfel</option>
                    <option value="dyf">D&F</option>
                    <option value="nathan">Nathan</option>
                  </Input>

                </Col>

              </FormGroup>

              <FormGroup>
                <Label for="cantidadTraslado">Cantidad</Label>
                <Input
                  id="cantidadTraslado"
                  name="cantidadTraslado"
                  type="number"
                  onChange={(e) => setCantitadTraslado(e.target.value)}

                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-danger" onClick={toggleTraslado}>
              <i className="bi bi-x"> </i> Cancelar
            </Button>
            <Button color="primary" onClick={trasladoInventario}>
              <i className="bi bi-check"> </i> Guardar
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>

      {/* MODAL INGRESO */}
      <div>
        <Modal isOpen={modalIngreso} toggle={toggleIngreso} fullscreen="sm" size="lg" scrollable={false}>
          <ModalHeader toggle={toggleIngreso}><i className="bi bi-plus"></i> Ingreso de mercancia</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="descripcionTraslado">Articulo</Label>
                <Input
                  id="descripcionTraslado"
                  name="descripcionTraslado"
                  type="text"
                  disabled
                  value={descripcionTraslado}
                />
              </FormGroup>
              <FormGroup>
                <Col>
                  <Label for="almacenTrasladoDe">Ingresar a:</Label>
                  <Input
                    name="almacenIngreso"
                    type="select"
                    onChange={(e) => setAlmacenIngreso(e.target.value)}
                  >
                    <option>Selecionar almacen</option>
                    <option value="danfel">Danfel</option>
                    <option value="dyf">D&F</option>
                    <option value="nathan">Nathan</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup>
                <Label for="cantidadIngreso">Cantidad</Label>
                <Input
                  id="cantidadIngreso"
                  name="cantidadIngreso"
                  type="number"
                  onChange={(e) => setCantidadIngreso(e.target.value)}

                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-danger" onClick={toggleIngreso}>
              <i className="bi bi-x"> </i> Cancelar
            </Button>
            <Button color="primary" onClick={ingresoInventario}>
              <i className="bi bi-check"> </i> Guardar
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>

      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0 separar">
            <span>
              <i className="bi bi-box me-2"> </i>
              Inventario
            </span>
            <div>
              <Button color="primary" size="sm" onClick={toggle}><i className="bi bi-plus"> </i>Agregar</Button>
            </div>
          </CardTitle>
          <CardBody className="tabla">
            <InputGroup style={{ marginBottom: "10px" }}>
              <InputGroupText>
                <i className="bi bi-search"></i>
              </InputGroupText>
              <Input placeholder="Buscar" type="text" onChange={(e) => buscador(e.target.value)} />
            </InputGroup>
            <Table bordered responsive hover>
              <thead>
                <tr>
                  <th>Descripcion</th>
                  <th>DyF</th>
                  <th>Danfel</th>
                  <th>Nathan</th>
                  <th>Costo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {resultado.map((val, key) => {
                  return (<tr key={val.id}>
                    <th scope="row">{val.descripcion}</th>
                    <td>{val.dyf}</td>
                    <td>{val.danfel}</td>
                    <td>{val.nathan}</td>
                    <td>{moneda(val.costo)}</td>
                    <td>
                      <div className="btn-group">
                        <Button color="outline-primary" onClick={() => { toggleTraslado(); traslado(val) }} size="sm"><i className="bi bi-arrow-left-right"> </i></Button>
                        <Button color="outline-success" onClick={() => { toggleIngreso(); traslado(val) }} size="sm"><i className="bi bi-plus"> </i></Button>
                      </div>
                    </td>
                  </tr>
                  )
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

export default Inventario;
