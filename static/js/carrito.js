$(document).ready(function() {
    actualizarCarrito();
});

let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

$('#verCarrito').on('click', function() {

    actualizarCarrito();
    $('#carritoModal').modal('show');
});

$(document).on('click', '.comprar', function() {
    let producto = $(this).data('producto');
    let precio = $(this).data('precio');
    if (carrito[producto]) {
        carrito[producto].cantidad++;
    } else {
        carrito[producto] = { cantidad: 1, precio: precio };
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
});

function actualizarCarrito() {
    let $carrito = $('.carrito');
    $carrito.empty();
    let total = 0;
    for (let producto in carrito) {
        if (carrito.hasOwnProperty(producto) && carrito[producto] !== null) {
            let cantidad = carrito[producto].cantidad;
            let precio = carrito[producto].precio;
            total += cantidad * precio;

            let $producto = $('<div>').text(producto + ' (' + cantidad + ')');
            let $mas = $('<button>').text('+').on('click', function() {
                carrito[producto].cantidad++;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
            let $menos = $('<button>').text('-').on('click', function() {
                carrito[producto].cantidad--;
                if (carrito[producto].cantidad === 0) {
                    delete carrito[producto];
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
            $carrito.append($producto, $mas, $menos);
        }
    }
    let $total = $('<div>').text('Total: $' + total);
    $carrito.append($total);
}
