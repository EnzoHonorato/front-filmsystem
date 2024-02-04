
async function listarListaFilmes() {

    if (window.location.href == 'http://localhost/filmsystem/lista/index-lista.html') {

        /*if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }*/

        window.location.href = 'lista-lista.html'
        return
    }

    let divLista = document.getElementById('lista')

    const url = "http://localhost:8080/userfilm";

    const token = localStorage.getItem('filmsystemJwtToken')

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();


    const row = document.createElement('hr')
    divLista.appendChild(row)


    data.map((objetoRetorno) => {

        const div = document.createElement("div")
        const name = document.createElement("h3")
        const minutes = document.createElement("h3")
        const releaseDate = document.createElement("h3")
        const genre = document.createElement("h3")
        const rating = document.createElement("h3")

        const deleteButton = document.createElement("button")
        const updateButton = document.createElement("button")

        name.innerText = 'Nome: ' + objetoRetorno.film.name
        minutes.innerText = 'Duração (minutos): ' + objetoRetorno.film.minutes
        releaseDate.innerText = 'Data de lançamento: ' + objetoRetorno.film.releaseDate
        genre.innerText = 'Gênero: ' + objetoRetorno.film.genre.name
        rating.innerText = 'Minha avaliação (0-10): ' + objetoRetorno.rating

        deleteButton.innerText = 'Excluir';
        deleteButton.setAttribute('onclick', 'deletarFilmeListaFilmes(' + objetoRetorno.film.id + ')')
        deleteButton.setAttribute('id', objetoRetorno.film.id)

        updateButton.innerText = 'Atualizar avaliação';
        updateButton.setAttribute('onclick', 'atualizarAvaliacaoFilmeListaFilmes(' + objetoRetorno.film.id + ')')
        updateButton.setAttribute('id', objetoRetorno.film.id)

        div.appendChild(name)
        div.appendChild(minutes)
        div.appendChild(releaseDate)
        div.appendChild(genre)
        div.appendChild(rating)
        div.appendChild(deleteButton)
        div.appendChild(updateButton)

        divLista.appendChild(div)

        const row = document.createElement('hr')
        divLista.appendChild(row)
    })

}


async function deletarFilmeListaFilmes(filmId) {

    if (!window.confirm('Tem certeza que deseja excluir o filme da sua lista?')) return

    const url = `http://localhost:8080/userfilm/${filmId}`;

    const token = localStorage.getItem('filmsystemJwtToken')

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status == 204) window.alert('Filme excluído com sucesso da sua lista');
    else window.alert('Erro na exclusão do filme da sua lista')

    window.location.reload()
}



async function atualizarAvaliacaoFilmeListaFilmes(filmId) {
    let rating = window.prompt('Nova avaliação (0-10):')

    if(rating == null || rating == '') return
    else if(rating < 0 || rating > 10) {
        window.alert('Avaliação deve ser de 0 a 10!')
        return
    }

    const url = `http://localhost:8080/userfilm/${filmId}/${rating}`;

    const token = localStorage.getItem('filmsystemJwtToken')

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status == 204) window.alert('Avaliação atualizada com sucesso');
    else window.alert('Erro na atualização da avaliação do filme')

    window.location.reload()
}




async function listarFilmes() {

    if (window.location.href == 'http://localhost/filmsystem/lista/index-lista.html') {

        /*if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }*/

        window.location.href = 'cadastro-lista.html'
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
        const name = document.createElement("h3")
        const minutes = document.createElement("h3")
        const releaseDate = document.createElement("h3")
        const genre = document.createElement("h3")

        const addButton = document.createElement("button")

        name.innerText = 'Nome: ' + filme.name
        minutes.innerText = 'Duração (minutos): ' + filme.minutes
        releaseDate.innerText = 'Data de lançamento: ' + filme.releaseDate
        genre.innerText = 'Gênero: ' + filme.genre.name

        addButton.innerText = 'Adicionar à minha lista';
        addButton.setAttribute('onclick', 'adicionarFilmeListaFilmes(' + filme.id + ')')
        addButton.setAttribute('id', filme.id)

        div.appendChild(name)
        div.appendChild(minutes)
        div.appendChild(releaseDate)
        div.appendChild(genre)
        div.appendChild(addButton)

        divFilmes.appendChild(div)

        const row = document.createElement('hr')
        divFilmes.appendChild(row)
    })
    
}



async function adicionarFilmeListaFilmes(filmId) {

    const url = `http://localhost:8080/userfilm/${filmId}`;

    const token = localStorage.getItem('filmsystemJwtToken')

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status == 201) window.alert('Filme adicionado com sucesso à sua lista');
    else {
        responseBody = await response.json()
        if (responseBody.details = 'UserFilm association already exists') window.alert('Erro: você já possui esse filme em sua lista')
        else window.alert('Erro ao adicionar filme à sua lista')
    }

}