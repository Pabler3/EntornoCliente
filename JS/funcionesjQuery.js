//Cuenta atras para cohete
$(document).ready(function(){ // Con esta linea nos aseguramos que las funciones se ejecutan cuando el documento este listo.
    var selectElemento = $('.cuentaAtras') //Creamo una variable con la referencia de la clase cuenta atras.

    //Funcion para iniciar la cuenta atras para el despegue.
    function startCuentaAtras(){

        var num = 5 //Variable que guardar desde donde queremos inicar nuestra cuenta atras.
        var numAtras = setInterval(function() { //Creamos la variable y le metemos setInterval que nos ejecutara la funcion siguiente cada segundo, en este caso la cuenta atras.
            selectElemento.text(num).fadeIn(500).fadeOut(500) //Actualizamos el contenido de la variable num con dos efectos de entrada y salida con desvanecido cada 500 milisegundos
            num -- //Restamos un numero a la cuenta atras, variable num
            if (num < 0){ //Cuando lleguemos a 0 detenemos el interval, actualizamos el texto de la variable.
                clearInterval(numAtras)
                selectElemento.text('¡Despegando!')
                setTimeout(despegar, 1500) //Pasados 1,5s llamamos a la funcion despegar.
            }
        },1500)      
    }
    //Cuando hagamos click en el boton, llama a la funcion para empezar la cuenta atras.
    $('#start').click(function(){
        startCuentaAtras()    
    })

//Funcion para despegar el cohete.
    function despegar(){
        $('#cohete').animate({ //Seleccionamos el elemento con el ID cohete y aplicamos la funcion animate que nos permite lanzar el cohete.
            top: '-100%' // Con la propiedad top movemos el cohete hacia arriba del todo con una duracion de 3500 milisegundos en subir.
        }, 3500, function(){
            $(this).hide() // Con this hacemos referencia en este caso al elemento que hemos animado y la funcion hide lo oculta una vez terminada la funcion.
        })
    }
})

