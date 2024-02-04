function removeCamposLogin() {
    let camposLogin = document.getElementById('campos-login')

    while (camposLogin.hasChildNodes) {
        let elemento = camposLogin.firstChild
        if (elemento == null) break;
        camposLogin.removeChild(elemento)
    }
}



async function autenticarUsuario() {
    let h2Resposta = document.createElement('h2')

    const login = document.querySelector('#login').value
    const password = document.querySelector('#password').value

    let userObject = {
        login: login,
        password: password
    }

    const url = 'http://localhost:8080/auth/login'

    response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
            "Content-type": "application/json"
        }
    })

    removeCamposLogin()

    if (response.status == 403) {
        window.alert('Erro de autenticação, verifique as credenciais')
        window.location.reload()
        return
    }

    responseBody = await response.json()

    h2Resposta.innerText = 'Autenticação realizada com sucesso: '
    document.body.appendChild(h2Resposta)

    localStorage.setItem('filmsystemJwtToken', responseBody.token)
    localStorage.setItem('filmsystemLogin', responseBody.login)
    localStorage.setItem('filmsystemRole', responseBody.role)

    window.location.href = `inicio.html?login=${responseBody.login}&role=${responseBody.role}`
}

function logout() {
    localStorage.removeItem('filmsystemJwtToken')
    localStorage.removeItem('filmsystemLogin')
    localStorage.removeItem('filmsystemRole')

    window.location.href = 'index.html'
} 



async function cadastrarUsuario() {

    if (window.location.href == 'http://localhost/filmsystem/usuario/index-usuario.html') {

        if (localStorage.getItem('filmsystemRole') == 'USER') {
            window.alert('Somente usuários com permissão ADMIN podem acessar esta funcionalidade')
            return
        }

        window.location.href = 'cadastro-usuario.html'
        return
    }

    const login = document.getElementById('user').value
    const password = document.getElementById('password').value
    const role = document.getElementById('role').value

    let userToBeSaved = {
        login: login,
        password: password,
        role: role
    }

    let token = localStorage.getItem('filmsystemJwtToken')

    const url = 'http://localhost:8080/auth/register'

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userToBeSaved),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 201) window.alert('Usuário cadastrado com sucesso');
    else {
        responseBody = await response.json()
        if(responseBody.details = 'User already exists') window.alert('Erro: login já existente')
        else window.alert('Erro no cadastro do usuário')
    }
}