let page = 1
const url = "http://localhost:3000/monsters"

document.addEventListener("DOMContentLoaded", () => {
    const createMonster = document.getElementById("create-monster")
    const monsterContainer = document.getElementById("monster-container")
    // const div = document.createElement("div")
    const buttonback = document.getElementById("back")
    const buttonforward = document.getElementById("forward")

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
    .then(res => res.json())
    .then(monsters => {
        monsters.forEach(monster => renderMonster(monster))
        monsterContainer.append(div)
    })

    const form = document.createElement("form")
        form.id = "monster-form"
    const input1 = document.createElement("input")
        input1.id = "name"
        input1.placeholder = "name..."
    const input2 = document.createElement("input")
        input2.id = "age"
        input2.placeholder = "age..."
    const input3 = document.createElement("input")
        input3.id = "description"
        input3.placeholder = "description..."
    const button = document.createElement("button")
        button.innerText = "Create"
    form.append(input1, input2, input3, button)
    monsterContainer.append(form)

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: e.target[0].value,
                age: e.target[1].value ,
                description: e.target[2].value
            })
        })
        .then(res => res.json())
        .then(monster => renderMonster(monster)) 
    })

    buttonback.addEventListener("click", () => {
        page > 1 ? page -= 1 : page = 1

        monsterContainer.innerHTML = ""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(monsters => {
            monsters.forEach(monster => renderMonster(monster))
        })
    })

    buttonforward.addEventListener("click", () => {
        page += 1
        monsterContainer.innerHTML = ""
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(monsters => {
            monsters.forEach(monster => renderMonster(monster))
        })
    })

    function renderMonster(monster){
            const div = document.createElement("div")
            const h2 = document.createElement("h2")
                h2.innerText = monster.name
            const h4 = document.createElement("h4")
                h4.innerText = `Age: ${monster.age}`
            const p = document.createElement("p")
                p.innerText = monster.description
            div.append(h2, h4, p)
            monsterContainer.append(div)   
    }
})


