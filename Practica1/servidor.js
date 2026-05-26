console.log("Hola mundo js desde el servidor ")

let edad1 = 30
let edad2 = 17

console.log("Edad Promedio")
console.log((edad1 + edad2)/2)

/* Medir tiempo de procesos*/

console.time("Proceso")
/*for(let i = 0; i <100000000000; i++)*/

console.timeEnd("Proceso")

let usuarios =[
    {nombre: "Erik", edad:"20"},
    {nombre: "Juanito", edad:"90"},
]

console.table(usuarios)