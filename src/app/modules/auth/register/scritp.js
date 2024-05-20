document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // esapcio para agregar la lógica para enviar los datos del formulario a un servidor para registrar al usuario

    // mensaje de registro exitoso
    alert("¡Registro exitoso! Bienvenido, " + fullname + "!");
    // Redireccionar a la página de inicio de sesión
    window.location.href = "login.html";
});
