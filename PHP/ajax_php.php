<?php
    header("Content-Type: application/json; charset=UTF-8"); //Establecemos el tipo de la respuesta como JSON.
    error_reporting(0); //Desactivamos la notificacion de errores.
   
    //Verificamos que los datos llegan por POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        //Verificamos que se ha enviado un nuevo array por POST.
        if(isset($_POST['nuevoArray'])){
            //Guardamos en una variable el JSON enviado y lo convertimos a array. El true dice que sea un array asociativo, si fuera false seria un objeto.
            $nuevoArray = json_decode($_POST['nuevoArray'], true);
    
            // Obtener datos actuales. Si existe el archivo leemos el contenido y lo decodificamos como hemos hecho arriba.
            $datos = [];
            if (file_exists('../JSON/datos.json')) {
                $datos = json_decode(file_get_contents('../JSON/datos.json'), true);
            }
        
            // Agregar el nuevo array al array existente.
            $datos[] = $nuevoArray;
        
            // Guardar el array actualizado en el archivo datos.json pero ahora a la inversa. Pasamos el array a formato JSON y lo formateamos para que sea mas legible con JSON_PRETTY_PRINT.
            file_put_contents('../JSON/datos.json', json_encode($datos, JSON_PRETTY_PRINT));
        }elseif (isset($_POST['lenguajeBorrar'])){

            $lenguajeBorrar = $_POST['lenguajeBorrar'];

            $datos = [];
            if (file_exists('../JSON/datos.json')) {
                $datos = json_decode(file_get_contents('../JSON/datos.json'), true);

                //Recorremos los datos del array y lo borramos por el nombre.
                foreach($datos as $clave => $valor){
                    if($valor['nombre'] === $lenguajeBorrar){
                        unset($datos[$clave]);
                    }
                }

                //Reordenamos las claves del array despues de borrar un lenguaje con array_values que devuelve una copia ordenada.
                $datos = array_values($datos);
                //Guardamos el array actualizado en nuestro archivo .json.
                file_put_contents('../JSON/datos.json', json_encode($datos, JSON_PRETTY_PRINT));
            }
        }
        
    }
?>