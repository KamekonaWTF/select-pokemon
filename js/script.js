const pokemonSelect = document.getElementById('pokemon-select')
const getPokemon = document.getElementById('get-pokemon')
const info = document.getElementById('info')

const pokTipos={
    bug:"Bicho",
    dark:"Siniestro",
    dragon:"Dragon",
    electric:"Electrico",
    fairy:"Hada",
    fighting:"Lucha",
    fire:"Fuego",
    flying:"Volador",
    gosth:"Fantasma",
    grass:"Planta",
    ground:"Tierra",
    ice:"Hielo",
    normal:"Normal",
    poison:"Veneno",
    psychic:"Psiquico",
    rock:"Roca",
    steel:"Acero",
    water:"Agua"


}

Pokedex();
function Pokedex() {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1291").then(res => {
        if (!res.ok) {
            throw new Error("Error la pokedex esta sin bateria");
        } else {

            return res.json();
        }
    }).then(Pokemons => {
        console.log("hola")
            Pokemons.results.forEach(element => {
                let option = document.createElement("option");
                let texto=PrimeraMayuscula(element.name);
                option.text = texto;
                option.value = element.name;
                pokemonSelect.add(option);

        });
    })
}

function PrimeraMayuscula(str) {
    let texto=str.charAt(0).toUpperCase() + str.slice(1);
    return texto;
  }

getPokemon.addEventListener("click", function () {
    PokeInfo(pokemonSelect.value);
})
function PokeInfo(poke) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + poke).then(res => {
        if (!res.ok) {
            throw new Error("Error en la pokedex , no has visto este pokemon");
        } else {
            console.log(res);
            return res.json();
        }
    }).then(pokemon => {
        console.log(pokemon);
        let type2;

        info.innerHTML = `
        <div id="imagenes">
            <img src="${pokemon.sprites["front_default"]}" alt=""/>
            <img src="${pokemon.sprites["back_default"]}" alt=""/>
        </div>
        <div id="infoPoke">
            <p id="name">Nombre: ${PrimeraMayuscula( pokemon.name)}</p>
            <p id="weight">Peso: ${pokemon.weight}</p>
            <p id="height">Altura: ${pokemon.height}</p>
            <p id="type1">Tipo 1: ${pokTipos[pokemon.types[0]["type"].name]}</p>            
        </div>        
        `
        try {
            if (pokemon.types[1]["type"] != null) {
                info.innerHTML += `<p id="type2">Tipo 2: ${pokTipos[pokemon.types[1]["type"].name]}</p>`
            }
        } catch (error) {

        }

    })
}
