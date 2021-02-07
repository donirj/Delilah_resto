
const express = require("express");
const swaggerUi = require("swagger-ui-express")

const app=express();

const swaggerDocument = require("./swagger.json");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//*********************** */


//const { createPool } = require("mysql2/promise");

const {Sequelize}=require("sequelize"); //va entre llaves porque la persona que creo sequelize lo exporto como un objeto

app.use(express.json());

const dataBase = new Sequelize(
    "delilahresto", //base de datos
    "root",
    "root", //Password
    {host:"localhost", dialect:"mysql"}
);

dataBase.authenticate()
.then(()=>{}) //instruccion para autenticacion exitosa
.catch(err => console.log(err));



function loginUser(req,res,next){
    const data_column=["USER_NAME", "PASS"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();
    
    });
}

function addUser(req,res,next){
    const data_column=["ID_USUARIO", "NOMBRE", "APELLIDO", "CORREO", "TELEFONO", "PASS", "ID_ROL"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();
    
    });
}

function crearOrden(req,res,next){
        const data_column=["ID_ESTADO_PEDIDO", "HORA_PEDIDO", "ID_PEDIDO", "DESCRIPCIÓN_PEDIDO", "METODO_DE_PAGO", "VALOR_TOTAL", "ID_USUARIO", "ID_FORMAS_PEDIDO"];
        data_column.forEach((column)=>{
            console.log(req.body[column]);
            if (req.body[column]==undefined){
                res.json({error:"Falta el valor: " +column})
            }
            next();
    });
}

function verPedidos(req,res,next){
    const data_column=["ID_PEDIDO"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();

});
}

function cancelarOrden(req,res,next){
    const data_column=["ID_PEDIDO"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();

});
}

function actualizarOrden(req, res, next) {
    const { ID_ESTADO_PEDIDO, ID_PEDIDO } = req.body;
  
    if (ID_ESTADO_PEDIDO !== "" && ID_PEDIDO !== "") {
      next();
    } else {
      res.json({ error: "hay campos vacios " });
    }
  };
}

function verProductos(req,res,next){
    const data_column=["ID"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();

});
}

function modificarProductos(req,res,next){
    const data_column=["ID"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();

});
}

function borrarProductos(req,res,next){
    const data_column=["ID"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();

});
}

function agregarProductos(req,res,next){
    const data_column=["ID"];
    data_column.forEach((column)=>{
        console.log(req.body[column]);
        if (req.body[column]==undefined){
            res.json({error:"Falta el valor: " +column})
        }
        next();

});
}

app.post("/add/user", addUser, (req,res)=>{
    const {ID_USUARIO, NOMBRE, APELLIDO, CORREO, TELEFONO, PASS, ID_ROL}=req.body; //destructor
    dataBase.query("INSERT INTO USUARIOS (ID_USUARIO, NOMBRE, APELLIDO, CORREO, TELEFONO, PASS, ID_ROL) VALUES ('"+ID_USUARIO+"', '"+NOMBRE+"', '"+APELLIDO+"','"+CORREO+"', '"+TELEFONO+"', '"+PASS+"', '"+ID_ROL+"')",
    {
        type:dataBase.QueryTypes.INSERT
    }) .then((resultado) => {
        console.log(resultado);

    });
    res.json({"status":"ok"});
});

app.listen(3333,() =>console.log("Running at port 3333"));

