// SUMA
const sum = (data) => {
    return data.reduce((acc, val) => acc + (parseInt(val.cantidad) * parseInt(val.precio)), 0)
}


// FORMATEAR MONEDA
const moneda = (val) => {
    return `$${new Intl.NumberFormat().format(val)}`
}

// OBTENER FECHA HOY
const hoy = (v) => {
    let fechaHoy = new Date(); //Fecha actual
    let mes = fechaHoy.getMonth() + 1; //obteniendo mes
    let dia = fechaHoy.getDate(); //obteniendo dia
    let ano = fechaHoy.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10

    const hoy = ano + "-" + mes + "-" + dia
    return hoy;
}

const lunes = () => {
    const fechaActual = new Date();

    // Obtener el día de la semana (0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
    let diaSemana = fechaActual.getDay();

    // Retroceder hasta llegar al lunes (si hoy es lunes, no retroceder)
    if (diaSemana !== 1) { // Si no es lunes
        // Calcular cuántos días retroceder
        const diasARetroceder = (diaSemana === 0) ? 6 : diaSemana - 1;
        // Restar los días necesarios para llegar al lunes
        fechaActual.setDate(fechaActual.getDate() - diasARetroceder);
    }

    // Convertir la fecha en formato yyyy-MM-dd
    return fechaActual.toISOString().split('T')[0]
}


export { sum, moneda, hoy, lunes }