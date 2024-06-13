window.addEventListener("load", inicio)

function inicio(){
    document.getElementById("ver").addEventListener("click", ver)
    document.getElementById("formulario").addEventListener("submit", nuevoLenguaje)
    document.getElementById("formulario2").addEventListener("submit", borrarLenguaje)
}

//Funcion para mostrar los datos de nuestro archivo .json en este caso utilizando el objeto XMLHttpRequest.
function ver() {
    var xhr = new XMLHttpRequest() //Creamos el objeto para realizar la peticion http.
    xhr.onreadystatechange = function () { //Manejamos el cambio de estado de la peticion y verificamos si esta completada (4) y con exito (200).
        if (this.readyState == 4) {
            if (this.status == 200) {
                var respuesta = JSON.parse(this.responseText) //Si es asi parseamos los datos devueltos por la solicitud que estan en responseText.
                //En esta caso los datos los mostramos en una tabla.
                if (respuesta.length > 0) {
                    var tabla = "<table><tr><th>Nombre</th><th>Creador</th><th>Año</th><th>Uso</th></tr>"

                    for (var i = 0; i < respuesta.length; i++) {
                        tabla += "<tr><td>" + respuesta[i].nombre + "</td><td>" + respuesta[i].creador + "</td><td>" + respuesta[i].anio + "</td><td>" + respuesta[i].uso + "</td></tr>"
                    }

                    tabla += "</table>"
                    document.getElementById("resultados").innerHTML = tabla
                } else {
                    alert("No hay datos")
                }
            } else {
                alert("Error en la solicitud. Estado: " + this.status)
            }
        }
    }

    xhr.open("GET", "../JSON/datos.json", true) //Abrimos la solicitud, en este caso por get, le metemos la url, y con true le decimos que de manera asincrona.
    xhr.send() //Enviamos la solicitud.
}

//Funcion para insertar datos a nuestro archivo mediante POST.
function nuevoLenguaje(e){
    e.preventDefault() 
    //Obtenemos los valores del formulario y los metemos en un nuevo objeto.
    var nombre = document.getElementById("nombre").value
    var creador = document.getElementById("creador").value
    var anio = document.getElementById("anio").value
    var uso = document.getElementById("uso").value
    // Asignamos los valores recogidos a los campos de un nuevo objeto.
    var nuevoArray = {
        nombre: nombre,
        creador: creador,
        anio: anio,
        uso: uso
    }
    //Misma solicitud Ajax que para mostrar datos.
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            if(this.status == 200){
                alert("Nuevo lenguaje ingresado correctamente")
                limpiarCamposFormulario()
                ver()
            } else {
                alert("Error al enviar los datos")
            }          
        }
    }
    xhr.open("POST", "../PHP/ajax_php.php", true)//Abrimos la solicitud, metodo, url y async.
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")//Cabecera para interpretar los datos que enviamos en el cuerpo de la solicitud.
    xhr.send('nuevoArray=' + encodeURIComponent(JSON.stringify(nuevoArray)))//Enviamos la solicitud, xhr.(data) ahi metemos los parametros a enviar. Objeto js que convertimos a json.

}

//Funciona para limpiar los input despues de ingresar un lenguaje.
function limpiarCamposFormulario() {
    // Obtenemos las referencias de los input del formulario y ponemos sus valores en blanco.
    document.getElementById('nombre').value = '';
    document.getElementById('creador').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('uso').value = '';
}

//Funcion para borrar un lenguaje por nombre.
function borrarLenguaje(e){
    e.preventDefault()
    //Recogemos el valor introducido en el input.
    var lenguajeBorrar = document.getElementById('lenguajeBorrar').value

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (){
        if(this.readyState == 4){
            if(this.status == 200){
                alert("Lenguaje borrado correctamente")
                limpiarCamposFormulario()
                ver()
            } else {
                alert("Error al borrar los datos")
            }          
        }
    }
    xhr.open("POST", "../PHP/ajax_php.php", true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send('lenguajeBorrar=' + encodeURIComponent(lenguajeBorrar))


}