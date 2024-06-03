$(document).ready(function() {
    const estaLogueado = localStorage.getItem('estaLogueado');

    if (estaLogueado === 'true') {
        $('#ingresar').text('Cerrar sesión').attr('href', 'index.html');
    }
    else{
        $('#ingresar').text('Ingresar').attr('href', 'login.html');
    }
    
    const $sessionCLose =$('#ingresar')
    $sessionCLose.click(function(){
        localStorage.setItem('estaLogueado', 'false');
    });
    const productos = [
        {
            nombre: 'ASUS Prime H510M-E',
            descripcion: 'Placa Madre ASUS Prime H510M-E Socket LGA 1200 micro-ATX PCIe 4.0 M.2 32Gbps',
            imagen: '/static/img/motherboard.jpg',
            precio: '$100'
        }
    ];
    const $row = $('.row');


    productos.forEach(function(producto) {
        const $col = $('<div>').addClass('col-lg-4 col-md-6 col-sm-12');
        const $card = $('<div>').addClass('product-card');
        const $img = $('<img>').attr('src', producto.imagen).attr('alt', producto.nombre);
        const $h5 = $('<h5>').addClass('mt-3').text(producto.nombre);
        const $p = $('<p>').text(producto.descripcion);
        const $p2 = $('<p>').text(producto.precio);
        const $button = $('<button>').addClass('btn').text('Comprar');

        $card.append($img, $h5, $p,$p2, $button);
        $col.append($card);
        $row.append($col);
    });
});