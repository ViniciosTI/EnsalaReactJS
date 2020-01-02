import React from 'react'
import Spinner from 'react-spinkit'

const base = "http://localhost:";
const door = "8080";
const context = "/Ensalamento/rest/";
const headers = { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" };

export const POST = (path, o, f) => {
    return fetch(base + door + context + path, {
        method: 'POST',
        headers: headers,
        body: btoa(JSON.stringify(o))
    }).then(result => {
        if (!result.ok) throw result;
        return result.json();
    }).catch(err => {
        if(f || f === undefined) ERRO(err)
        console.log('Status Code POST: ' + err.status);
    })
}
export const GET = (path, f) => {
    return fetch(base + door + context + path, {
        method: 'GET',
        headers: headers,
    }).then(result => {
        if (!result.ok) throw result;
        return result.json();
    }).catch(err => {
        if (f || f === undefined) ERRO(err)
        console.log('Status Code GET: ' + err.status)
    })
}
export const DELETE = (path, f) => {
    return fetch(base + door + context + path, {
        method: 'DELETE',
        headers: headers,
    }).then(result => {
        if (!result.ok) throw result;
        return result.json();
    }).catch(err => {
        if (f || f === undefined) ERRO(err)
        console.log('Status Code remover: ' + err.status);
    })
}
export const PUT = (path, o, f) => {
    return fetch(base + door + context + path, {
        method: 'PUT',
        headers: headers,
        body: btoa(JSON.stringify(o))
    }).then(result => {
        if (!result.ok) throw result;
        return result.json();
    }).catch(err => {
        if(f || f === undefined) ERRO(err)
        console.log('Status Code PUT: ' + err.status);
    })
}


export const ERRO = (err) => {
    if (err.status === undefined) alert("Ops! O servidor não está respondendo.\nPor favor, aguarde um momento e tente novamente.")
    if (err.status >= 500)
        err.text().then(errorMessage => {
            console.log(errorMessage)
            switch (errorMessage) {
                case "INSERIR_ERROR":
                    alert("Ops! Erro ao inserir.")
                    break;
                case "ALTERAR_ERROR":
                    alert("Ops! Erro ao alterar.")
                    break;
                case "REMOVER_ERROR":
                    alert("Ops! Erro ao remover.")
                    break;
                case "SELECIONAR_ERROR":
                    alert("Ops! Erro ao selecionar.")
                    break;
                default: console.log("Sucesso erro:500>")
            }
        })
    else
        if (err.status >= 400) alert("Ops! Erro: " + err.status + " \nO servidor não conseguiu processar esta requisição.")

}


export const Loading = ({ loading, message }) => {
    return loading ? (
        <div className='overlay-content'>
            <div className='wrapper'>
                <Spinner
                    name='pacman'
                    fadeIn='none'
                    color='yellow'
                />
                <span className='message'>
                    {message}
                </span>
            </div>
        </div>
    ) : null
}

