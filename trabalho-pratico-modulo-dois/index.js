import { promises as fs } from 'fs'

const DIR_STATE = "states"

//createFileStates()

async function createFileStates() {

    const statesJson = await fs.readFile('Estados.json', 'utf-8')
    const citiesJson = await fs.readFile('Cidades.json', 'utf-8')

    const states = JSON.parse(statesJson)
    const cities = JSON.parse(citiesJson)

    //create dir to separete states files 
    fs.mkdir("states", { recursive: true })

    states.forEach(state => {
        //filter cities by state id and put it in the cities property on state object
        state.cities = cities.filter(city => city.Estado === state.ID)
        try {
            fs.writeFile(`${DIR_STATE}/${state.Sigla}.json`, JSON.stringify(state.cities))
        } catch (error) {
            console.log(error)
        }
    })

}

//readCitiesFiles('DF')

async function readCitiesFiles(uf) {
    const data = JSON.parse(await fs.readFile(`${uf}.json`))
    console.log(`${uf}: ${data.length} cidades`)
}
/**
 * Load All Cities saved on State dir 
 */
async function loadAllCitiesSpliteByState() {
    try {
        var result = await fs.readdir(DIR_STATE, "utf-8")
        let promises = result.map(async fileName => {
            var citiesString = await fs.readFile(`${DIR_STATE}/${fileName}`, 'utf-8')
            var cities = JSON.parse(citiesString)
            //Split by "." in File Name and get the first element Ex. "CE.json"
            let sigla = fileName.split(".")[0]
            //Create State object and return
            var state = {}
            state.Sigla = sigla
            state.cities = cities
            return state
        })

        return Promise.all(promises)
    } catch (err) {
        console.error(`Error: showStatesHaveMoreCities  \n ${err} `)
    }
}

//showStatesHaveMoreCities()

async function showStatesHaveMoreCities() {
    let states = await loadAllCitiesSpliteByState()
    //order list by cities length
    states.sort((a, b) => a.cities.length - b.cities.length)
    states.reverse()
    let top5 = states.slice(0, 5)

    let table = top5.map(el => {
        return {
            Sigla: el.Sigla,
            "Qtd. Cities": el.cities.length
        }
    })

    console.table(table)
}

//showStatesHaveLessCities()

async function showStatesHaveLessCities() {
    let states = await loadAllCitiesSpliteByState()
    //order list by cities length
    states.sort((a, b) => b.cities.length - a.cities.length)
    states.reverse()
    let top5 = states.slice(0, 5)
    top5.reverse()
    let table = top5.map(el => {
        return {
            Sigla: el.Sigla,
            "Qtd. Cities": el.cities.length
        }
    })

    console.table(table)
}

cityBigNameStates()

async function cityBigNameStates() {
    try {
        let list = []
        let states = await loadAllCitiesSpliteByState()
        states.forEach(state => {
            state.cityLongestName = state.cities.reduce((a, b) => a.Nome.length > b.Nome.length ? a : b)
            list.push(`${state.cityLongestName.Nome} - ${state.Sigla}`)
            return state
        })
        console.table(list)
        return Promise.all(states)
    } catch (error) {
        console.log(`Error: cityBigNameStates \n ${error}`)
    }
}

//citySmallerNameStates()

async function citySmallerNameStates() {
    try {
        let list = []
        let states = await loadAllCitiesSpliteByState()
        states.forEach(state => {
            state.cityLongestName = state.cities.reduce((a, b) => a.Nome.length < b.Nome.length ? a : b)
            list.push(`${state.cityLongestName.Nome} - ${state.Sigla}`)
        })
        console.log(list.sort((a,b) => a - b))
    } catch (error) {
        console.log(`Error: citySmallerNameStates \n ${error}`)
    }
}

//cityBiggerAtAll()

async function cityBiggerAtAll() {

    let nameBiggerAtAll = await cityBigNameStates()

    let biggest = nameBiggerAtAll.reduce((a, b) => a.cityLongestName.Nome.length > b.cityLongestName.Nome.length ? a : b)
    console.log(`${biggest.Sigla} - ${biggest.cityLongestName.Nome}`)
}


//citySmallerAtAll()

async function citySmallerAtAll() {

    let nameSmallerAtAll = await cityBigNameStates()
    let smaller = nameSmallerAtAll.reduce((a, b) => a.cityLongestName.Nome.length < b.cityLongestName.Nome.length ? a : b)
    console.log(` teste ${smaller.Sigla} - ${smaller.cityLongestName.Nome}`)
}