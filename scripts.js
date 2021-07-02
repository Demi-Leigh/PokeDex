let base_URL = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch a list of pokemon
function getPokemonList(url) {
  fetch(url)
    // Convert data from JSON
    .then((response) => response.json())
    //Stuff to do with data
    .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      // Get the list of pokemon from the results
      let pokemon = data.results;
      // Get element from HTML to write buttons in
      let container = document.querySelector(".pokemon-list-container");
      // Clear the container
      container.innerHTML = "";
      // Loop over pokemon list and create an HTML button for each one. Add the button to the container
      pokemon.forEach((btn) => {
        container.innerHTML += `<button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      // Add a next pokemon button
      container.innerHTML += `<br><br><button onclick="getPokemonList('${data.next}')">Next</button>`;
    });
}

// Get default pokemon list
getPokemonList(base_URL);

// Function to get information about a specific pokemon
function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Make sure data comes through
      console.log(data);
      fetch(data.species.url)
        .then((res) => res.json())
        .then((speciesData) => {
          console.log(speciesData);
          // Write data to pokemon information container
          document.querySelector(".pokemon-info").innerHTML = `
          <img class="pokemon-front" src="${data.sprites.other.dream_world.front_default} ">
          <p>NAME: ${data.name}</p>
          <p>ABILITY: ${data.abilities[0].ability.name}</p><br>
          <p>${speciesData.flavor_text_entries[6].flavor_text}</p>
          `;
        });
    });
}
