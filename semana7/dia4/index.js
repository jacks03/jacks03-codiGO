//este sera el archivp donde vamos a trabajar
import express from "express";
//ahora vamos a importar la variable movies
//para importar una variable de otro archivo usamos import
import cors from "cors"
import { arrayMovies } from "./movies.js";

const app = express()
//esto sirve para poder leer los JSON que envie el cliente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
//para poder crear nuestra rutas
//para este ejemplo vamos a crear un archivo llamando movies.js
//donde guardaremos un array de objeto
//vamos a crear una ruta movies para poder listar nuestras peliculas
app.get("/movies",(req,res)=>{
    res.json(arrayMovies)
})

//ahora haremos la funcion que busca una pelicula por id
//recuerden que debemos recibir un id y en base a ese id buscar la pelicula
app.get("/movies/:id", (req, res)=>{
    //ahora la forma de obtener el valor de la url es con req
    //params permite acceder a los valores de la url
    const id = req.params.id
    const movie = arrayMovies.find((movie)=> movie.id === +id)
    res.json(movie)
})

app.post("/movies", (req, res)=> {
    //en donde se guarda la informacion que envia el cliente?
    //se guarda en req
    //la forma en la cual accedemos a la data que envie el cliente usando body
    //req.body
    const data = req.body;
    const id = arrayMovies.length + 1
    //como agregamos un valor a un objeto
    data.id = id
    //como agrego un elemento a un array?
    arrayMovies.push(data)
    res.json({
        message: "todo bien"
    })
})

app.put("/movies/:id", (req, res)=>{
    const id = req.params.id
    const data = req.body
    const movieIndex = arrayMovies.findIndex((movie)=> movie.id === +id)
    //debemos agregarle el id al data
    data.id= id
    //ahora debemos actualizar la informacion de nuestro elemento 
    //y para ello vamos a buscarlo por su idice
    //quiero que ahora este objeto tengo que el valor de data
    //recordemos que data tiene la informacion que envie el cliente
    //por ende estamos cambiando la info antigua por la nueva
    arrayMovies[movieIndex] = data
    res.json({
        message:"Todo bien",
    })

    app.delete("/movies/:id", (req, res)=>{
        const id = req.params.id

        const newArray = arrayMovies.filter((movie)=> movie.id==! +id)
        //retorna todos los elementos menos el del id que recibimos
        arrayMovies = filter((movies)=> movie.id !== +id)
        res.json({
            message:"todo bien"
        })
    })

})

app.listen(3000, ()=>
console.log("servidor iniciando en http://localhost:3000")
)
