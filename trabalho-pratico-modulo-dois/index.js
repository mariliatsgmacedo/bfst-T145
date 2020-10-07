import { promises as fs } from 'fs'

const DIR_STATE = "states"

createFileStates()

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

readCitiesFiles('DF')

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

showStatesHaveMoreCities()

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

showStatesHaveLessCities()

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