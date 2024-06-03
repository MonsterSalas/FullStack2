$(document).ready(function() {
    const estaLogueado = localStorage.getItem('estaLogueado');

    if (estaLogueado === 'true') {
        $('#ingresar').text('Cerrar sesión').attr('href', 'index.html');
    } else {
        $('#ingresar').text('Ingresar').attr('href', 'login.html');
    }
    
    const $sessionClose = $('#ingresar');
    $sessionClose.click(function() {
        localStorage.setItem('estaLogueado', 'false');
    });
    
    const productos = [
        {
            nombre: 'ASUS Prime H510M-E',
            descripcion: 'Placa Madre ASUS Prime H510M-E',
            imagen: '/static/img/motherboard.jpg',
            precio: '100'
        }
    ];
    
    const $row = $('.row');
    
    productos.forEach(function(producto) {
        const $col = $('<div>').addClass('col-lg-4 col-md-6 col-sm-12');
        const $card = $('<div>').addClass('product-card');
        const $img = $('<img>').attr('src', producto.imagen).attr('alt', producto.nombre);
        const $h5 = $('<h5>').addClass('mt-3').text(producto.nombre);
        const $p = $('<p>').text(producto.descripcion);
        const $p2 = $('<p>').text('$' + producto.precio);
        const $button = $('<button>').addClass('btn comprar').text('Comprar')
            .attr('data-producto', producto.nombre)
            .attr('data-precio', producto.precio);
        $card.append($img, $h5, $p, $p2, $button);
        $col.append($card);
        $row.append($col);
    });
    $('.comprar').on('click', function() {
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'Agregado al carrito',
            timer: 800,
            showConfirmButton: false
        });
    });
});
