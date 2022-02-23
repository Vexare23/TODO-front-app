function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
        }, options))
        .then(response => {
            return response.json()
        })
}
/*
export function getIndexItems(status) {
    return fetchJson('http://localhost/api?'+new URLSearchParams({
        status: status,
    }), {
        method: 'GET',
    })
        .then(data => data.items);
}
 */

export function getTodos() {
    return fetchJson('http://localhost/api/showTODOs')
        .then((data) => data.TODO);
}

export function getTodoPls(id) {
    return fetchJson(`http://localhost/api/showTODO/${id}`)
        .then((data) => data.TODO);
}

export function getUser() {
    return fetchJson('http://localhost/api/getUser')
        .then((data) => data.user);
}

export function getUsers() {
    return fetchJson('http://localhost/api/getUsers')
        .then((data) => data.users);
}

export function deleteTodo(id) {
    return fetch(`http://localhost/api/deleteTODO/${id}`,{
        credentials: "same-origin",
        method: 'DELETE'
    });
}

export function exportTodo(id) {
    return fetch(`http://localhost/api/exportCsv/${id}`, {
        credentials: "same-origin",
        method: 'GET'
    })
}

export function markTodo(id) {
    return fetch(`http://localhost/api/TODOAsDone/${id}`, {
        credentials: "same-origin",
        method: 'PUT'
    })
}

export function createTodo(Todo) {
    return fetch('http://localhost/api/newTODO', {
        method: 'POST',
        body: JSON.stringify(Todo),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function getRecord(id) {
    return fetchJson(`http://localhost/api/recordTodo/${id}`)
        .then((data) => data);
}

