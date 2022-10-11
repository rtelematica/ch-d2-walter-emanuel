
const fs = require("fs")
const generadorid = require("./generadorId")

class Contenedor{

    constructor(listaMp){
        this.listaMp = listaMp
    }

    // El requerimiento para esta función: Recibir un objeto, lo guarda en el archivo y devuelve el id asignado
    // En principio esta funcion recibe un array de objetos los itera para establecer su id y posteriormente
    // los guarda en el archivo MateriasPrimas.json

    // FAVOR DE CORREGIR, esta función unicamente debe aceptar un objeto y almacenarlo en el archivo. 
    // En el requerimiento del desafio se menciona lo siguiente como aspectos a incluir:
    // - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id
    //   del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
    // - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
    
    // Si gustas pueden seguir utilizando tu generador de ids y tener dos id, uno que hace referencia 
    // al requerimiento del desafio (id1) y el otro que se genera con tu función (id2) 
    // TE PIDO INCLUYAS EL MECANISMO DE ID SOLICITADO EN EL DESAFÍO
    // TAMBIÉN CORREGIR QUE LA FUNCIÓN DEVUELVA EL ID, PUEDE SER CUALQUIERA DE LOS DOS
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

    // Esta funcion NO devuelve un objeto con base en su id, o null si no está. FAVOR DE CORREGIR
    async obtenerId(id){
        try {
            let dato = await fs.promises.readFile("./MateriasPrimas.json", "utf-8")
            let datopar = JSON.parse(dato)
            let objetoid = datopar.find( a => a.id === id )

            // Este return console.log no tiene sentido, recordemos que console.log es una funcion que muestra 
            // un mensaje en la terminal y no devuelve ningun valor, FAVOR DE CORREGIR
            return (console.log( objetoid ))
            
        } catch (error) {
            throw new Error (`Id no encontrado:  ${error}`)  
        }
    }

    // obtenerMp acorde al requerimiento del desafio es una funcion que debe DEVOLVER un array con todos los objetos (materias primas)
    // presentes en el archivo (MateriasPrimas.json), y esta funcion no esta devolviendo nada.
    // Bastaria con return datopar;
    // FAVOR DE CORREGIR
    async obtenerMp(){
        try {
            let dato = await fs.promises.readFile("./MateriasPrimas.json", "utf-8")
            let datopar = JSON.parse(dato)

            // Este return console.log no tiene sentido, recordemos que console.log es una funcion que muestra 
            // un mensaje en la terminal y no devuelve ningun valor, FAVOR DE CORREGIR
            return console.log(datopar)
            
        } catch (error) { 
            // Si hay algun error al leer el archivo o incluso al llamar a JSON.parse puede que el mensaje "El archivo esta vacio"
            // no sea la mejor opcion, un mensaje como: Error al leer archivo o error al obtener datos del archivo 
            // tenga un mejor sentido para proposito del error. FAVOR DE CORREGIR
            throw new Error (`El archivo esta vacio:  ${error}`)
        }
    }


    // El requerimiento del desafío indica que no se debe devolver nada en esta función
    // FAVOR DE CORREGIR Y PUEDES ELIMINAR POR CUALQUIERA DE LOS DOS ID
    async eliminarPorId(Id){
        let data = await fs.promises.readFile("./MateriasPrimas.json", "utf-8");
        let datoP = JSON.parse(data);

        // Estas guardando el elemento filtrado, osea el elemento a eliminar de tu lista.
        // Si JSON.parse(data) = [{id: 1, ...}, {id: 2, ...}] al hacer el filter como lo tienes si Id = 1 (elemento a eliminar)
        // listaFiltrada será igual a [{id: 1, ...}] y por lo tanto guardaras el elemento a eliminar,
        // FAVOR DE CORREGIR, BASTA CON UTILIZAR !== EN LUGAR DE ===
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

// En lugar de utilizar el metodo anterior con un arreglo
// FAVOR DE PROBAR UTILIZANDO MULIPLES LLAMADAS, POR EJEMPLO
prueba1.save({ nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 })
prueba1.save({ nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 })
prueba1.save({ nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 })
prueba1.save({ nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 })
prueba1.save({ nombre: "Lignosulfonato De Sodio", cod: 01, lote: "234-s", stock: 2347 })

// FAVOR DE LLAMAR A CADA UNOS DE LOS METODOS DE LA CLASE CONTENEDER, RECOMIENDO LA SIGUIENTE EJECUCION:
console.log(prueba1.obtenerMp()) // DEBEN VISUALIZARCE 5 ELEMENTOS
prueba1.save({ nombre: "OTRO", cod: 01, lote: "234-s", stock: 12 })
console.log(prueba1.obtenerMp()) // DEBEN VISUALIZARCE 6 ELEMENTOS

prueba1.eliminarPorId("id")
console.log(prueba1.obtenerMp()) // NO SE DEBE VISUALIZAR EL ELEMENTO ELIMINADO

console.log(prueba1.obtenerId("id")) // BUSCAR CON UN ID QUE EXISTA, DEBE VISUALIZARSE EL OBJETO
console.log(prueba1.obtenerId("id")) // BUSCAR CON UN ID QUE NO EXISTA, DEBE VISUALIZARSE null

prueba1.eliminarTodo()
console.log(prueba1.obtenerMp()) // DEBE VISUALIZARSE UN ARREGLO VACIO []


prueba1.obtenerId(prueba1.get) // completar con un id que mueste en cosola

console.log(prueba1.obtenerMp())
