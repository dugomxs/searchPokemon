var formulario = document.querySelector('form')

formulario.addEventListener('submit', function (e){ 

  // Bloqueia o refresh da página
  e.preventDefault()

  // URL da pesquisa
  let urlForm = 'https://pokeapi.co/api/v2/pokemon/'

  // Valor do input name
  let nome = document.getElementById('name')

  // Concatena a url com Input name
  urlForm = urlForm + this.name.value

  // Tranforma valores em minusculo
  urlForm = urlForm.toLowerCase()

  // ID Content
  let resultado = document.getElementById('content')

  // ID imgPokemon
  let imagem = document.getElementById('imgPokemon')
  let imagemShiny = document.getElementById('imgPokemonShiny')


  // Resposta em HTML
  let html = ''

  fetch(urlForm)
   .then(resposta => resposta.json())
   .then(function (data){
    console.log(data)
    html = 'Nome: ' + maiusculo(data.name) + '<br>'
    html = html + 'Tipo: ' + maiusculo(data.types[0].type.name) + '<br>'
    html = html + 'Número da Pokédex : ' + data.id
    
    resultado.innerHTML = html

   imagem.innerHTML = "<img src='" + data.sprites.front_default +"'><img src='" + data.sprites.back_default +"'>"

   imagemShiny.innerHTML = "<img src='" + data.sprites.front_shiny +"'><img src='" + data.sprites.back_shiny +"'>"
   })
   .catch(function(err){
    if ( err == 'SyntaxError: Unexpected token N in JSON at position 0') {
      html = 'Ops! Não conseguimos achar este Pokémon 😢'
    } else {
      html = err
    } resultado.innerHTML = html
   })

});

function maiusculo(val){
  return val[0].toUpperCase() + val.substr(1)
}