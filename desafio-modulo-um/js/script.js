let allUsers        = []

let inputUserSearch = document.querySelector('#input-user-search')
let inputButton     = document.querySelector('#input-button')
let foundedUsers    = document.querySelector('#founded-users')
let totalUsers      = document.querySelector('#total-users')
let totalSearch     = document.querySelector('#total-search')
let dataSearch      = document.querySelector('#datas-search')

window.addEventListener('load', () => {
    fetchUsersList()
})

async function fetchUsersList() {
    const resources = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const { results } = await resources.json()
    allUsers = results

    allUsers = allUsers.map(user => {
        const { name, gender, picture, dob } = user
        return {
            name: `${name.first} ${name.last}`,
            gender,
            picture: picture.medium,
            age: dob.age
        }
    })
   return allUsers
}

function renderFoundedUsers() {
    //TODO: Create rule to disable button when the input is null
    let searchName = inputUserSearch.value.toLowerCase();
    if(searchName.trim().length < 1) return

    let filteredValues = allUsers.filter(user => {
        const { name } = user
        return (name.toLowerCase().indexOf(searchName) !== -1) 
    })
    populeUserViewList(filteredValues)
}

function populeUserViewList(list){
    let countUsers = list.length
    let femaleCounter = list.filter(user => user.gender === "female").length
    let maleCounter = list.filter(user => user.gender === "male").length

    let usersHTML = '<div class="box-left">'
        list.forEach((user) => {
            const userHTML = `
                <div class='div-populate-list'>
                    <div class='div-items-list'>
                    <img class='div-items-image' src="${user.picture}" alt="${user.name}">
                    <span class='div-items-span'>${user.name}, ${user.age} anos</span>
                    </div>
                </div>
            `
        usersHTML+=userHTML
        });
    usersHTML+='</div>'

    foundedUsers.innerHTML = usersHTML
    totalUsers.innerHTML = `${countUsers} usuário(s) filtrados`

    let totalAge = list.reduce((acc,cur) => acc + cur.age, 0)
    let mediaAge = (totalAge / list.length).toFixed(2)

    totalSearch.innerHTML = 'Dados Totais'
    
    dataSearch.innerHTML = `
        <ul class="data-list">
            <li class="data-item"> Sexo Masculino: ${maleCounter}</li>
            <li class="data-item"> Sexo Feminino: ${femaleCounter}</li>
            <li class="data-item"> Soma idades: ${totalAge}</li>
            <li class="data-item"> Média das idades: ${mediaAge}</li>
        </ul>
    `
}

function onKeyPress(event){
    var key = event.which || event.keyCode;
    if(key == 13){
        renderFoundedUsers()
    }
}

inputButton.addEventListener('click', renderFoundedUsers)
inputUserSearch.addEventListener('keyup', onKeyPress)
