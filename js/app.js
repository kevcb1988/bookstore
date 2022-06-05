//Caprturo mis elementos fde HTML con variables
const carritoCompras = document.querySelector("#contenido-carrito-compras");
const contenidoCarritoCompras = document.querySelector("#lista-carrito-compras tbody");
const listaLibros = document.querySelector("#lista-libros");
const limpiarCarrito = document.querySelector("#limpiar-carrito");
let librosSeleccionados = [];


cargarEventos();
//FUNCIONES
function cargarEventos() {
    listaLibros.addEventListener('click', agregarLibro);
    //Eliminar libros del carrito
    carritoCompras.addEventListener('click', eliminarLibro);
    //Vaciar carrito de compras
    limpiarCarrito.addEventListener('click', vaciarCarrito);
}


//Agregar libor al carrito de compras
function agregarLibro(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-libro")) {
        //Selecciona la card principal de cada libro y la envío por parámetro
        const libroSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatosLibro(libroSeleccionado)
    }
}

//Eliminar libro del carrito de compras
function eliminarLibro(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('eliminar-libro')){
        //Capturo el ID del libro
        const libroID = e.target.getAttribute('data-id');
        //Eliminar libro
        librosSeleccionados = librosSeleccionados.filter(libro => libro.id !== libroID);
        console.log(librosSeleccionados);
        //Ejecuto la funcion carritoHTML, para recorrer el carrito y actualizarlo.
        carritoHTML()
    }
}

//Limpiar carrito de compras
function vaciarCarrito(){
    librosSeleccionados = [];
    limpiarElementosCarrito();
    console.log(librosSeleccionados)
}

function leerDatosLibro(libro) {
    console.log(libro)
    //Creo un objeto con los datos obtenidos desde agregarLibro()
    const datosLibro =
    {
        id: libro.querySelector('button').getAttribute('data-id'),
        portada: libro.querySelector('img').src,
        titulo: libro.querySelector('.libro-titulo').textContent,
        autor: libro.querySelector('.libro-autor').textContent,
        precio: libro.querySelector('.libro-precio').textContent,
        cantidad: 1
    }

    //Reviso si ya exite ul mimo libro dentro del carrito
    const libro_existente = librosSeleccionados.some(libro => libro.id === datosLibro.id);
    console.log(libro_existente)
    if (libro_existente) {
        //Actualizo la cantidad dentro del carrito
        const libros = librosSeleccionados.map( libro => {
            if(libro.id === datosLibro.id){
                libro.cantidad ++;
                return libro;
            }else{
                return libro;
            }
        });
        librosSeleccionados = [...librosSeleccionados]

    } else {
        //Agrego libro al carrito
        //Agregar libros al array librosSeleccionados
        //Saco una copia de mi arreglos de libroSeleccionados y le paso la información almacenada en datosLibro
        librosSeleccionados = [...librosSeleccionados, datosLibro]
        console.log(librosSeleccionados)
    }
    //Llamo la función carritoHTML() para agregar los libros dentro del carrito de compras
    carritoHTML();
}

//Muestra el carrito de compras
function carritoHTML() {
    //Limpio el array para evitar que se dupliquen los datos
    limpiarElementosCarrito();

    librosSeleccionados.forEach(libro => {
        console.log(libro)

        //Limpiamos nuestro objeto, con esto al momento de imprimir nuesto libro tenemos más limpio el código
        const { portada, titulo, precio, cantidad, id } = libro;

        const libroCarrito = document.createElement('tr');
        libroCarrito.innerHTML = `
            <td class="portada"><img src="${portada}"/></td>
            <td class="titulo">${titulo}</td>
            <td class="precio">${precio}</td>
            <td class="cantidad">${cantidad}</td>
            <td>
                <a href="#" class="eliminar-libro" data-id="${id}"></a>
            </td>
        `
        //Agrego el contenido al tbody
        contenidoCarritoCompras.appendChild(libroCarrito);
    })
}

function limpiarElementosCarrito() {
    //contenidoCarritoCompras.innerHTML = "";
    while (contenidoCarritoCompras.firstChild) {
        contenidoCarritoCompras.removeChild(contenidoCarritoCompras.firstChild)
    }
}