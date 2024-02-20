import { url } from "./dashboard/var";
import toast from 'react-hot-toast';
import Axios from "axios"


const notifyError = (msg) => toast.error(msg);

let ventas = [];

const obtenerVentas = () => {
    Axios.get(`${url}/obtenerVentas`).then((res) => {
        ventas = res.data
    }).catch((err) => {
        notifyError(`Error al obtener ventas: ${err}`);
    })

}



export { obtenerVentas, ventas }