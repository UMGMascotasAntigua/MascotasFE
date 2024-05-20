document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Aquí se agregara la lógica de autenticación, por ejemplo, enviar los datos a un servidor para verificarlos
    
    // Simulación de inicio de sesión exitoso
    alert("¡Inicio de sesión exitoso! Bienvenido, " + username + "!");
    // Redireccionar a la página principal
    window.location.href = "index.html";
});
