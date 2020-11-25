const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


/*** DOM ELEMENTS */
const main = document.querySelector("main")
const card = document.querySelector("div.card")

function getTrainers(){

    fetch(`http://localhost:3000/trainers`)
    .then(r => r.json())
    .then(data => {
        data.forEach(trainer =>{
            renderTrainers(trainer)
        })
    })
}

function renderTrainers(trainerObj){
    const div = document.createElement("div")
    const createButton = document.createElement("button")
    const ul = document.createElement("ul")
    div.className = "card"
    div.dataset.id = trainerObj.id
    div.textContent = trainerObj.name
    createButton.dataset.trainerid = trainerObj.id
    createButton.textContent = "Add Pokemon"
    createButton.className = "create"
    main.append(div)
    div.append(createButton)
    div.append(ul)
    // trainerObj.pokemons.forEach(pokemon =>{
    //     renderPokemon(pokemon)
    // })

     trainerObj.pokemons.forEach(pokemon =>{
         
         const li = document.createElement("li")
         const button = document.createElement("button") 
         li.textContent = `${pokemon.nickname} (${pokemon.species})`
         button.className = "release"
         button.dataset.pokemonid = pokemon.id
         button.textContent = "Release"
         
         ul.append(li)
         li.append(button)
     })
}


function renderPokemon(pokemon){
   
        const ul = document.querySelector("ul")
        const li = document.createElement("li")
        const button = document.createElement("button") 
        li.textContent = `${pokemon.nickname} (${pokemon.species})`
        button.className = "release"
        button.dataset.pokemonid = pokemon.id
        button.textContent = "Release"
       
        ul.append(li)
        li.append(button)
    
}






main.addEventListener("click",(e)=>{
    e.preventDefault()
    if(e.target.className == "create"){
        const parentUl = e.target.nextElementSibling

    if(parentUl.childElementCount < 6){
    const trainerId = parseInt(e.target.dataset.trainerid)
    fetch('http://localhost:3000/pokemons', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
         body: JSON.stringify({
             "trainer_id": trainerId
         }),
    })
    .then(r => r.json())
    .then(data=> {
        // debugger
        const li = document.createElement("li")
        const button = document.createElement("button") 
        li.textContent = `${data.nickname} (${data.species})`
        button.className = "release"
        button.dataset.pokemonid = data.id
        button.textContent = "Release"
       
        parentUl.append(li)
        li.append(button)
    })}
    else(alert("Too many pokemons"))

}
    else if (e.target.className == "release"){
        const pokemonId = e.target.dataset.pokemonid
        
        e.target.parentNode.remove()
        
        fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
            method: 'DELETE', 
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(r => r.json())
        .then(console.log)
    }
})



getTrainers()
