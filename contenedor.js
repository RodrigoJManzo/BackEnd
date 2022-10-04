const fs = require('fs')


class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = `./${nombreArchivo}.txt` 
    }

    
    async getAll (){
        try{
            const archivo = await fs.promises.readFile(this.nombreArchivo, `utf-8`)
            const elementos = JSON.parse(archivo)
            return elementos
        }
        catch (error){
            console.log(error)
            if (error.code === 'ENOENT'){
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 3))
                return []
            }
        }
    }

    async save(objeto){
        try {
            const objetos = await this.getAll();

            const id = objetos.length === 0 ? 1 : objetos[objetos.length -1].id +1

            objeto.id = id

            objetos.push(objeto)

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetos, null, 3))

            return objeto.id

        } catch (error) {
            console.log(error)
        }
    }
    
    async getById(id){
        try {
            
            const objetos = await this.getAll();
            
            const objetoBuscado = objetos.find((objeto) => objeto.id == id)


            if(!objetoBuscado) return null
            return objetoBuscado


        } catch (error) {
            console.log(error)
        }
    }

    async deletleById(id){
        try {
            const objetos = await this.getAll()

            const busqueda = objetos.find((objeto) => objeto.id == id)

            if(!busqueda) return `El objeto a eliminar no existe`

            const filtrado = objetos.filter((objeto)=> objeto.id != id)

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(filtrado, null, 3))

            return filtrado

        } catch (error) {
            console.log(error)
        }
    }

    async deletleAll(){
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([],null,3));
        } catch (error) {
            console.log(error)
        }
    }
}



module.exports = Contenedor;
