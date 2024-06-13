//Funcion que contiene todos los eventos mediante addEventListener click controlamos los botones de la pagina principal para ejecutar las funciones.
function principal() {
    document.getElementById("insertarLenguaje").addEventListener("click", insertarLenguaje) //Evento de click asociado a boton.
    document.getElementById("buscarElemento").addEventListener("click", buscarElemento) //Evento de click asociado a boton.
    document.getElementById("accederPadreHijo").addEventListener("click", accederPadreHijo)
    document.getElementById("borrarElemento").addEventListener("click", borrarElemento)
    document.getElementById("crearElemento").addEventListener("click", crearElemento)
    document.getElementById("recorrerPagina").addEventListener("click", recorrerPagina)
    document.getElementById("modificarLenguaje").addEventListener("click", modificarLenguaje)
    document.getElementById("mostrarCosas").addEventListener("click", dameHora)
    document.getElementById("mostrarCosas").addEventListener("mouseover", saludar) //Evento de raton que salta al pasar por el boton.
    document.getElementById("parrafo1").addEventListener("dblclick", color) // Evento de doble click sobre etiqueta h2.
    document.getElementById("nombre").addEventListener("keydown", colorInput) //Evento de teclado cuando pulsamos sobre el input.
    document.getElementById("nombre").addEventListener("keyup", volverInput) //Evento de teclado cuando soltamos la tecla sobre el input.

}

//Funcion para insertar una nueva fila en la tabla. 
function insertarLenguaje(){ //Primero recogemos los datos obtenidos en el formulario en variables.
    var tabla = document.getElementById("miTabla").getElementsByTagName('tbody')[0]//Seleccionamos el elemento del DOM con el id "miTabla" y obtenemos los elementos hijos tbody el primer elemento en este caso [0]
    var nombre = document.getElementById("nombre").value //Mediante getElementById.value obtenemos del DOM el valor de la etiqueta con ese id y lo guardamos en una variable.
    var roles = document.getElementById("rol").value //Mismo caso que en nombre
    var meGusta = document.getElementById("meGusta").checked ? '😉' : '' //Igual, pero con un operador ternario guardamos lo que corresponda si es true o false segun la seleccion del usuario.
    var noGusta = document.getElementById("noGusta").checked ? '😉' : ''

    //Creamos una nueva filas y sus celdas
    var fila = tabla.insertRow(tabla.rows.length) //Insertamos una nueva fila en el elemento tabla. Obtenemos el numero actual de filas y lo pasamos como argumento a insertRow para insertarla en la ultima posicion disponible.
    // Creamos las celdas correspondientes segun su posicion y las insertamos en la fila creada anteriormente.
    var celdaID = fila.insertCell(0)
    var celdaNombre = fila.insertCell(1)
    var celdaRoles = fila.insertCell(2)
    var celdaMeGusta = fila.insertCell(3)
    var celdaNoGusta = fila.insertCell(4)

    //Asigamos los datos obtenidos del formulario a la celda correspondiente con textContent.
    celdaID.textContent = tabla.rows.length
    celdaNombre.textContent = nombre
    celdaRoles.textContent = roles
    celdaMeGusta.textContent = meGusta
    celdaNoGusta.textContent = noGusta

    //Limpiamos los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("rol").value = "Servidor";
    document.getElementById("meGusta").checked = false;
    document.getElementById("noGusta").checked = false;

}

//Funcion para buscar elementos
function buscarElemento(){
    var lenguajeABuscar = prompt("Introduce el lenguaje de programación a buscar:") //El usuario nos dice el lenguaje a buscar y lo almacenamos en la variable.

    if (lenguajeABuscar !== null && lenguajeABuscar.trim() !== "") { //Nos aseguramos que la variable no esta vacía, trim() elimina los espacios en blanco.       
        // Buscar y resaltar la celda con el nombre proporcionado
        var celdasBuscadas = document.querySelectorAll("#miTabla td:nth-child(2)") // Seleccionamos todas las celdas nombre de la tabla.
        celdasBuscadas.forEach(function (celda) { //Recorremos las celdas con foreach y con indexof encontramos la posicion del elemento buscado y le añadimos la clase highlight CSS.
            if (celda.textContent.indexOf(lenguajeABuscar) !== -1) {
                celda.classList.add("highlight") //Propiedad que resalta una celda con CSS
            }
        })
        // Restablecemos el resaltado despues de 4 segundos con la funcion setTimeout y classList.remove eliminamos la propiedad higtlight.
        setTimeout(function () {
            celdasBuscadas.forEach(function (celda) {
                celda.classList.remove("highlight")
            })
        }, 4000)
    } else {
        alert("Lenguaje no válido o encontrado")
    }
    
}
//Estas dos variables la utilizaremos en varias funciones.
var filas = []
var celdas = [] //Creamos un array vacio donde iremos agregando las celdas cuando las recorramos.
var posicionActual = 0 //Inicializamos la posicion actual a 0.
//Funcion para moverse por las celdas de la tabla
function moverse(direccion){
    //Con dos bucles for anidados recorremos la tabla y añadimos las celdas al array.
    var fila = document.getElementById("bodyTabla").rows //Rescatamos las filas de la tabla.
    for (var i = 0; i<fila.length; i++){
        filas.push(fila[i])
        var celdasFila = fila[i].cells
        for (var j = 0; j<celdasFila.length; j++){
            celdas.push(celdasFila[j]) //Con el metodo push vamos añadiendo celdas al array.
        }
    }
//Con el comparador segun el boton pulsado vamos hacia delante o hacia atras, y con el % nos aseguramos que el indice este dentro de los limites.
    if (direccion === 'adelante'){ 
        posicionActual = (posicionActual + 1) % celdas.length
        resaltarElemento() //Resaltamos elemento
    } else if (direccion === 'atras') {
        posicionActual = (posicionActual -1 + celdas.length) % celdas.length
        resaltarElemento()
    }
}

