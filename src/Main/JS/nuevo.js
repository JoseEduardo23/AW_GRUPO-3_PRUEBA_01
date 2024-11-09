
let peliculas = []; 
let peliculasFiltradas = []; 


const cargarImagenes = async () => {
  const url = 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '67251ac193mshb4139c05fb94303p1edb50jsnba4a63c261fb',
		  'x-rapidapi-host': 'imdb188.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    

    peliculas = data.data.list;  
    peliculasFiltradas = peliculas;
    mostrarPeliculas(); 
  } catch (error) {
    console.error("Error al cargar las películas:", error);
  }
};


const mostrarPeliculas = () => {
  const contenedor = document.getElementById('peliculas-container');
  contenedor.innerHTML = ''; 

  peliculasFiltradas.forEach(pelicula => {
    const div = document.createElement('div');
    div.classList.add('pelicula');

    div.innerHTML = `
      <img src="${pelicula.primaryImage.imageUrl}" alt="${pelicula.titleText.text}" />
      <div class="pelicula-info">
        <h3>${pelicula.titleText.text}</h3>
        <p><strong>Año:</strong> ${pelicula.releaseYear.year}</p>
        <p><strong>Género:</strong> ${pelicula.titleType.text}</p>
        <p><strong>Descripción:</strong> ${pelicula.plot.plotText.plainText}</p>
      </div>
    `;

    contenedor.appendChild(div); 
  });
};


const filtrarPorGenero = () => {
  const generoSeleccionado = document.getElementById('genre-select').value;

  if (generoSeleccionado) {
   
    peliculasFiltradas = peliculas.filter(pelicula =>
      pelicula.titleType.text.toLowerCase().includes(generoSeleccionado.toLowerCase())
    );
  } else {
   
    peliculasFiltradas = peliculas;
  }
  
  mostrarPeliculas(); 
};


const buscarPeliculas = () => {
  const query = document.getElementById('search-input').value.toLowerCase();

 
  peliculasFiltradas = peliculas.filter(pelicula =>
    pelicula.titleText.text.toLowerCase().includes(query)
  );

  mostrarPeliculas(); 
};


document.getElementById('genre-select').addEventListener('change', filtrarPorGenero);
document.getElementById('search-input').addEventListener('input', buscarPeliculas);

cargarImagenes();
