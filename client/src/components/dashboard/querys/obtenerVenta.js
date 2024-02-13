import Axios from "axios"

const obtenerVentas = (setVentas) => {
    Axios.get("http://192.168.20.41:3001/obtenerVentas").then((res) => {
        setVentas(res.data)
    }).catch((err) => {
        //notifyError(`Error al obtener ventas: ${err}`);
    })
}

const actualizarVentas = (setVentas) => {
    obtenerVentas(setVentas)
}

export default actualizarVentas