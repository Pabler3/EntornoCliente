//Funcion para redirigir a la pagina de jQuery
function redirigir(){
    window.location.href = "../HTML/indexjQuery.html"
}

function iniciar() {
    document.getElementById("enviar").addEventListener('click', validar, false)
}

//Funcion para validar el nombre con checkValidy y el objeto validity en el cual utilizaremos sus propiedades.
function validarNombre() {
    var campo = document.getElementById("nombre")
    if (!campo.checkValidity()) {
        if (campo.validity.valueMissing) { //Con la propiedad valuemissing devuelve true si el input tiene el atributo required y no tiene ningun valor.
            errorMessage(campo, "Por favor, introduce un nombre")
        }
        if (campo.validity.patternMismatch) { //La propiedad patternmismatch devolvera true si el input no concuerda con la expresion regular.
            errorMessage(campo, "El nombre debe contener entre 2 y 10 caracteres")
        }
        return false
    }
    return true
}

//Funcion para validar el email con checkValidy y el objeto validity en el cual utilizaremos sus propiedades.
function validarEmail() {
    var campo = document.getElementById("email")
    if (!campo.checkValidity()) {
        if (campo.validity.valueMissing) {
            errorMessage(campo, "Por favor, introduce una dirección de email")
        }
        return false // Si diese error el campo.
    }
    return true
}

//Funcion para validar la contraseña con checkValidy y el objeto validity en el cual utilizaremos sus propiedades.
function validarContrasena() {
    var campo = document.getElementById("psw")
    if (!campo.checkValidity()) {
        if (campo.validity.valueMissing) {
            errorMessage(campo, "Por favor, introduce una contraseña")
        }
        if (campo.validity.patternMismatch) {
            errorMessage(campo, "Introduce una contraseña válida, debe contener al menos una letra y un numero")
        }
        return false // Si diese error el campo.
    }
    return true
}

//Funcion para validar el telefono con checkValidy y el objeto validity en el cual utilizaremos sus propiedades.
function validarTelefono() {
    var campo = document.getElementById("telefono")
    if (!campo.checkValidity()) {
        if (campo.validity.valueMissing) {
            errorMessage(campo, "Por favor, introduce un telefono de contacto")
        }
        if (campo.validity.patternMismatch) {
            errorMessage(campo, "El telefono debe tener el formato XXX-XXX-XXX")
        }
        return false // Si diese error el campo.
    }
    return true
}

//Funcion para validar si se ha marcado el checkbox con checkvalidity.
function validarCheckbox(){
    var campo = document.getElementById("mayor18")
    if (!campo.checked){ //Comprueba si esta marcado el checkbox.
        errorMessage(campo, "El checkbox no está marcado y es requerido")
        return false
    }
    return true
}

//Funcion para mostrar cualquier error que diese en cualquiera de las funciones de validadción.
function errorMessage(campo, mensaje) {
    document.getElementById("mensajeError").innerHTML = mensaje;
    campo.className = "error";
    campo.focus();
}

//Funcion para borrar cualquier estilo de error en los campos del formulario.
function borrarError() {
    var formulario = document.forms[0];
    for (var i = 0; i < formulario.elements.length; i++) {
        formulario.elements[i].className = ""
    }
}


//Funcion que para validar todas las funciones del formulario, si alguna funcion falla o si el usuario no acepta el confirm cancelamos el envio con evento.preventDefault.
function validar(evento) {
    borrarError();
    if (validarNombre() && validarEmail() && validarTelefono() && validarContrasena() && validarCheckbox() && confirm("Pulsa aceptar si deseas ver el despegue")){
        return true

    } else {
        evento.preventDefault() //Cancela el envio del formulario de forma predeterminada.
        return false;
    }
}

// Aseguramos que el código se ejecute después de que la página se haya cargado.
document.addEventListener('DOMContentLoaded', function () {
    iniciar();
});