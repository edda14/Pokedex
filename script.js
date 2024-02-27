async function takePokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=99&offset=0';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let currentPokemon = responseAsJson['results'];
    for (let p = 0; p < currentPokemon.length; p++) {
        getPokemon(currentPokemon, p);
    }
}

async function getPokemon(currentPokemon, p) {
    let url = currentPokemon[p]['url'];
    let response = await fetch(url);
    let pokemon = await response.json();
    cardTemplate(pokemon, p)
}

function cardTemplate(pokemon, p) {
    console.log(pokemon);
    let image = pokemon['sprites']['front_shiny'];
    let name = pokemon['name'];
    let baseExperience = pokemon['base_experience'];
    return document.getElementById('card').innerHTML += `<div class="pokedexCard"> <div class="divLeft"> XP&ensp;<b>${baseExperience}</b> </div> <h2>${name}</h2> <img src="${image}"> <div class="cardinfo">  </div> </div>
    `;
}

