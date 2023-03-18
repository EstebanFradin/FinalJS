
// ********************************** VARIABLES ************************************** //

let cart = [];
let total = 0;
const cartTable = document.querySelector('#cart tbody');
const totalCell = document.querySelector('#total');
const checkoutBtn = document.querySelector('#checkout');

// ********************************** FUNCIONES ************************************** //

function addToCart(producto, cantidad, precio) {
    const item = {
      producto,
      cantidad,
      precio,
      total: cantidad * precio,
    };
    
    cart.push(item);
    
    updateCartTable();
    saveCart();
  }

  function updateCartTable() {
    const table = document.querySelector('#cart tbody');
    table.innerHTML = '';
    
    cart.forEach((item, index) => {
      const row = table.insertRow();
      
      const productoCell = row.insertCell();
      productoCell.textContent = item.producto;
      
      const cantidadCell = row.insertCell();
      cantidadCell.textContent = item.cantidad;
      
      const precioCell = row.insertCell();
      precioCell.textContent = item.precio;
      
      const totalCell = row.insertCell();
      totalCell.textContent = item.total;
      
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Eliminar';
      removeBtn.classList.add('btn', 'btn-dark');
      
      removeBtn.addEventListener('click', () => {
        removeItem(index);
      });
      
      const removeCell = row.insertCell();
      removeCell.appendChild(removeBtn);
    });
    
    const total = cart.reduce((acc, item) => acc + item.total, 0);
    document.querySelector('#cart tfoot td:last-child').textContent = total;
  }

  function updateTotal() {
    total = cart.reduce((acc, item) => acc + item.total, 0);
    totalCell.textContent = total;
  }


  const productos = [
    { nombre: 'Camisa', precio: 500 },
    { nombre: 'Pantalón', precio: 800 },
    { nombre: 'Zapatos', precio: 1200 },
  ];

  function mostrarProductos() {
    const productosList = document.querySelector('#productos');
    
    productos.forEach(producto => {
      const item = document.createElement('li');
      item.textContent = `${producto.nombre}: $${producto.precio}`;
      
      const addBtn = document.createElement('button');
      addBtn.textContent = 'Agregar al carrito';
      addBtn.classList.add('btn', 'btn-dark');
      
      addBtn.addEventListener('click', () => {
        addToCart(producto.nombre, 1, producto.precio);
      });
      
      item.appendChild(addBtn);
      
      productosList.appendChild(item);
    });
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartTable();
    }
  }

  window.addEventListener('load', () => {
    loadCart();
  });

  function removeItem(index) {
    cart.splice(index, 1);
    updateCartTable();
    saveCart();
  }


  // ********************************** LLAMADO DE FUNCION ************************************** //
  mostrarProductos();




