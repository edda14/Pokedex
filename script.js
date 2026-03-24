let pokemons = [];
let maxPokemons = 18;
let minPokemons = 1;
let allPokemonList = [];
let initialLoadCount = 30;
let backgroundLoadStartIndex = 30;
let totalPokemonToLoad = 250;

async function takePokemon() {
    showOverlay();
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    allPokemonList = responseAsJson['results'];
    await loadInitialPokemons();
    renderCart();
    hideOverlay();
    loadRemainingPokemonsInBackground();
}

async function loadInitialPokemons() {
    for (let p = 0; p < initialLoadCount; p++) {
        await getPokemon(allPokemonList, p);
    }
}

async function loadRemainingPokemonsInBackground() {
    for (let p = backgroundLoadStartIndex; p < totalPokemonToLoad; p++) {
        await getPokemon(allPokemonList, p);
    }
}

async function getPokemon(currentPokemon, p) {
    let url = currentPokemon[p]['url'];
    let response = await fetch(url);
    let pokemon = await response.json();
    pokemons.push(pokemon);
    pokemons.sort((a, b) => a.id - b.id);
}

function showOverlay() {
    document.getElementById("loadingOverlay").classList.remove("d-none");
}

function hideOverlay() {
    document.getElementById("loadingOverlay").classList.add("d-none");
}

function search(){
    document.getElementById('moreButton').classList.add('d-none');
    document.getElementById('allPokemons').classList.remove('d-none');
    let value = document.getElementById('input').value;
    let search = value.toLowerCase();
    if (value.trim() === ""){
        window.location.reload(false);
    } else{
    matches = pokemons.filter((pokemon) => {
        return pokemon.name.includes(search);
    });
    document.getElementById('card').innerHTML = "";
    matches.forEach(async (match) => {
        let i = match.id - 1;
        template(i);
        abilitiesCard(i);
        backgroundCardColor(i);
    })}
} 

function renderCart() {
    document.getElementById('card').innerHTML = "";
    for (let b = 1; b <= maxPokemons; b++) {
        if (!pokemons[b - 1]) {
            break;
        }
        template(b - 1);
        abilitiesCard(b - 1);
        backgroundCardColor(b - 1);
    }
    updateLoadMoreButton();
}

function loadMore() {
    maxPokemons = maxPokemons + 24;
    renderCart();
}

function updateLoadMoreButton() {
    let moreButton = document.getElementById('moreButton');
    if (maxPokemons >= pokemons.length) {
        moreButton.classList.add('d-none');
    } else {
        moreButton.classList.remove('d-none');
    }
}

function abilitiesCard(p) {
    let pokemon = pokemons[p];
    let abilities = pokemon['abilities'];
    for (let a = 0; a < abilities.length; a++) {
        const abilitiesection = abilities[a];
        let ability = abilitiesection['ability']['name'];
        document.getElementById(`cardinfo${p}`).innerHTML += `<div class="abilitySection"> <p>${ability}&ensp;</p> </div>`;
    }
}

function abilitiesBigCard(p) {
    let pokemon = pokemons[p];
    let abilities = pokemon['abilities'];
    for (let a = 0; a < abilities.length; a++) {
        const abilitiesection = abilities[a];
        let ability = abilitiesection['ability']['name'];
        document.getElementById(`ability${p}`).innerHTML += `${ability}&ensp;&ensp;`;
    }
}


function template(p) {
    const pokemon = pokemons[p];
    let image = pokemon["sprites"]["other"]["dream_world"]["front_default"];
    let name = pokemon["name"];
    let baseExperience = pokemon['base_experience'];
        return document.getElementById('card').innerHTML += `<div onclick="openCard(${p})" class="pokedexCard" id="pokedexCard${p}"> 
        <div class="divLeft"> XP&ensp;<b>${baseExperience}</b> </div> <h2>${name}</h2> <img src="${image}"> <div class="cardinfoDiv">
        <b>Abilities:</b><div id="cardinfo${p}" class="cardinfo"> </div></div> </div>`;
}

function openCard(p) {
    document.getElementById('oneCardDiv').classList.remove('d-none');
    document.getElementById('body').classList.add('overflowHidden');
    bigCardTemplate(p);
    backgroundBigCardColor(p);
    abilitiesBigCard(p);
    types(p);
    renderChart(p);
    if (p === 0) {
        document.getElementById("rowLeft").classList.add('d-none');
      } else {
        document.getElementById("rowLeft").classList.remove('d-none');
      };
    index = p;
}

