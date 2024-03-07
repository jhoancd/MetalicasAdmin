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


export { sum, moneda, hoy }