
const fs = require("fs")
const generadorid = require("./generadorId")

class Contenedor{

    constructor(listaMp){
        this.listaMp = listaMp
    }

    async save(ListadeMP){
        try {
            for (const i in ListadeMP) {
                let id= generadorid(5)
                ListadeMP.map((objeto)=>{
                    if( objeto.id === id){
                        id+= generadorid(2)
                    }else{
                        ListadeMP[i].id = id
                    }
                })
                console.log(` Producto guardado, el id asignado fue ${id}`)
            }
            await fs.promises.writeFile("./MateriasPrimas.json", JSON.stringify(ListadeMP, null, 2)
            
            ).then(()=>{
                return{
                    status:"Satisfactorio", message:"Materia Prima Guardada con exito"
                }
            }).catch((error)=>{
                throw new Error (`Error al guardar: ${error}`)
            })
            
        } catch (error) {
            let ListadeMP = [];
            await fs.promises.writeFile("./MateriasPrimas.json", JSON.stringify(ListadeMP, null, 2));
        }

    }
    async obtenerId(id){
        try {
            let dato = await fs.promises.readFile("./MateriasPrimas.json", "utf-8")
            let datopar = JSON.parse(dato)
            let objetoid = datopar.find( a => a.id === id )
            return (console.log( objetoid ))
            
        } catch (error) {
            throw new Error (`Id no encontrado:  ${error}`)  
        }
    }
    async obtenerMp(){
        try {
            let dato = await fs.promises.readFile("./MateriasPrimas.json", "utf-8")
            let datopar = JSON.parse(dato)
            return console.log(datopar)
            
        } catch (error) {
            throw new Error (`El archivo esta vacio:  ${error}`)
        }
    }
    async eliminarPorId(Id){
        let data = await fs.promises.readFile("./MateriasPrimas.json", "utf-8");
        let datoP = JSON.parse(data);
        let listaFiltrada = datoP.filter( x => x.id === Id );

        try {
            console.log(listaFiltrada)
            await fs.promises.writeFile("./MateriasPrimas.json", JSON.stringify(listaFiltrada, null, 2));
            return console.log("Materia Prima eliminada satisfactoriamente.");
  
        } catch (error) {
            throw new Error (`El id no corresponde a ninguna Materia Prima:  ${error}`)
        }
    }
    async eliminarTodo() {
        await fs.promises.unlink('./MateriasPrimas.json', function (err) {
            if (err) throw err;
            console.log('Archivo eliminado!');
        });
    }
}



const prueba1 = new Contenedor ("MateriasPrimas.json")

prueba1.save([
    { nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 },
    { nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 },
   { nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 },
    { nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 },
    { nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 }
])

//prueba1.obtenerId("3T0RgDt") // completar con un id que mueste en cosola
//prueba1.obtenerMp()
//prueba1.eliminarPorId("HXnXy2S") // completar con un id que mueste en cosola
//prueba1.eliminarTodo()