function resaltarElemento(){ //Funcion para resaltar el contenido. 
    celdas.forEach(function(celda){
        celda.classList.remove("highlight")//Eliminamos la clase con remove.
    })
    celdas[posicionActual].classList.add("highlight")//Añadimos la clase con .add.

    setTimeout(function(){ //Funcion para temporizar el resaltado durante 2 seg.
        celdas[posicionActual].classList.remove("highlight")
    }, 4000)
}

//Funcion para acceder al padre/hijo de la posicion actual de la tabla y devolvernos su contenido.
function accederPadreHijo(){
    var elementoActual = celdas[posicionActual]
    //Vamos acceder al padre del elemento actual con parentElement.
    var padre = elementoActual.parentElement.textContent
    alert("El padre del elemento actual es: " + padre) //Mostramos la informacion
    //Ahora accedemos al primer hijo del elemento actual con firstChild.
    var primerHijo = elementoActual.firstChild.textContent
    alert("El primer hijo del elemento actual es: " + primerHijo)
    //Ahora accedemos al ultimo hijo del elemento actual con lastChild. 
    var ultimoHijo = elementoActual.lastChild.textContent
    alert("El último hijo del elemento actual es: " + ultimoHijo)
}

//Funcion para movernos por el cuerpo de la pagina.
function recorrerPagina(){
    //Obtenemos el contenido del body.
    var body = document.getElementById("cuerpo")
    //Llamamos a la funcion para recorrer los elementos del body y le pasamos body como parametro.
    recorrerElementos(body)
}

//Funcion recursiva para recorrer los elementos del body.
function recorrerElementos(elemento){
    //Mostramos la informacion sobre el tipo de nodo y su contenido si es elemento html.
    alert("El tipo de nodo seleccionado es: " + elemento.nodeType)
    if (elemento.nodeType === 1){ //1 es porque son los elementos html.
        alert("El contenido del nodo es: " + elemento.textContent.trim())
    }

    //Vamos a recorrer los nodos descendientes del elemento seleccionado con Chilnodes.
    var hijos = elemento.chilNodes
    for (var i = 0; i<hijos.length; i++){
        recorrerElementos(hijos[i])
    }
}

//Funcion para crear elementos.
function crearElemento(){
    var crear = document.createElement("p") //Creamos la etiqueta html con createElement.
    var texto = document.createTextNode("Acabas de insertarme con un boton 😎 ") //Indicamos el texto que queremos introducir.
    crear.appendChild(texto) //Asiganamos el texto creado a la etiqueta creada con appendChild.
    crear.setAttribute("class", "parrafo") //Mediante setAttribute hemos añadido un atributo de clase a la clase parrafo que ya teniamos.
    
    var contenedor = document.getElementById("contenedor1") //Recuperamos el lugar donde queremos insertar la etiqueta creada con su texto y atributo.
    var lugar = prompt("¿Donde quieres insertar el parrafo, 'arriba' o 'abajo' del parrafo?") //Le pedimos al usuario que nos indique donde quiere insertar la etiqueta, jugando con el primer o ultimo hijo del lugar seleccionado, en este caso el div.
    if (lugar === "arriba"){contenedor.insertBefore(crear, contenedor.firstChild)} //El insertBefore no permite especificar en que lugar lo queremos insertar y el nodo a insertar, en este caso en primer lugar.
    if (lugar === "abajo"){contenedor.insertBefore(crear, contenedor.lastChild)} // En este caso el insertBefore nos dice que lo insertemos en ultimo lugar. Tambien hubiera valido en este caso hacerlo directamente con appendChild tambien, ya que lo ingresa al final.
}

