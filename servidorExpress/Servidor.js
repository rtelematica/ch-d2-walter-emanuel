const express= require("express")
const { json } = require("express/lib/response")
const app = express()
const PORT = 8080
const Contenedor = require("./Contenedor.js")
const contenedor = new Contenedor("./MateriasPrimas.json")


const server = app.listen (PORT, ()=>{
    console.log("seridor levantado en el puerto " + server.address().port)
})

app.get("/materiasprimas",async (req, res)=>{
    
    const materiasPrimas = await contenedor.obtenerMp()
    
    // esta podria ser una forma de mandar el arreglo de objetos
    // tambien es posible utilizar res.json(materiasPrimas);
    // te pido experimentes con ambas y veas la diferencia desde Postman
    // en como la informacion se devuelve y se interpreta.
    res.json({products: materiasPrimas});
})

app.get("/materiaprimaramdom",async (req, res)=>{
    
    const materiasPrimas = await contenedor.obtenerRamdom() //la funcion obtenerRamdom no EXISTE, FAVOR DE CORREGIR!!
    
    res.send(JSON.stringify(await materiasPrimas, null,2));
})