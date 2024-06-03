$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuario = usuarios.find(function(usuario) {
            return usuario.email === email && usuario.password === password;
        });
        
        const estaLogueado = true;
        localStorage.setItem('estaLogueado', JSON.stringify(estaLogueado));

        if (!usuario) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Correo o contraseña incorrecta.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Ingresado',
            text: 'Has ingresado con éxito.',
            timer: 2000,
            showConfirmButton: false
        })
        .then(() => {
            Swal.close();
            window.location.href = 'Index.html'; // Redirect to the URL returned from the server
          });;;
    });
});