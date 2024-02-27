async function takePokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=99&offset=0';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let currentPokemon = responseAsJson['results'];
    for (let p = 0; p< currentPokemon.length; p++){
        
    }
    
}

