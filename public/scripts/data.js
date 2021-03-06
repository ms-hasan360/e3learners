function loadData() {
    fetch("/data")
        .then(res => res.json())
        .then(results => {
            console.log(results)
            const container = document.getElementById("data")
            container.innerHTML = '';
            results.forEach(element => {
                const p = document.createElement('p')
                p.innerHTML = `Name : ${element.name} - Age : ${element.age} <button onclick = "updateData('${element._id}')">Update</button> - <button onclick = "deleteData(event, '${element._id}')">Delete</button>`;
                container.appendChild(p)
            });
        })
}
loadData();

function deleteData(event, id) {
    fetch(`/delete/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(results => {
            if(results){
                event.target.parentNode.style.display = 'none';
            }
        })
}

function updateData(id){
    fetch(`user/${id}`)
    .then(res => res.json())
    .then(r =>{
        const update = document.getElementById("update")
        update.innerHTML = `
            <input type="text" id="name" value="${r.name}"  required />
            <input type="text" id="age" value="${r.age}" required />
            <button onclick ="updateUser('${r._id}')">update</button>
        `;
    })
}

function updateUser(id){
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const user = {id, name, age};
    fetch(`/update/${id}`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(r =>{
        if (r) {
            loadData();
            document.getElementById("update").innerHTML = '';
        }
    })
}