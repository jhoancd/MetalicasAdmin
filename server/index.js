const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "metalicasadmin"
})

// Agregar Inventario
app.post("/agregarInventario", (req, res) => {
    const descripcion = req.body.descripcion
    const dyf = req.body.dyf
    const danfel = req.body.danfel
    const nathan = req.body.nathan
    const costo = req.body.costo

    db.query("INSERT INTO inventario(descripcion,dyf,danfel,nathan,costo) VALUES(?,?,?,?,?)", [descripcion, dyf, danfel, nathan, costo],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        }
    )
})

// Obtener Inventario
app.get("/obtenerInventario", (req, res) => {
    db.query("SELECT * FROM inventario",
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
})

// Trasladar Inventario
app.put("/trasladoInventario", (req, res) => {
    const id = req.body.id;
    const almacenTrasladoDe = req.body.almacenTrasladoDe;
    const almacenTrasladoA = req.body.almacenTrasladoA;
    const cantidadTraslado = req.body.cantidadTraslado;

    db.query(`UPDATE inventario SET ${almacenTrasladoDe}=(${almacenTrasladoDe}-${cantidadTraslado}), ${almacenTrasladoA}=(${almacenTrasladoA}+${cantidadTraslado}) WHERE id=${id}`,
        (err, resul) => {
            if (err) {
                console.log(err)
            } else {
                res.send(resul)
            }
        }
    )
})

// Ingresar Invenario
app.put("/ingresoInventario", (req, res) => {
    const id = req.body.id;
    const almacenIngreso = req.body.almacenIngreso;
    const cantidadIngreso = req.body.cantidadIngreso;

    db.query(`UPDATE inventario SET ${almacenIngreso}=(${almacenIngreso}+${cantidadIngreso}) WHERE id=${id}`,
        (err, resul) => {
            if (err) {
                console.log(err)
            } else {
                res.send(resul)
            }
        })
})

// Obtener Histotial
app.get("/obtenerHistorial", (req, res) => {
    db.query("SELECT * FROM historial ORDER BY id DESC",
        (err, resul) => {
            if (err) {
                console.log(err)
            } else {
                res.send(resul)
            }
        }
    )
})

// Agregar Venta
app.post("/agregarVenta", (req, res) => {
    const data = req.body.data
    const pagos = req.body.pagos

    db.query("INSERT INTO ventas(factura,venta,pagos) VALUES(?,?,?)", [data.factura, JSON.stringify(data), JSON.stringify(pagos)],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        }
    )
})

// Agregar Abono
app.put("/agregarAbono", (req, res) => {
    const factura = req.body.factura
    const abono = req.body.abono
    let historial = JSON.parse(req.body.historial)
    historial.push(abono)

    db.query(`UPDATE ventas SET pagos = ? WHERE factura=?`, [JSON.stringify(historial), factura],
        (err, resul) => {
            if (err) {
                console.log(err)
            } else {
                res.send(resul)
            }
        })
})

// Obtener Venta
app.get("/obtenerVentas", (req, res) => {
    db.query("SELECT * FROM ventas ORDER BY id DESC",
        (err, resul) => {
            if (err) {
                console.log(err)
            } else {
                res.send(resul)
            }
        }
    )
})

// Registro Historial
app.post("/registrarHistorial", (req, res) => {
    const almacenHistorial = req.body.almacenHistorial;
    const descripcionHistorial = req.body.descripcionHistorial;
    const fechaHistorial = req.body.fechaHistorial;
    const tipoHistorial = req.body.tipoHistorial;

    db.query(`INSERT INTO historial(almacen, descripcion, fecha, tipo) VALUES('${almacenHistorial}','${descripcionHistorial}',?, '${tipoHistorial}')`, [fechaHistorial],
        (err, resul) => {
            if (err) {
                console.log(err)
            } else {
                res.send(resul)
            }
        })
})

app.delete("/eliminarInventario/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM inventario WHERE id=?", id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        }
    )
});

// Agregar Gasto
app.post("/agregarGasto", (req, res) => {
    const fecha = req.body.fecha
    const descripcion = req.body.descripcion
    const motivo = req.body.motivo
    const almacen = req.body.almacen
    const valor = req.body.valor

    db.query("INSERT INTO gastos(fecha,descripcion,motivo,almacen,valor) VALUES(?,?,?,?,?)", [fecha, descripcion, motivo, almacen, valor],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result)
            }
        }
    )
})

// Obtener Gastos
app.get("/obtenerGastos", (req, res) => {
    db.query("SELECT * FROM gastos ORDER BY id DESC",
        (err, resul) => {
            if (err) {
                console.log(err)
            } else {
                res.send(resul)
            }
        }
    )
})


app.listen(3001, () => {
    console.log("Corriendo en en el puerto 3001")
})