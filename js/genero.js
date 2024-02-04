
async function listarGeneros() {

    if (window.location.href == 'http://localhost/filmsystem/genero/index-genero.html') {

        if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }

        window.location.href = 'lista-genero.html'
        return
    }

    let divGeneros = document.getElementById('generos')

    const url = "http://localhost:8080/genres";

    const token = localStorage.getItem('filmsystemJwtToken')

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();


    const row = document.createElement('hr')
    divGeneros.appendChild(row)


    data.map((genero) => {

        const div = document.createElement("div")
        const id = document.createElement("h3")
        const name = document.createElement("h3")

        //const deleteButton = document.createElement("button")
        const updateButton = document.createElement("button")

        id.innerText = 'Id: ' + genero.id
        name.innerText = 'Nome: ' + genero.name

        /*deleteButton.innerText = 'Excluir';
        deleteButton.setAttribute('onclick' , 'deletarGenero(' + genero.id + ')')
        deleteButton.setAttribute('id', genero.id)*/

        updateButton.innerText = 'Atualizar';
        updateButton.setAttribute('onclick', 'redirecionaAtualizarGenero(' + genero.id + ')')
        updateButton.setAttribute('id', genero.id)

        div.appendChild(id)
        div.appendChild(name)
        //div.appendChild(deleteButton)
        div.appendChild(updateButton)

        generos.appendChild(div)

        const row = document.createElement('hr')
        generos.appendChild(row)
    })

}



async function cadastrarGenero() {
    if (window.location.href == 'http://localhost/filmsystem/genero/index-genero.html') {

        if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }

        window.location.href = 'cadastro-genero.html'
        return
    }

    const name = document.getElementById('name').value

    let genreToBeSaved = {
        name: name
    }

    let token = localStorage.getItem('filmsystemJwtToken')

    const url = 'http://localhost:8080/genres'

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(genreToBeSaved),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 201) {
        window.alert('Gênero cadastrado com sucesso');
        window.location.href = '../genero/lista-genero.html'
    }
    else {
        responseBody = await response.json()
        if (responseBody.developerMessage = 'org.springframework.dao.DataIntegrityViolationException') window.alert('Erro: já existe um gênero com esse nome')
        else window.alert('Erro no cadastro do gênero')
    }
}



async function redirecionaAtualizarGenero(id) {
    if (window.location.href == 'http://localhost/filmsystem/genero/lista-genero.html') {

        if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }

        window.location.href = 'atualiza-genero.html?id=' + id
        return
    }

}



async function preencheAtributosAtuaisGenero() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    let token = localStorage.getItem('filmsystemJwtToken')

    const url = `http://localhost:8080/genres/${id}`

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const responseBody = await response.json()

    campoNome = document.getElementById('name')
    campoNome.setAttribute('value', responseBody.name)
}



async function atualizarGenero() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'))
    const name = document.getElementById('name').value

    const genreToBeUpdated = {
        id: id,
        name: name
    }

    let token = localStorage.getItem('filmsystemJwtToken')

    const url = `http://localhost:8080/genres`

    const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(genreToBeUpdated),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 204) {
        window.alert('Gênero atualizado com sucesso');
        window.location.href = '../genero/lista-genero.html'
    }
    else {
        responseBody = await response.json()
        if (responseBody.developerMessage = 'org.springframework.dao.DataIntegrityViolationException') window.alert('Erro: já existe um gênero com esse nome')
        else window.alert('Erro na atualização do gênero')
    }
}