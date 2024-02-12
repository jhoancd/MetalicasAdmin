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

export { sum, moneda }