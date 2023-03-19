
// Obtener referencias a los elementos del DOM
const lista = document.getElementById("lista-productos");
const carrito = document.getElementById("carrito");
const subtotal = document.getElementById("subtotal");
const iva = document.getElementById("iva");
const total = document.getElementById("total");
let contadorBotones = 0;

// Definir variables globales
let carritoProductos = [];
const IVA = 0.21;

// Función para imprimir los productos en la página
function imprimirProductos(productos) {
  productos.forEach((el) => {
    lista.innerHTML += `
      <div class="cajas">
        <div class="center-img-api">
          <img src="${el.images[0]}" class="images-api">
        </div>
        <hr>
        <h4 class="center-text-api">${el.title}</h4>
        <p class="center-text-api">${el.price}$</p>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button id="agregar${el.title}${el.id}" type="button" class="btn btn-dark"> Agregar </button>
        </div>
      </div>`;
    let boton = document.getElementById(`agregar${el.title}${el.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(el));
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  let productoExistente = carritoProductos.find((el) => el.id === producto.id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carritoProductos.push({ ...producto, cantidad: 1 });
  }
  imprimirTabla();
  guardarCarritoEnStorage();
}

// Función para imprimir el carrito en la página
function imprimirTabla() {
  let subtotalPrecio = 0;
  carrito.innerHTML = ""; // mover esta línea al principio de la función
  carritoProductos.forEach((el) => {
    carrito.innerHTML += `
      <tr>
        <td>${el.title}</td>
        <td>${el.price}$</td>
        <td>${el.cantidad}</td>
        <td>${el.price * el.cantidad}$</td>
        <td>
          <button id="eliminar${el.title}${el.id}" type="button" class="btn btn-danger btn-sm"> Eliminar </button>
        </td>
      </tr>`;
    let boton = document.getElementById(`eliminar${el.title}${el.id}`);
    boton.addEventListener("click", () => eliminarDelCarrito(el));
    subtotalPrecio += el.price * el.cantidad;
  });
  subtotal.innerHTML = `$${subtotalPrecio}`;
  iva.innerHTML = `$${(subtotalPrecio * IVA).toFixed(2)}`;
  total.innerHTML = `$${(subtotalPrecio * (1 + IVA)).toFixed(2)}`;
}


// Función para eliminar un producto del carrito
function eliminarDelCarrito(producto) {
  for (let i = 0; i < carritoProductos.length; i++) {
    if (carritoProductos[i].id === producto.id) {
      carritoProductos.splice(i, 1);
      break;
    }
  }
  imprimirTabla();
  guardarCarritoEnStorage();
}

// Función para guardar el carrito en el storage del navegador
function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carritoProductos));
}

fetch('https://dummyjson.com/products')
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      res.products.forEach((el) => {

        lista.innerHTML += `
              <div class="cajas">
                <div class="center-img-api">
                  <img src="${el.images[0]}" class="images-api">
                </div>
                <hr>
                <h4 class="center-text-api">${el.title}</h4>
                <p class="center-text-api">${el.price}$</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${el.title}${el.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
              </div>`;
        let boton = document.getElementById(`agregar${el.title}${el.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(el));
      });
      
    });




