// SUMA
const sum = (n) => {
    let mul1 = n.items.item1.precio * n.items.item1.cantidad
    let mul2 = n.items.item2.precio * n.items.item2.cantidad
    let mul3 = n.items.item3.precio * n.items.item3.cantidad
    let mul4 = n.items.item4.precio * n.items.item4.cantidad
    let mul5 = n.items.item5.precio * n.items.item5.cantidad

    return mul1 + mul2 + mul3 + mul4 + mul5
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