$(document).ready(function() {
    $('#registrarForm').submit(function(event) {
        event.preventDefault();

        const nombre = $('#nombre').val();
        const email = $('#email').val();
        const password = $('#password').val();

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, introduce un correo válido.',
            });
            return;
        }

        if (!passwordRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.',
            });
            return;
        }

        const usuario = {
            nombre: nombre,
            email: email,
            password: password
        };

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        Swal.fire({
            icon: 'success',
            title: 'Registrado',
            text: 'Usuario registrado con éxito.',
            
        })
        .then(() => {
            Swal.close();
            window.location.href = 'Login.html'; // Redirect to the URL returned from the server
          });;
    });
});