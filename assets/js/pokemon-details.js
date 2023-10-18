
const pokemonId = new URLSearchParams(window.location.search).get('pokemonId');

async function getPokemonDetailsById(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    try {
        const response = await fetch(url);
        const jsonBody = await response.json();
        return jsonBody;
    } catch (error) {
        console.error('Erro ao buscar os detalhes do Pokémon:', error);
    }
}

async function getAndDisplayPokemonDetails(pokemonId) {
    try {
        const pokemon = await getPokemonDetailsById(pokemonId);

        if (pokemon) {
            const pokemonDetails = document.getElementById('pokemon-details');
            pokemonDetails.innerHTML = `
            <main class="pokemon ${pokemon.types[0]?.type?.name}" style="width: fit-content; margin: 0 auto; padding: 50px;">
                <div style="display: flex; flex-direction:column; justify-content:center; text-align:center">
                    <img src="${pokemon.sprites.other.dream_world.front_default}" style="max-width: 100%;
                    height: 70px;" />
                    <h2>nome: ${pokemon.name}</h2>
                    <h2>tipo 1: ${pokemon.types[0]?.type?.name || '-'}</h2>
                    <h2>tipo 2: ${pokemon.types[1]?.type?.name || '-'}</h2>
                    <h2>HP: ${pokemon.stats[0]?.base_stat || '-'}</h2>
                    <h2>ATK: ${pokemon.stats[1]?.base_stat || '-'}</h2>
                    <h2>DEF: ${pokemon.stats[2]?.base_stat || '-'}</h2>
                    <a href="index.html">Voltar</a>
                </div>
            </main>
            `;
        }
    } catch (error) {
        console.error('Erro ao obter os detalhes do Pokémon:', error);
    }
}

if (pokemonId) {
    const pokemon = getPokemonDetailsById(pokemonId);
    if (pokemon) {
        getAndDisplayPokemonDetails(pokemonId);
    }
} else {
    window.location.href = 'index.html';
}