function bigCardTemplate(p) {
    let pokemon = pokemons[p];
    let img = pokemon['sprites']['other']['dream_world']['front_default'];
    let id = pokemon['id'];
    return document.getElementById('oneCard').innerHTML = `<div class="oneCard" id="backgroundColor${p}"> <div class="id"> <h2>#${id}</h2> <h2>${pokemons[p]['name']}</h2> <i onclick="closeCard()" class="fa-regular fa-circle-xmark icon"></i> </div> 
    <img src="${img}">
    <div class="oneCardInfo"> <div class="pictureAndRows"> <div class="rowLeftDiv"> <i id="rowLeft" onclick="left()" class="fa-solid fa-chevron-left rowLeft"></i> </div> <div class="about"> <h2>About</h2> 
    <table> <tr> <th><b>Type<b/></th> <th><p id="types${p}"></p></th><tr>  <tr> <th> <b>Weight</b> </th> <th><p>${pokemon['weight'] / 10}kg</p>
    </th><tr>  <tr> <th><b>Ability</b></th> <th><p id="ability${p}"></p></th><tr> </table> </div> <i onclick="right()" class="fa-solid fa-chevron-right rowRight"></i> </div>
     <div class="stats"> <h2>Stats</h2> <div>
    <canvas class="myChart" id="myChart"> </canvas> </div> </div> </div> </div>`;
}

function types(p) {
    let pokemon = pokemons[p];
    let types = pokemon['types'];
    for (let t = 0; t < types.length; t++) {
        document.getElementById(`types${p}`).innerHTML += `${types[t]['type']['name']}&ensp;&ensp;`;
    }
}

function closeCard() {
    document.getElementById('oneCardDiv').classList.add('d-none');
    document.getElementById('body').classList.remove('overflowHidden');
}

function left() {
        index--;
        openCard(index);
}

function right() {
    openCard(index);
    index++;
    if (index >= 600) {
        index = 0;
    }
    openCard(index);
}

function backgroundCardColor(p) {
    let pokemon = pokemons[p];
    let color = pokemon["types"][0]["type"]['name'];
    let card = document.getElementById(`pokedexCard${p}`);
    if (color == `grass`) {
        card.style = 'background-color: lightgreen;';
    } else if (color == `fire`) {
        card.style = 'background-color: tomato;';
    } else if (color == `water`) {
        card.style = 'background-color: lightblue;';
    } else if (color == `bug`) {
        card.style = 'background-color: burlywood;';
    } else if (color == `electric`) {
        card.style = 'background-color: rgb(255, 237, 146);';
    } else if (color == `steel`) {
        card.style = 'background-color: grey;';
    } else if (color == `ice`) {
        card.style = 'background-color: rgb(193, 253, 253);';
    } else if (color == `dark`) {
        card.style = 'background-color: dimgray';
    } else if (
        color == `poison` ||
        color == `dragon` ||
        color == `ghost`) {
        card.style = 'background-color: mediumpurple;';
    } else if (color == `fairy`) {
        card.style = 'background-color: lightpink;';
    } else if (color == `normal`) {
        card.style = 'background-color: lightgrey;';
    } else if (color == `ground`) {
        card.style = 'background-color: brown;';
    } else if (color == `fighting`) {
        card.style = 'background-color: orange;';
    } else if (color == `psychic`) {
        card.style = 'background-color: silver;';
    } else if (color == `rock`) {
        card.style = 'background-color: grey;';
    }
}

function backgroundBigCardColor(p) {
    let pokemon = pokemons[p];
    let color = pokemon["types"][0]["type"]['name'];
    let bigCard = document.getElementById(`backgroundColor${p}`);
    if (color == `grass`) {
        bigCard.style = 'background-color: lightgreen;';
    } else if (color == `fire`) {
        bigCard.style = 'background-color: tomato;';
    } else if (color == `steel`) {
        bigCard.style = 'background-color: grey;';
    } else if (color == `ice`) {
        bigCard.style = 'background-color: rgb(193, 253, 253);';
    } else if (color == `dark`) {
        bigCard.style = 'background-color: dimgray';
    } else if (color == `water`) {
        bigCard.style = 'background-color: lightblue;';
    } else if (color == `bug`) {
        bigCard.style = 'background-color: burlywood;';
    } else if (color == `electric`) {
        bigCard.style = 'background-color: rgb(255, 237, 146);';
    } else if (
        color == `poison` ||
        color == `dragon` ||
        color == `ghost`) {
        bigCard.style = 'background-color: mediumpurple;';
    } else if (color == `fairy`) {
        bigCard.style = 'background-color: lightpink;';
    } else if (color == `normal`) {
        bigCard.style = 'background-color: lightgrey;';
    } else if (color == `ground`) {
        bigCard.style = 'background-color: brown;';
    } else if (color == `fighting`) {
        bigCard.style = 'background-color: orange;';
    } else if (color == `psychic`) {
        bigCard.style = 'background-color: silver;';
    } else if (color == `rock`) {
        bigCard.style = 'background-color: grey;';
    }
}

function openImpressum() {
    document.getElementById('modal').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

function closeImpressum() {
    document.getElementById('modal').classList.add('d-none');
    document.body.style.overflow = 'auto';
}