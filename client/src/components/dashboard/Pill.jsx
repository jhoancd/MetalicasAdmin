
export default function Pill({ motivo, icon, color, text }) {

    if (motivo) {
        if (motivo === "compra") {
            return <span className="badge text-bg-danger rounded-pill"><i className="bi bi-arrow-down"> </i>Compra</span>
        } else if (motivo === "adelanto") {
            return <span className="badge text-bg-warning rounded-pill"><i className="bi bi-cash"> </i>Adelanto</span>
        } else if (motivo === "inversion") {
            return <span className="badge text-bg-primary rounded-pill"><i className="bi bi-arrow-repeat"> </i>Inversión</span>
        } else {
            return <span className="badge text-bg-secondary rounded-pill"><i className="bi bi-wallet2"> </i>Sueldo</span>
        }
    } else {
        return <span className={`badge text-bg-${color} rounded-pill`}><i className={`bi bi-${icon}`}> </i>{text}</span>
    }
}