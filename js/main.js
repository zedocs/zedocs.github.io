// Keys of users.
let keys = ["id", "name", "email"];

// get data from the server.
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.log(err)
    );
}

function startGetUsers() {
    getServerData("http://localhost:3000/users").then(
        //        data => console.log(data)
        data => fillDataTable(data, "userTable")
    );
}

document.querySelector("#getDataBtn").addEventListener('click', startGetUsers);

// Fill table with server data.
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${TableID}" is not found.`);
        return;
    }

    // add new user row to the table
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    let newRow = newUserRow();
    tBody.appendChild(newRow);
    for (let row of data) {
        //        console.log(row);
        let tr = createAnyElement("tr");
        let uid;
        //        for (let k in row) {
        for (let k of keys) {
            let td = createAnyElement("td");
            if (k == "id") {
                uid = "userId-" + row[k]; // modified by zedi
                td.innerHTML = row[k];
            } else {
                let input = createAnyElement("input", {
                    class: "form-control",
                    value: row[k],
                    name: k
                });
                td.appendChild(input);
            }
            tr.appendChild(td);
        }
        let btnGroup = createBtnGroup(uid);
        tr.appendChild(btnGroup);
        tBody.appendChild(tr);
    }
}

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function createBtnGroup(uid) {
    let group = createAnyElement("div", { class: "btn btn-group" });
    let infoBtn = createAnyElement("button", { id: `${uid}`, class: "btn btn-info", onclick: "SetRow(this)" });
    infoBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
    // modified by zedi id: `${uid}`
    let delBtn = createAnyElement("button", { id: `${uid}`, class: "btn btn-danger", onclick: "delRow(this)" });
    delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    group.appendChild(infoBtn);
    group.appendChild(delBtn);
    let td = createAnyElement("td");
    td.appendChild(group);
    return td;

}

function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;

    // modified by zedi
    let id2 = btn["id"].substring(7);

    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };

    fetch(`http://localhost:3000/users/${id2}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        data => {
            startGetUsers();
        }
    );

    console.log(id);
    console.log(id2);

}

// Create new user.
function newUserRow(row) {
    let tr = createAnyElement("tr");
    //    for (let k in { id: '', name: '', email: '' }) {
    for (let k of keys) {
        let td = createAnyElement("td");
        if (k != "id") {
            let input = createAnyElement("input", {
                class: "form-control",
                name: k
            });
            td.appendChild(input);            
        }
        tr.appendChild(td);
    }

    let newBtn = createAnyElement("button", {
        class: "btn btn-success",
        onclick: "createUser(this)"
    });
    newBtn.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
}

function createUser(btn) {
    let tr = btn.parentElement.parentElement;
    let data = getRawData(tr);
    delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/users`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        //        data => console.log(data)
        data => startGetUsers()
    );

    //    console.log(data);


    // modified by zedi
    //    let id2 = btn["id"].substring(7);
    /*
        let fetchOptions = {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache"
        };
    
        fetch(`http://localhost:3000/users/${id2}`, fetchOptions).then(
            resp => resp.json(),
            err => console.error(err)
        ).then(
            data => {
                startGetUsers();
            }
        );
    */

}

function getRawData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

function SetRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getRawData(tr);
    //   console.log(data);
 
     // modified by zedi
     let id2 = btn["id"].substring(7);

     let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/users/${id2}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        //        data => console.log(data)
        data => startGetUsers()
    );

}
