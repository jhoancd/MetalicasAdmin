import parse from 'html-react-parser';
import {
    ListGroupItem,
    Button,
} from "reactstrap";

export default function ItemHistorial({ id, descripcion, fecha, tipo }) {

    let botonIcon;
    let botonColor;

    if (tipo === "Traslado") {
        botonColor = "warning"
        botonIcon = "bi bi-arrow-left-right"
    } else if (tipo === "Venta") {
        botonColor = "success"
        botonIcon = "bi bi-currency-dollar"
    } else if (tipo === "Gasto") {
        botonColor = "danger"
        botonIcon = "bi bi-arrow-down"
    } else if (tipo === "Ingreso") {
        botonColor = "primary"
        botonIcon = "bi bi-plus"
    } else {
        botonColor = "secondary"
        botonIcon = "bi bi-question"
    }

    return (
        <>
            <ListGroupItem
                tag="div"
                key={id}
                className="d-flex align-items-center p-3 border-0"
            >

                <Button
                    className="rounded-circle me-3"
                    size="sm"
                    color={botonColor}
                >
                    <i className={botonIcon}></i>
                </Button>
                <span>
                    <small className="ms-auto text-muted text-small">
                        {tipo}<br />
                    </small>
                    {parse(descripcion)} <br />
                    <small className="ms-auto text-muted text-small">
                        {fecha}
                    </small>
                </span>

            </ListGroupItem>
        </>
    )
}