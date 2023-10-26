document.addEventListener('DOMContentLoaded', function () {
    // Definir productos en formato JSON
    const productosData = {
      "productos": [
        {
          "modelo": "Cuadrado",
          "precio": 12000,
          "color": "Negro",
          "imagen": "img/fogon-cuadrado.png"
        },
        {
          "modelo": "Hexagonal",
          "precio": 15000,
          "color": "Negro",
          "imagen": "img/Fogon-Hexagonal.jpg"
        },
        {
          "modelo": "Portatil",
          "precio": 10000,
          "color": "Negro",
          "imagen": "img/fogon-portatil.png"
        }
      ]
    };

    // Seleccionar elementos relevantes del DOM
    const productosSection = document.getElementById('productos');
    const carritoList = document.getElementById('carrito-list');
    const totalPrecio = document.getElementById('total-precio');

    // Inicializar el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para renderizar productos en la sección de productos
    function renderizarProductos() {
      productosData.productos.forEach((producto) => {
        const productoHTML = document.createElement('article');
        productoHTML.className = 'producto';
        productoHTML.dataset.modelo = producto.modelo;
        productoHTML.dataset.precio = producto.precio;

        productoHTML.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.modelo}">
          <h3>${producto.modelo}</h3>
          <p>Fogón ${producto.modelo} en color ${producto.color}</p>
          <span class="precio">$${producto.precio}</span>
          <button class="cta-button comprar-button">Comprar</button>
        `;

        productoHTML.querySelector('.comprar-button').addEventListener('click', () => {
          agregarAlCarrito(producto);
        });

        productosSection.appendChild(productoHTML);
      });
    }

    // Función para actualizar el carrito y la UI
    function actualizarCarrito() {
      carritoList.innerHTML = '';

      let total = 0;

      carrito.forEach((item) => {
        const carritoItem = document.createElement('li');
        carritoItem.innerHTML = `${item.modelo} - $${item.precio} - Cantidad: ${item.cantidad} <button class="remove-button" data-modelo="${item.modelo}">Quitar</button>`;
        carritoList.appendChild(carritoItem);

        total += item.precio * item.cantidad;
      });

      totalPrecio.textContent = total;

      localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
      const itemEnCarrito = carrito.find((item) => item.modelo === producto.modelo);

      if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
      } else {
        carrito.push({ modelo: producto.modelo, precio: producto.precio, cantidad: 1 });
      }

      actualizarCarrito();
    }

    // Agregar evento click para eliminar un elemento del carrito
    carritoList.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-button')) {
        const modelo = event.target.getAttribute('data-modelo');
        const itemIndex = carrito.findIndex((item) => item.modelo === modelo);

        if (itemIndex !== -1) {
          const item = carrito[itemIndex];
          if (item.cantidad > 1) {
            item.cantidad--;
          } else {
            carrito.splice(itemIndex, 1);
          }

          actualizarCarrito();
        }
      }
    });

    // Función para cancelar la compra y vaciar el carrito
    function cancelarCompra() {
      carrito = []; // Vaciamos el carrito
      actualizarCarrito(); // Actualizamos la UI
    }

    // Función para simular una compra realizada
    function comprar() {
      // Puedes personalizar este mensaje o realizar acciones adicionales aquí
      alert("Compra realizada. ¡Gracias por tu compra!");
    }

    // Agregar evento click para el botón de cancelar compra
    const cancelarCompraButton = document.getElementById('cancelar-compra');
    cancelarCompraButton.addEventListener('click', cancelarCompra);

    // Agregar evento click para el botón de compra
    const comprarButton = document.getElementById('comprar');
    comprarButton.addEventListener('click', comprar);

    // Renderizar productos iniciales
    renderizarProductos();
  });