//Funcion borrar elementos por el id de la tabla.
function borrarElemento(){
    //Pedimos al usuario que nos diga que ID quiere borrar.
    var idBorrar = prompt("Introduce el ID de la fila que quieres borrar")
    //Comprobamos que ha ingresado un ID
    if (idBorrar !== null && idBorrar.trim() !== ""){
        //Recuperamos el body de la tabla
        var bodyTabla = document.getElementById("bodyTabla")
        //Recuperamos las filas del body de la tabla con tagName que nos devuelve un array con los tr.
        var filas = bodyTabla.getElementsByTagName("tr")
        //Recorremos el array de las filas buscando que el contenido de las celdas en la posicion 0 que son los ID coincida con el introducido por el usuario.
        for (var i = 0; i<filas.length; i++){
            var idActual = filas[i].getElementsByTagName("td")[0].textContent
            if (idActual === idBorrar){
                bodyTabla.removeChild(filas[i])
                alert("La fila con el ID: "+ idBorrar + " ha sido borrada con exito")
                return
            }
            
        }
        alert("No hemos encontrado ninguna fila con el ID: " + idBorrar)
    }
}

//Funcion para modificar un lenguaje por un ID introducido por el usuario.
function modificarLenguaje(){
    //Pedimos al usuario que nos diga que lenguaje quiere modificar
    var idModificar = prompt("Introduce el ID del lenguaje que deseas modificar")
    //Recuperamos todas las filas de la tabla -> de los tbody -> y nos quedamos con los tr.
    var filas = document.getElementById("miTabla").getElementsByTagName("tbody")[0].getElementsByTagName("tr")
    //Recorremos las filas en busca de un ID que coincida con el introducido.
    for (var i=0; i<filas.length; i++){
        var idActual = filas[i].getElementsByTagName("td")[0].textContent
        //Vamos a comprobar si coinciden los ID
        if (idActual === idModificar){
            //Le vamos a pedir al usuario que vaya introduciendo los nuevos valores para las celdas de esa fila.
            var nombre = prompt("Introduce el nuevo nombre:")
            var rol = prompt("Introduce el nuevo rol, 'Servidor' o 'Cliente':")
            var meGusta = prompt("Introduce el nuevo valor para la casilla 'Me gusta', (true o false)")
            meGusta = meGusta.toLocaleLowerCase() === 'true' ? '😉' : ''
            var noGusta = prompt("Introduce el nuevo valor para la casilla 'No me gusta', (true o false)")
            noGusta = noGusta.toLocaleLowerCase() === 'true' ? '😉' : ''
            

            //Asignamos los valores introducidos por el usuario al contenido de la celda correspondiente.
            filas[i].getElementsByTagName("td")[1].textContent = nombre
            filas[i].getElementsByTagName("td")[2].textContent = rol
            filas[i].getElementsByTagName("td")[3].textContent = meGusta
            filas[i].getElementsByTagName("td")[4].textContent = noGusta

            alert("El lenguaje con el ID " + idModificar + " Se ha modificado con exito")
            return
        }
    }
    alert("No hemos encontrado ninguna fila con el ID: " + idModificar)

}

//Funcion que nos devolvera la hora actual
function dameHora(){
    var reloj = new Date() //Creamos un objeto date y apartir de ahi vamos creando hora, minuto y segundo.
    var hora = reloj.getHours()
    var minutos = reloj.getMinutes()
    var segundos = reloj.getSeconds()

    var horaActual = (hora + ":" + minutos + ":" + segundos)

    alert("La hora actual es: " + horaActual) //Te la devolvemos la hora actual que asociaremos a un evento

}

//Funcion para saludar con temporizador para eliminar evento y texto etiqueta.
function saludar(){
    var text = document.getElementById("h2Saludo") 
    text.innerHTML="Hola Javier, se me había olvidado saludarte, pero me voy ya"
    text.style.color = "rgba(255, 255, 0, 0.548)"
    setTimeout(function(){ //Temporizamos la eliminacion.
        text.removeEventListener("mouseover", saludar) //Eliminamos el evento con removeEventlistener.
        text.remove()
    }, 4000)
    

}

//Funcion para cambiar estilo a los h2.
function color(){
    document.getElementById("parrafo1").style.color="rgb(186, 133, 63)"
}

//Funcion para mostrar info al cargar la pagina.
window.onload = () => alert("En esta página te voy a mostrar DOM y eventos")

//Funcion para para colorear el input del formulario.
function colorInput(){
    document.getElementById("nombre").style.backgroundColor = "rgba(255, 255, 0, 0.548)"
}

function volverInput(){
    document.getElementById("nombre").style.backgroundColor =""
}