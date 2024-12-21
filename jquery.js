// Al hacer clic en un enlace del menú de la categoría
$(document).ready(function () {
    $('.filter').click(function (e) {
        e.preventDefault();  // Evitar el comportamiento por defecto del enlace

        // Obtener la categoría seleccionada
        var category = $(this).data('category');

        // Mostrar solo los productos de la categoría seleccionada
        $('.product').each(function () {
            if ($(this).hasClass(category)) {
                $(this).show();  // Mostrar el producto
            } else {
                $(this).hide();  // Ocultar el producto
            }
        });
    });
});

// Cuando se hace clic en el enlace "Contacto"
$(document).ready(function () {
    $("a[href='#contacto']").click(function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace

        // Desplazarse suavemente al elemento con id "contacto"
        $('html, body').animate({
            scrollTop: $('#contacto').offset().top
        }, 1000); // 1000ms es la duración del desplazamiento (1 segundo)
    });

    // Cuando se hace clic en el enlace "Nosotros"
    $("a[href='#nosotros']").click(function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace

        // Desplazarse suavemente al elemento con id "nosotros"
        $('html, body').animate({
            scrollTop: $('#nosotros').offset().top
        }, 1000); // 1000ms es la duración del desplazamiento (1 segundo)
    });
});

$(document).ready(function () {
    // Función para actualizar el subtotal sumando todas las cantidades
    function actualizarSubtotal() {
        let subtotal = 0;
        // Recorremos todos los productos en el carrito
        $('.lista-productos .producto').each(function () {
            const cantidad = parseInt($(this).find('.num-cantidad p').text(), 10); // Cantidad de cada producto
            const precioUnitario = parseFloat($(this).find('.div-nombre-precio p:nth-child(2)').text().replace('S/. ', '')); // Precio unitario del producto
            subtotal += precioUnitario * cantidad; // Sumamos el precio total del producto (precio unitario * cantidad)
        });

        // Actualiza el subtotal en el footer
        $('.subtotal p:last-child').text(`S/. ${subtotal.toFixed(2)}`);
    }

    // Agregar un producto al carrito
    $('.agregar-al-carrito').on('click', function () {
        // Datos del producto
        const productId = $(this).data('id');
        const productName = $(this).data('name');
        const productPrice = parseFloat($(this).data('price')); // Precio estático
        const productImg = $(this).data('img');
        const totalPrecioProducto = productPrice;

        // Busca si el producto ya está en el carrito
        const carritoItem = $(`.lista-productos .producto[data-id="${productId}"]`);

        if (carritoItem.length > 0) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            const cantidadElement = carritoItem.find('.num-cantidad p');
            const cantidadActual = parseInt(cantidadElement.text(), 10);
            cantidadElement.text(cantidadActual + 1);

            // Actualiza el precio total del producto (usamos el precio estático)
            carritoItem.find('.div-nombre-precio p:last-child').text(`S/. ${(productPrice * (cantidadActual + 1)).toFixed(2)}`);
        } else {
            // Si el producto no está en el carrito, agrega un nuevo div
            const nuevoProducto = `
                <div class="producto" data-id="${productId}">
                    <img src="${productImg}" class="img-carrito">
                    <div class="div-nombre-precio">
                        <p>${productName}</p>
                        <p class="precioUnitario">S/. ${productPrice.toFixed(2)}</p> <!-- Precio estático -->
                        <p class="precioTotal">S/. ${totalPrecioProducto.toFixed(2)}</p> <!-- Precio total del producto -->
                    </div>
                    <div class="div-cantidad">
                        <button class="decrementar-cantidad">-</button>
                        <div class="num-cantidad">
                            <p>1</p>
                        </div>
                        <button class="incrementar-cantidad">+</button>
                        <div class="div-borrar">
                            <button class="borrar-producto">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            $('.lista-productos').append(nuevoProducto);
        }

        // Actualizamos el subtotal
        actualizarSubtotal();
    });

    // Incrementar cantidad
    $(document).on('click', '.incrementar-cantidad', function () {
        const carritoItem = $(this).closest('.producto');  // Obtener el producto específico
        const cantidadElement = carritoItem.find('.num-cantidad p');
        const cantidadActual = parseInt(cantidadElement.text(), 10);
        const precioUnitario = parseFloat(carritoItem.find('.precioUnitario').text().replace('S/. ', ''));

        // Incrementar la cantidad y actualizar el texto
        cantidadElement.text(cantidadActual + 1);

        // Actualizar el precio total
        const nuevoTotal = precioUnitario * (cantidadActual + 1);
        carritoItem.find('.precioTotal').text(`S/. ${nuevoTotal.toFixed(2)}`);

        // Actualizamos el subtotal
        actualizarSubtotal();
    });

    // Decrementar cantidad
    $(document).on('click', '.decrementar-cantidad', function () {
        const carritoItem = $(this).closest('.producto');  // Obtener el producto específico
        const cantidadElement = carritoItem.find('.num-cantidad p');
        const cantidadActual = parseInt(cantidadElement.text(), 10);

        // Si la cantidad es mayor que 1, decrementamos
        if (cantidadActual > 1) {
            cantidadElement.text(cantidadActual - 1);

            // Actualizar el precio total
            const precioUnitario = parseFloat(carritoItem.find('.precioUnitario').text().replace('S/. ', ''));
            const nuevoTotal = precioUnitario * (cantidadActual - 1);
            carritoItem.find('.precioTotal').text(`S/. ${nuevoTotal.toFixed(2)}`);
        }

        // Actualizamos el subtotal
        actualizarSubtotal();
    });

    // Borrar producto
    $(document).on('click', '.borrar-producto', function () {
        $(this).closest('.producto').remove();

        // Actualizamos el subtotal
        actualizarSubtotal();
    });
});

document.getElementById('formulario-contacto').addEventListener('submit', function(event) { 
    event.preventDefault();  // Prevenir el envío tradicional del formulario

    // Obtener el nombre ingresado en el formulario
    var nombre = document.querySelector('input[name="nombre"]').value;

    // Crear el mensaje de confirmación con el nombre del usuario
    var mensaje = document.createElement('div');
    mensaje.id = 'mensaje-confirmacion';
    mensaje.textContent = 'Gracias por contactarte con nosotros, ' + nombre + '. Te responderemos pronto.';

    // Añadir el mensaje al body
    document.body.appendChild(mensaje);

    // Mostrar el mensaje
    mensaje.style.display = 'block';

    // El mensaje desaparecerá después de 3 segundos
    setTimeout(function() {
        mensaje.style.display = 'none';
    }, 3000);
});
    // Función para validar antes de enviar el formulario
    function validateForm() {
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const fechaRecogida = document.getElementById('fecha-recogida').value;
        const horaRecogida = document.getElementById('hora-recogida').value;

        if (!nombre || !telefono || !fechaRecogida || !horaRecogida) {
            alert("Por favor, complete todos los campos obligatorios.");
            return false;  // Evita el envío del formulario si hay campos vacíos
        }
        return true;  // Permite el envío del formulario si todos los campos están llenos
    }


