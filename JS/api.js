
document.getElementById('miFormulario').addEventListener("submit", function (event) {
    event.preventDefault(); // Evitamos que el formulario se envíe y recargue la página.
    mostrarDatos()
})

//Funcion para obtener datos de la API con fetch.
function mostrarDatos(){
    var genero = document.getElementById('genero').value //Recogemos los valores introducidos por el formulario.
    var cantidad = document.getElementById('cantidad').value

    fetch(`https://randomuser.me/api/?gender=${genero}&results=${cantidad}`) //URL para realizar la solicitud a la api, en este caso con parametros que hemos recogido e introducido mediante backticks.
        .then(response => response.json()) //Con una arrow function transformamos la respuesta que recoge en un json en este caso.
        .then(data => { //Este then maneja los datos obtenidos en la respuesta y los mostramos en este caso en una tabla que hemos procesado con backticks.
            var tabla = ""
            for (let usuario of data.results) { //Bucle for of que va recorriendo el archivo y vamos metiendo en una tabla los valores que necesitamos.
                tabla += `<tr><th colspan='2'>Documento identificativo</th></tr>
                <tr><td>${usuario.name.first} ${usuario.name.last}</td>
                <td rowspan='3' style='text-align: center'><img src="${usuario.picture.medium}"></td></tr>
                <tr><td>${usuario.location.street.name}, ${usuario.location.street.number}</td></tr>
                <tr><td>${usuario.location.city} (${usuario.location.country})</td></tr>
                <tr><td>${usuario.email}</td><td style='text-align: center'>${usuario.gender}, ${usuario.dob.age}</td></tr>`
            }
            document.getElementById('tabla').innerHTML = tabla //Adjuntamos los datos al elemento tabla.
        })
        .catch(error => console.error('Error al obtener datos:', error)) //Por si acaso da algun error lo manejamos con catch y lo mostramos en la consola.
}

//Esta API no permite hacer POST para insertar datos, pero te pongo una funcion para ello.
function insertarDatos(){
  //Recogeriamos los valores con los datos.
  var id = document.getElementById('id').value
  var nombre = document.getElementById('name').value
  var ciudad = document.getElementById('city').value

    //Recogeriamos los datos del usuario atraves de un formulario, un promt o cualquier metodo válido
    fetch('URL', { //URL de la API
  headers: {
    'Content-type': 'application/json' //Cabecera especificando el tipo de archivo.
  },
  method: 'POST', //El metodo utilizado, en este caso para insertar.
  body: JSON.stringify({ id: id, name: nombre, city: ciudad }) //En el cuerpo meteriamos los datos y los convertiriamos a JSON.
  })
  .then((response) => response.json()) //Manejamos la respuesta como la anterior.
  .then((data) => {
    alert('Usuario insertado con éxito: ', data)
  })
  .catch(error => console.log('Error al insertar usuario: ', error))
}


//Esta API no permite hacer PUT para actualizar datos, pero te pongo una funcion para ello.
function actualizarDatos(){
  //Recogeriamos los valores con los datos.
  var id = document.getElementById('id').value
  var nombre = document.getElementById('name').value
  var ciudad = document.getElementById('city').value

    //Recogeriamos los datos del usuario atraves de un formulario, un promt o cualquier metodo válido
    fetch(`URL/${id}`, { //URL de la API en el que añadimos el id a actualizar.
  headers: {
    'Content-type': 'application/json' //Cabecera especificando el tipo de archivo.
  },
  method: 'PUT', //El metodo utilizado, en este caso para actualizar.
  body: JSON.stringify({ name: nombre, city: ciudad }) //En el cuerpo meteriamos los datos y los convertiriamos a JSON.
  })
  .then((response) => response.json()) //Manejamos la respuesta como la anterior.
  .then((data) => {
    alert('Usuario actualizado con éxito: ', data)
  })
  .catch(error => console.log('Error al actualizar usuario: ', error))
}


//Esta API no permite hacer DELETE para borrar datos, pero te pongo una funcion para ello.
function borrarDatos(){
  //Recogeriamos los valores con los datos.
  var id = document.getElementById('id').value
 
    //Recogeriamos los datos del usuario atraves de un formulario, un promt o cualquier metodo válido
    fetch(`URL/${id}`, { //URL de la API en el que añadimos el id borrar y borraremos por id.
    method: 'DELETE' 
  })
  .then((response) => response.json()) //Manejamos la respuesta como la anterior.
  .then((data) => {
    alert('Usuario borrado con éxito: ', data)
  })
  .catch(error => console.log('Error al actualizar usuario: ', error))
}
