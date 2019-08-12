
const div = document.querySelector("#monster-container")
const form_div = document.querySelector("#create-monster")
const limit = 5

let page = 1

document.addEventListener("DOMContentLoaded", () => {

	const end = document.createElement("button")
	end.innerText = "to the end"
	const start = document.createElement("button")
	start.innerText = "to the beginning"
	const fwrd = document.querySelector("#forward")
	const back = document.querySelector("#back")
	document.querySelector("body").insertBefore(start, back)
	document.querySelector("body").insertBefore(end, back)



	const form = document.createElement("form")	
	const name_field = document.createElement("input")
	name_field.setAttribute("placeholder", "name...")
	const age_field = document.createElement("input")
	age_field.setAttribute("placeholder", "age...")
	const descr_field = document.createElement("input")
	descr_field.setAttribute("placeholder", "description...")
	const submit = document.createElement("input")
	submit.setAttribute("type", "submit")
	submit.innerText = "Create"

	form.append(name_field, age_field, descr_field, submit)
	form_div.append(form)

	form.addEventListener("submit", e => {
		e.preventDefault()
		fetch("http://localhost:3000/monsters", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
 				 Accept: "application/json"
 				},
			body: JSON.stringify({
				name: name_field.value, 
				age: age_field.value, 
				description: descr_field.value
			})
		})
		.then(res => res.json())
		.then(json => console.log(json))
	})

	fetch_page(page)

	end.addEventListener("click", () => {
		page = get_last()
		
	})

	start.addEventListener("click", () => {
		page = 1
		fetch_page(page)
	})


	fwrd.addEventListener("click", () => {
		page += 1
		fetch_page(page)
	})

	back.addEventListener("click", () => {
		if (page > 1){
			page -= 1
			fetch_page(page)
		}
	})
})

function get_last() {
		fetch(`http://localhost:3000/monsters/`)
		.then(res => res.json())
		.then(json => {
			console.log(json.length)
			console.log(Math.floor(json.length/limit))
			// if ((json.length - Math.floor(json.length/limit) * limit) > 0) { 
				 page = Math.floor(json.length/limit)
		console.log(page)

				 fetch_page()
			// }else{
			// 	page = Math.floor(json.length/limit) - 1
			// }

			return page
		})

}

function fetch_page() {
	console.log(page)

	fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
	.then(res => res.json())
	.then(json => {
		console.log(json)
		div.innerHTML = ""
		json.forEach(m => {
			const h2 = document.createElement("h2")
			h2.innerText = m.name
			const h4 = document.createElement("h4")
			h4.innerText = "Age: " + m.age
			const p = document.createElement("p")
			p.innerText = m.description
			div.append(h2, h4, p)
		})
	})
	

	
}