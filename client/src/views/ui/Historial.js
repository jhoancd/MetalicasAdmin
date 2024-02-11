import React, { useEffect, useState } from "react";
import ItemHistorial from "../../components/dashboard/ItemHistorial";

import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle
} from "reactstrap";

const Historial = () => {

  const notifyError = (msg) => toast.error(msg);

  const [historial, setHistorial] = useState([]);

  const obtenerHistorial = () => {
    Axios.get("http://192.168.20.41:3001/obtenerHistorial").then((res) => {
      setHistorial(res.data)
    }).catch((err) => {
      notifyError(`Error al obtener historial: ${err}`);
    })
  }

  useEffect(() => {
    obtenerHistorial()
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

      <Card>
        <CardBody>
          <CardTitle tag="h5">Historial de movimientos</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Subtitulo
          </CardSubtitle>
          <ListGroup flush className="mt-4">
            {
              historial.map((val, key) => {
                return (
                  <ItemHistorial id={val.id} descripcion={val.descripcion} fecha={val.fecha} tipo={val.tipo} />
                )
              })
            }

          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default Historial;
