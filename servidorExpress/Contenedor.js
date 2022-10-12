
const fs = require("fs")


class Contenedor{

    constructor(listaMp){
        this.listaMp = listaMp
    }

    async save(objeto){
        try {
            
            objeto.id= (listaMp.length+1)
            this.listaMp.push(objeto)


            await fs.promises.writeFile("./MateriasPrimas.json", JSON.stringify(listaMP, null, 2)
            
            ).then(()=>{
                return{
                    status:"Satisfactorio", message:`Materia Prima Guardada con exito  ${objeto.id}`
                }
            }).catch((error)=>{
                throw new Error (`Error al guardar: ${error}`)
            })
            
        } catch (error) {
            this.listaMP = [];
            await fs.promises.writeFile("./MateriasPrimas.json", JSON.stringify(listaMP, null, 2));
        }

    }
    async obtenerId(id){
        try {
            let dato = await fs.promises.readFile("./MateriasPrimas.json", "utf-8")
            let datopar = JSON.parse(dato)
            let objetoid = datopar.find( a => a.id === id )
            return objetoid 
            
        } catch (error) {
            throw new Error (`Id no encontrado:  ${error}`)  
        }
    }
    async obtenerMp(){
        try {
            let dato = await fs.promises.readFile("./MateriasPrimas.json", "utf-8")
            let datopar = JSON.parse(dato)
            return datopar
            
        } catch (error) {
            throw new Error (`Error al leer archivo o error al obtener datos del archivo:  ${error}`)
        }
    }
    async eliminarPorId(Id){
        let data = await fs.promises.readFile("./MateriasPrimas.json", "utf-8");
        let datoP = JSON.parse(data);
        let listaFiltrada = datoP.filter( x => x.id !== Id );

        try {
            console.log(listaFiltrada)
            await fs.promises.writeFile("./MateriasPrimas.json", JSON.stringify(listaFiltrada, null, 2));
  
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



module.exports = Contenedor;