app.post("/login", loginUser, (req,res)=>{
    const {USER_NAME, PASS}=req.body; //destructor
    dataBase.query('select ID_USUARIO from USUARIOS where USER_NAME = "' + USER_NAME + '" && PASS = "' + PASS +'"',
    {
        type:dataBase.QueryTypes.SELECT
    }) .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.get("/ver/usuarios", addUser, (req,res)=>{
    const {USER_NAME, PASS, ADMIN}=req.query; //destructor
    dataBase.query('select USER_NAME, PASS, ADMIN from USERS where USER_NAME - "' + USER_NAME + '"&& PASS -"' + PASS + '"&& ADMIN"'  + ADMIN +
        '""',{
         type:dataBase.QuertTypes.SELECT
    }) .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.post("/agregarproductos", agregarProductos, (req,res)=>{
    const {DESCRIPCION, PRECIO, ID, FOTO}=req.query;
    dataBase.query('INSERT INTO PRODUCTOS (PRECIO, DESCRIPCION, ID, FOTO) VALUES ("' + PRECIO + '", "' + DESCRIPCION + '", "' + ID +'", "'+ FOTO + '" )', { type:dataBase.QueryTypes.INSERT })
     .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.delete("/borrarproducto", borrarProductos, (req,res)=>{
    const {ID}=req.query;
    dataBase.query('DELETE from PRODUCTOS where ID = ' + ID + '', { type: dataBase.QueryTypes.DELETE })
     .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.put("/modificarproductos", modificarProductos, (req,res)=>{
    const {DESCRIPCION, PRECIO, FOTO}=req.query;
    dataBase.query('UPDATE PRODUCTOS set DESCRIPCION= "' + DESCRIPCION + '", PRECIO="' + PRECIO + '", FOTO= "' + FOTO , { type: dataBase.QueryTypes.UPDATE })
     .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.get("/verproductos", verProductos, (req,res)=>{
    const {DESCRIPCION, PRECIO, FOTO}=req.query;
    dataBase.query('select DESCRIPCION, PRECIO, FOTO from PRODUCTOS where DESCRIPCION - "' + DESCRIPCION + '"&& PRECIO"' + PRECIO + '"&& FOTO"' + FOTO , {type: dataBase.QueryTypes.SELECT})
     .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.put("/actualizarorden", actualizarOrden, (req,res) =>{
    const {ID_ESTADO_PEDIDO, ID_PEDIDO}=req.body;
    dataBase.query('UPDATE PEDIDOS set ID_ESTADO_PEDIDO= "' + ID_ESTADO_PEDIDO + '" where ID_PEDIDO = ' + ID_PEDIDO  , {type:dataBase.QueryTypes.UPDATE
    }) .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.post("/crearrorden", crearOrden , (req,res) =>{
    const {ID_ESTADO_PEDIDO, HORA_PEDIDO, ID_PEDIDO, DESCRIPCIÓN_PEDIDO, METODO_DE_PAGO, VALOR_TOTAL, ID_USUARIO, ID_FORMAS_PEDIDO, DIRECCIÓN}=req.query;
    dataBase.query("INSERT INTO PEDIDOS (ID_ESTADO_PEDIDO, HORA_PEDIDO, ID_PEDIDO, DESCRIPCIÓN_PEDIDO, METODO_DE_PAGO, VALOR_TOTAL, ID_USUARIO, ID_FORMAS_PEDIDO, DIRECCIÓN) VALUES ('"+ID_ESTADO_PEDIDO+"', '"+HORA_PEDIDO+"', '"+ID_PEDIDO+"', '"+DESCRIPCIÓN_PEDIDO+"', '"+METODO_DE_PAGO+"', '"+VALOR_TOTAL+"', '"+ID_USUARIO+"', '"+ID_FORMAS_PEDIDO+"', '"+DIRECCIÓN+"')",
    {
        type:dataBase.QueryTypes.INSERT
    }) .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});

app.delete("/cancelarrorden", cancelarOrden, (req,res) =>{
    const {ID_PEDIDO}=req.query;
    dataBase.query('DELETE from PEDIDOS where ID_PEDIDO = ' + ID_PEDIDO + 
    '""',{
        type:dataBase.QueryTypes.DELETE
    }) .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});
/*
app.get("/vertodoslospedidoscomoadmin", addUser, (req,res) =>{
    const {ID_ESTADO_PEDIDO, HORA_PEDIDO, ID_PEDIDO, DESCRIPCIÓN_PEDIDO, METODO_DE_PAGO, VALOR_TOTAL, ID_USUARIO, ID_FORMAS_PEDIDO, DIRECCIÓN}=req.query;
    dataBase.query('select ID_ESTADO_PEDIDO, HORA_PEDIDO, ID_PEDIDO, DESCRIPCIÓN_PEDIDO, METODO_DE_PAGO, VALOR_TOTAL, ID_USUARIO, ID_FORMAS_PEDIDO, DIRECCIÓN from PEDIDOS where ID_ESTADO_PEDIDO - "' + ID_ESTADO_PEDIDO +  '" HORA_PEDIDO"' + HORA_PEDIDO + '"ID_PEDIDO"' + ID_PEDIDO + '"DESCRIPCIÓN_PEDIDO"' + DESCRIPCIÓN_PEDIDO + '"METODO_DE_PAGO"' + METODO_DE_PAGO + '"VALOR_TOTAL"' + VALOR_TOTAL + '"ID_USUARIO"' + ID_USUARIO + '" ID_FORMAS_PEDIDO"' +  ID_FORMAS_PEDIDO + '" DIRECCIÓN"' +  DIRECCIÓN +
    '""',{
        type:dataBase.QueryTypes.SELECT
    }) .then((resultado) => {
        console.log(resultado);
    });
    res.json({"status":"ok"});
});
*/

app.get("/verpedidos", verPedidos, (req,res) =>{

    dataBase.query('select * from PEDIDOS' ,{
        type:dataBase.QueryTypes.SELECT
    }) .then((resultado) => {
        console.log(resultado);
        res.json({"status": resultado});
    });
    res.json({"status":"falla"});
});