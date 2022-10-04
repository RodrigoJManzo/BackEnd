const contenedor = require(`./contenedor.js`)


const contenedorProductos = new contenedor(`productos`)
 contenedorProductos.getAll()
     .then((datos) => console.log({datos}))
     .catch((error) => console.log({error}))



const express = require ('express')
const app = express()
app.use(express.json())
const PORT = 8080
const server = app.listen(PORT, ()=> {
    console.log(`El servidor http esta escuchando el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el Servidor ${error}`))


app.get(`/productos`, (req, res)=>{
    contenedorProductos.getAll()
    .then(lista =>{
      res.send(lista) 
    })      
})

function randomItem  (items){
    const randomIndex = Math.floor(Math.random()*items.length);
    const item = items[randomItem];
    return item
}
app.get(`/random`, (req, res)=>{
    contenedorProductos.getAll()
    .then(item=>{
        res.json(randomItem(item))
    })
})

// --------------------------------------------------- DESCOMENTAR Y USAR EL METODO PARA TESTEO ---------------------------------------------

//------------------SAVE (REPETIR ESTE METODO PARA VARIOS PRODUCTOS EN EL ARREGLO) --------------------
//  contenedorProductos.save({
//      title: `Monitor`,
//      price: 200,
//      thumbnail: `https://www.lg.com/es/images/monitores/md05928956/gallery/24MK430H-B_D02.jpg`
//  })
//   .then((data)=> console.log({data}))
//   .catch((error)=> console.log({error}))

//------------------GET BY ID--------------------
//  contenedorProductos.getById(2)
//      .then((productoBuscado)=> console.log({productoBuscado}))
//      .catch((error)=> console.log({error}))

//------------------DELETLE BY ID--------------------
//  contenedorProductos.deletleById(5)
//      .then((datos)=> console.log({datos}))
//      .catch((error)=> console.log(error))


//------------------DELETLE ALL--------------------
// contenedorProductos.deletleAll()
//     .then((datos)=> console.log({datos}))
//     .catch((error)=> console.log(error))

