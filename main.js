
// Toggle de menú
function toggleMenu() {
    document.querySelector('.menu').classList.toggle('active');
}

// Cierra el menú al hacer clic en un enlace
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.menu').classList.remove('active');
    });
});

// Ajusta el menú al redimensionar la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 500) {
        document.querySelector('.menu').classList.remove('active');
    }
});

// Cambiar icono caret en ofertas
const ofertas = document.querySelector('.ofertas');
const caretIcon = ofertas.querySelector('#caret-icon');

ofertas.addEventListener('mouseenter', () => {
    caretIcon.classList.replace('fa-caret-down', 'fa-caret-up');
});

ofertas.addEventListener('mouseleave', () => {
    caretIcon.classList.replace('fa-caret-up', 'fa-caret-down');
});

// Mostrar contenedor de login
function showLogin() {
    const divLogin = document.querySelector('.div-login');
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'block';
    divLogin.style.height = '100%';
}

// Ocultar contenedor de login
function closeLogin() {
    const divLogin = document.querySelector('.div-login');
    const loginContainer = document.querySelector('.login-container');
    loginContainer.style.display = 'none';
    divLogin.style.height = '0%';
}

// Función para mostrar el carrito
function mostrarOverlay() {

    const overlay = document.querySelector('.overlay');
    const carrito = document.querySelector('.overlay .div-carrito');
    
    // Mostramos el fondo oscuro con animación de opacidad
    overlay.style.display = 'block'; 
    setTimeout(() => {
        overlay.classList.add('show'); // El fondo oscuro se desvanece
    }, 0); // Asegura que la clase show se añada justo después de mostrar el overlay
    
    // Animamos el carrito después de un pequeño retraso
    setTimeout(() => {
        carrito.classList.add('show');  // Iniciamos la animación del carrito
    }, 10); // Retraso mínimo para asegurar que el fondo oscuro se haya mostrado primero
}

// Función para cerrar el carrito
function cerrarOverlay() {
    const overlay = document.querySelector('.overlay');
    const carrito = document.querySelector('.overlay .div-carrito');
    
    // Quitamos la animación del carrito
    carrito.classList.remove('show'); // El carrito se desliza de nuevo hacia fuera
    overlay.classList.remove('show'); // El fondo oscuro se desvanece
    
    setTimeout(() => {
        overlay.style.display = 'none';  // Ocultamos el fondo oscuro después de la animación
    }, 100); // Tiempo que dura la animación del carrito (coincide con el de CSS)
}

//tiendas.html
function openTiendas() {
    window.location.href = "tiendas.html";
}



function llenarDatos() {
    // Obtener los valores de los campos de usuario y contraseña
    const username = document.getElementById('username').value;

    // Ocultar el título, el formulario y el enlace de registro
    document.querySelector('h2').style.display = 'none';  // Oculta el título "Iniciar sesión"
    document.querySelector('form').style.display = 'none';  // Oculta el formulario
    document.querySelector('.register-link').style.display = 'none';  // Oculta el enlace de registro

    // Modificar el estilo del contenedor (altura y ancho)
    const loginContainer = document.getElementById('login-container');
    loginContainer.style.height = '50px';  // Ajustar la altura
    loginContainer.style.width = '420px';  // Ajustar el ancho

    // Crear los párrafos con los datos obtenidos
    const userMessage = document.createElement('p');
    userMessage.innerHTML = `Usuario: ${username}`;

    // Agregar los párrafos al contenedor
    loginContainer.appendChild(userMessage);
}

//buscador
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('product-search');
    const products = document.querySelectorAll('.product');

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            
            // Mostrar u ocultar producto según el texto coincida
            if (productName.includes(searchText)) {
                product.style.display = 'block'; // Mostrar
            } else {
                product.style.display = 'none'; // Ocultar
            }
        });
    });
});




