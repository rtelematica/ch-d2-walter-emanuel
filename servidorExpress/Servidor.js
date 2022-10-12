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
    
    res.send(JSON.stringify(await materiasPrimas, null,2));
})

app.get("/materiaprimaramdom",async (req, res)=>{
    
    const materiasPrimas = await contenedor.obtenerRamdom()
    
    res.send(JSON.stringify(await materiasPrimas, null,2));
})