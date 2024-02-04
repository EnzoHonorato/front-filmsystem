
async function gerarSelectGenero() {
    const selectGenre = document.getElementById('genre')

    const url = "http://localhost:8080/genres";

    const token = localStorage.getItem('filmsystemJwtToken')

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    data.map((genero) => {
        let option = document.createElement('option')
        option.setAttribute('value', genero.id)
        option.innerText = genero.name

        selectGenre.appendChild(option)
    })
}



async function cadastrarFilme() {
    if (window.location.href == 'http://localhost/filmsystem/filme/index-filme.html') {

        if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }

        window.location.href = 'cadastro-filme.html'
        return
    }

    const name = document.getElementById('name').value
    const minutes = parseInt(document.getElementById('minutes').value)
    const releaseDate = document.getElementById('releaseDate').value
    const genre = parseInt(document.getElementById('genre').value)

    let filmToBeSaved = {
        name: name,
        minutes: minutes,
        releaseDate: releaseDate,
        genre: {
            id: genre
        }
    }

    console.log(filmToBeSaved)

    let token = localStorage.getItem('filmsystemJwtToken')

    const url = 'http://localhost:8080/films'

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(filmToBeSaved),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 201) {
        window.alert('Filme cadastrado com sucesso');
        window.location.href = '../filme/lista-filme.html'
    }
    else window.alert('Erro no cadastro do filme')
}




async function listarFilmes() {

    if (window.location.href == 'http://localhost/filmsystem/filme/index-filme.html') {

        if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }

        window.location.href = 'lista-filme.html'
        return
    }

    let divFilmes = document.getElementById('filmes')

    const url = "http://localhost:8080/films";

    const token = localStorage.getItem('filmsystemJwtToken')

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();


    const row = document.createElement('hr')
    divFilmes.appendChild(row)


    data.map((filme) => {

        const div = document.createElement("div")
        const id = document.createElement("h3")
        const name = document.createElement("h3")
        const minutes = document.createElement("h3")
        const releaseDate = document.createElement("h3")
        const genre = document.createElement("h3")

        //const deleteButton = document.createElement("button")
        const updateButton = document.createElement("button")

        id.innerHTML = '<b>Id: </b>' + filme.id
        name.innerText = 'Nome: ' + filme.name
        minutes.innerText = 'Duração (minutos): ' + filme.minutes
        releaseDate.innerText = 'Data de lançamento: ' + filme.releaseDate
        genre.innerText = 'Gênero: ' + filme.genre.name

        /*deleteButton.innerText = 'Excluir';
        deleteButton.setAttribute('onclick' , 'deletarFilme(' + filme.id + ')')
        deleteButton.setAttribute('id', filme.id)*/

        updateButton.innerText = 'Atualizar';
        updateButton.setAttribute('onclick', 'redirecionaAtualizarFilme(' + filme.id + ')')
        updateButton.setAttribute('id', filme.id)

        div.appendChild(id)
        div.appendChild(name)
        div.appendChild(minutes)
        div.appendChild(releaseDate)
        div.appendChild(genre)
        //div.appendChild(deleteButton)
        div.appendChild(updateButton)

        divFilmes.appendChild(div)

        const row = document.createElement('hr')
        divFilmes.appendChild(row)
    })
    
}



async function redirecionaAtualizarFilme(id) {
    if (window.location.href == 'http://localhost/filmsystem/filme/lista-filme.html') {

        if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }

        window.location.href = 'atualiza-filme.html?id=' + id
        return
    }

}



async function preencheAtributosAtuaisFilme() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    
    let token = localStorage.getItem('filmsystemJwtToken')

    const url = `http://localhost:8080/films/${id}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const responseBody = await response.json()

    campoNome = document.getElementById('name')
    campoMinutes = document.getElementById('minutes')
    campoReleaseDate = document.getElementById('releaseDate')
    campoGenre = document.getElementById('genre')

    campoNome.setAttribute('value', responseBody.name)     
    campoMinutes.setAttribute('value', responseBody.minutes)     
    campoReleaseDate.setAttribute('value', responseBody.releaseDate)    

    for (var i = 0; i < campoGenre.options.length; i++) {
        if (campoGenre.options[i].value == responseBody.genre.id) {
            campoGenre.value = responseBody.genre.id;
            break;
        }
    }    
}



async function atualizarFilme() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'))

    const name = document.getElementById('name').value
    const minutes = parseInt(document.getElementById('minutes').value)
    const releaseDate = document.getElementById('releaseDate').value
    const genre = parseInt(document.getElementById('genre').value)


    const filmToBeUpdated = {
        id: id,
        name: name,
        minutes: minutes,
        releaseDate: releaseDate,
        genre: {
            id: genre
        }
    }

    let token = localStorage.getItem('filmsystemJwtToken')

    const url = `http://localhost:8080/films`

    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(filmToBeUpdated),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 204) {
        window.alert('Filme atualizado com sucesso');
        window.location.href = '../filme/lista-filme.html'
    }
    else window.alert('Erro na atualização do filme')
}
