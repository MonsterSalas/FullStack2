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
        localStorage.deleteItem('carrito')
    });
    // Obtener la cadena JSON de localStorage
    const productosJSON = localStorage.getItem('productos');

    // Convertir la cadena JSON a un array de productos
    const productos = JSON.parse(productosJSON);

    // Seleccionar el contenedor donde se mostrarán los productos
    const $container = $('.productos');

    // Limpiar el contenedor
    $container.empty();

    // Insertar cada producto en el contenedor
    productos.forEach(function(producto) {
        const $producto = $('<div>').addClass('producto');
        const $nombre = $('<h2>').text(producto.nombre);
        const $descripcion = $('<p>').text(producto.descripcion);
        const $precio = $('<p>').text('$' + producto.precio);

        $producto.append($nombre, $descripcion, $precio);
        $container.append($producto);
    });

    const $row = $('.row');
    productos.forEach(function(producto, index) {
        const $col = $('<div>').addClass('col-lg-4 col-md-6 col-sm-12');
        const $card = $('<div>').addClass('product-card');
        const $img = $('<img>').attr('src', producto.imagen).attr('alt', producto.nombre);
        const $h5 = $('<h5>').addClass('mt-3').text(producto.nombre);
        const $p = $('<p>').text(producto.descripcion);
        const $p2 = $('<p>').text('$' + producto.precio);
        const $button = $('<button>').addClass('btn comprar').text('Editar')
            .attr('data-index', index)
            .on('click', function() {
                // Llenar el modal con los datos del producto
                $('#productName').val(producto.nombre);
                $('#productDescription').val(producto.descripcion);
                $('#productPrice').val(producto.precio);

                // Guardar el índice del producto en el botón "Guardar cambios"
                $('#saveChanges').data('index', index);

                // Mostrar el modal
                var myModal = new bootstrap.Modal(document.getElementById('editProductModal'));
                myModal.show();
            });
        $card.append($img, $h5, $p, $p2, $button);
        $col.append($card);
        $row.append($col);
    });

    // Controlador de eventos para el botón "Guardar cambios"
    $('#saveChanges').on('click', function() {
        // Obtener el índice del producto
        const index = $(this).data('index');

        // Actualizar el producto
        productos[index].nombre = $('#productName').val();
        productos[index].descripcion = $('#productDescription').val();
        productos[index].precio = $('#productPrice').val();

        // Guardar los productos en localStorage
        const productosJSON = JSON.stringify(productos);
        localStorage.setItem('productos', productosJSON);

        // Recargar la página
        location.reload();
    });
});