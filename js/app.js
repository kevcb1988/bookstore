//Caprturo mis elementos fde HTML con variables
const carritoCompras = document.querySelector("#contenido-carrito-de-compras");
const contenidoCarritoCompras = document.querySelector("#lista-carrito-compras tbody");
const listaLibros = document.querySelector("#lista-libros");
const limpiarCarrito = document.querySelector("#limpiar-carrito");
let librosSeleccionados = [];


//FUNCIONES
cargarEventos();
function cargarEventos(){
    listaLibros.addEventListener('click', agregarLibro);
}

function agregarLibro(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-libro")){
        //Selecciona la card principal de cada libro y la envío por parámetro
        const libroSeleccionado = e.target.parentElement.parentElement.parentElement;
        leerDatosLibro(libroSeleccionado)
    }
}

function leerDatosLibro(libro){
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

    //Agregar libros al array librosSeleccionados
    //Saco una copia de mi arreglos de libroSeleccionados y le paso la información almacenada en datosLibro
    librosSeleccionados = [...librosSeleccionados, datosLibro]
    console.log(librosSeleccionados)

    //Llamo la función carritoHTML() para agregar los libros dentro del carrito de compras
    carritoHTML();
}

//Muestra el carrito de compras
function carritoHTML(){
    //Limpio el array para evitar que se dupliquen los datos
    limpiarElementosCarrito();

    librosSeleccionados.forEach(libro => {
        console.log(libro)
        const libroCarrito = document.createElement('tr');
        libroCarrito.innerHTML = `
            <td class="portada"><img src="${libro.portada}"/></td>
            <td class="titulo">${libro.titulo}</td>
            <td class="precio">${libro.precio}</td>
            <td class="cantidad">${libro.cantidad}</td>
            <td>
                <a href="" data-id="${libro.id}"><img class="eliminar-libro" src="../img/trash-black.svg"/></a>
            </td>
        `
        //Agrego el contenido al tbody
        contenidoCarritoCompras.appendChild(libroCarrito);
    })
}

function limpiarElementosCarrito(){
    //contenidoCarritoCompras.innerHTML = "";
    while(contenidoCarritoCompras.firstChild){
        contenidoCarritoCompras.removeChild(contenidoCarritoCompras.firstChild)
    }
}