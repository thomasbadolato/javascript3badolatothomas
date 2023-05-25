const formulario = document.getElementById('formulario')
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const inputEmail = document.getElementById('email')
const titulo = document.getElementById('titulo')
const divProductos = document.getElementById('divProductos')

//Ingreso de Datos //

formulario.onsubmit = (e) => {
  e.preventDefault()
  const infoUsuario = {
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    email: inputEmail.value,
  }

  // Storage JSON //

  localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
  formulario.remove()
  titulo.innerText = `Bienvenido ${infoUsuario.nombre} ${infoUsuario.apellido}`
}

// Storage del infoUsuario //

const infoUsuario = localStorage.getItem('infoUsuario')
const infoUsuarioJS = JSON.parse(infoUsuario)
if (infoUsuario) {
  formulario.remove()
  titulo.innerText = `Bienvenido ${infoUsuarioJS.nombre} ${infoUsuarioJS.apellido}`
}

// Armado del Array de los Productos //

class Producto {
  constructor(id, nombre, precio, stock, image) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    this.image = image
  }
}

const productos = [
  new Producto(1, 'Duploc', 3500, 10, './images/duploc.jpg '),
  new Producto(2, 'DMZ', 9500, 5, './images/dmz.jpg'),
  new Producto(3, 'Deep Medi', 2500, 1500, './images/deepmedi.jpg'),
  new Producto(4, 'Scotch Bonnet', 8900, 3000, './images/scotchbonnet.jpg'),

]

// Funcion para recorrer el Array del carrito //

productos.forEach((prod) => {
  divProductos.innerHTML += `<div class="card cardProducto">
  <div class="card" style="width: 15rem;"s
  <div class="card-body">
  <img src="${prod.image}" class="card-img-center" alt="...">
    <h5 class="card-title">${prod.nombre}</h5>
    <p class="card-text"> $ ${prod.precio}</p>
    <button id=${prod.id} class="btn btn-outline-primary">COMPRAR</button>
  </div>
</div>`
})

// Guardar productos en carrito //

const carrito = []

// Funcion para guardar en cada boton comprar //

const botonesAgregar = document.querySelectorAll('.btn-outline-primary')
botonesAgregar.forEach((boton) => {
  boton.onclick = () => {
    const producto = productos.find((prod) => prod.id === parseInt(boton.id))

    const prodCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    }

    const indexProd = carrito.findIndex((prod) => prod.id === prodCarrito.id)
    if (indexProd === -1) {
      carrito.push(prodCarrito)
    } else {
      carrito[indexProd].cantidad++
    }
    console.log(carrito)
  }
})

// Boton finalizar compra //

const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('#thead')
const tbody = document.querySelector('#tbody')
const parrafoTotal = document.querySelector('#total')
botonFinalizar.onclick = () => {
  divProductos.remove()
  botonFinalizar.remove()
  thead.innerHTML = `<tr class= "table">
<th scope="col">Products</th>
<th scope="col">Quantity</th>
<th scope="col">Total</th>
</tr>`

  let totalCompra = 0
  carrito.forEach(prod => {
    totalCompra += prod.cantidad * prod.precio
    tbody.innerHTML += `
    <tr>
      <td>${prod.nombre}</td>
      <td>${prod.cantidad}</td>
      <td> $ ${prod.cantidad * prod.precio}</td>
    </tr>
    `
  })
  parrafoTotal.innerText = `the total of your purchase is $ ${totalCompra}`
}

