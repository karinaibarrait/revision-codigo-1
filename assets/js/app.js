const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const $n = document.querySelector('.name'); // Se agregó "." para indicar que name es una clase
const $b = document.querySelector('.blog'); // Se cambió "#" por "." para indicar que es una clase
const $l = document.querySelector('.location');
const $img = document.querySelector('.avatar'); // Seleccionar el elemento de la imagen

// Se declaró la función como async para poder usar await correctamente
async function displayUser(username) {
  $n.textContent = 'Cargando...'; // Mensaje para indicar que se está cargando la información
  $img.src = ''; // Limpiar la imagen previa al buscar un nuevo usuario
  try { // Se agregó try/catch a la función para manejar posibles errores durante la solicitud
    const response = await fetch(`${usersEndpoint}/${username}`);
    
    // Validar que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error('No se pudo obtener la información del usuario.');
    }
    
    const data = await response.json(); // Se agregó const data para recibir la respuesta en formato JSON
    console.log(data);
    
    // Mostrar los datos del usuario en el DOM
    $n.textContent = data.name || 'No disponible'; // Mostrar "No disponible" si el nombre es null o undefined
    $b.textContent = data.blog || 'Blog no disponible'; // Mostrar "No disponible" si el blog es null o undefined
    $l.textContent = data.location || 'Ubicación no disponible'; // Mostrar "No disponible" si la ubicación es null o undefined
    $img.src = data.avatar_url || ''; // Mostrar la imagen del usuario si está disponible
    $img.alt = `Foto de ${data.name || username}`; // Añadir un texto alternativo significativo
  } catch (err) { // Se agregó catch para manejar posibles errores
    handleError(err);
  }
}

function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  $n.textContent = `Algo salió mal: ${err}`; // Se cambió "n" por "$n" ya que "n" no está definido.
  $img.src = ''; // Limpiar la imagen en caso de error
}

// Añadir un evento para buscar el usuario ingresado en el input
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  if (username) {
    displayUser(username);
  }
});


