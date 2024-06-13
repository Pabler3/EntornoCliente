var ventana //Creamos esta variable para poder asi trabajar con ella.
var infoText = "" //Creamos esta variable para trabajar con ella.
window.name = "Ventana Secundaria"
//Funcion para abrir una ventana,
function abrirVentana(){
    ancho = prompt("Introduce el ancho de la ventana") //Le pedimos al usuario que nos diga las dimensiones de la ventana.
    alto = prompt("Introduce el alto de la ventana")
    ventana = open("https://lenguajejs.com/javascript/", "ManzaDev", "width=" +ancho + ",height=" + alto) // Le pasamos la URL, windowName y parametros.
    ventana.document.title = "Este es el titulo de la nueva ventana" //Aqui estamos poniendo titulo a la ventana.
}

//Funcion para cerrar ventana.
function cerrarVentana(){
    if(ventana){ //Verificamos si hay ventana secundaria abierta, si es asi introducimos un texto en el parrafo seleccionado y cerramos la ventana.
        var parrafo = document.getElementById("parrafo")
        parrafo.innerHTML = "Hola Javier, aparezco ahora que has cerrado la ventana 👍"
        ventana.close()

    }else {
        alert("No hay ninguna ventana secundaria abierta")
    }
}

//Funcion para dar foco a la ventana.
function darFoco(){
    ventana.focus();
}

//Funcion para quitar foco a la ventana.
function quitarFoco(){
    ventana.blur();
}

//Funcion para imprimir la pantalla.
function imprimir(){
    ventana.print()
}

//Funcion para mover la ventana respecto a la posicion actual.
function moverVentana(){
    ventana.moveBy(15,15);
}

//Funcion para ir a la url anterior.
function atras(){
    history.back();
}


//Trabajamos con el control del tiempo con setInterval.
var intervalDate = setInterval(function() {
    infoText = "" //Reseteo la info para que no la duplique.
    alert("Te muestro esta información por si te resulta interesante")
    //Sacamos un poco de info para manipular propiedades de los objetos history, screen, navigator y window del BOM.
    infoText += "<br/>Ancho: "+screen.width 
    infoText += "<br/>Alto: "+screen.height
    infoText += "<br/>Nombre ventana: "+window.name
    infoText += "<br/>Idioma: "+navigator.language
    infoText += "<br/>Cookies: "+navigator.cookieEnabled
    infoText += "<br/>URLs del historial: "+history.length
    document.getElementById("parrafo2").innerHTML = infoText
    //Con esta funcion cada 5s borraremos el parrafo porque el setInterval lo volvera a mostrar.
    setTimeout(function() {
        document.getElementById("parrafo2").innerHTML = ""
    }, 5000)

}, 10000)

//Funcion para insertar reloj digital en el manejamos control del tiempo con setTimout.
function inicioReloj() {
    var dia = new Date();
    var hr = dia.getHours();
    var min = dia.getMinutes();
    var sec = dia.getSeconds();
    //Formateamos los minutos y segundos con un cero delante si son menores de 10.
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("hora").innerHTML = hr + " : " + min + " : " + sec;
    var time = setTimeout(function(){ inicioReloj() }, 500);
}

//Funcion para formateo de minutos y segundos, nos aseguramos que tengan dos digitos.
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}