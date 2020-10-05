import { promises as fs } from 'fs'
/**
 * Criar uma função que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json,
 '* e o seu conteúdo será um array das cidades pertencentes a aquele estado, de acordo com o arquivo Cidades.json.
 '* O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
 */

createFileStates()

async function createFileStates() {

    const statesJson = await fs.readFile('Estados.json', 'utf-8')
    const citiesJson = await fs.readFile('Cidades.json', 'utf-8')

    const states = JSON.parse(statesJson)
    const cities = JSON.parse(citiesJson)

    states.forEach(state => {
        state.cities = cities.filter(city => city.Estado === state.ID)
        try {
            fs.writeFile(`${state.Sigla}.json`, JSON.stringify(state.cities))
        } catch (error) {
            console.log(error)
        }
    })

}

/**
 * Criar uma função que recebe como parâmetro o UF do estado,
 * realize a leitura do arquivo JSON correspondente
 * e retorne a quantidade de cidades daquele estado.
 */

readCitiesFiles('DF')

async function readCitiesFiles(uf) {
    const data = JSON.parse(await fs.readFile(`${uf}.json`))
    console.log(data.length)
}

/**
 * Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades,
 * seguidos da quantidade, em ordem decrescente. Você pode usar a função criada no tópico 2.
 * Exemplo de impressão: [“UF - 93”, “UF - 82”,“UF - 74”, “UF - 72”, “UF - 65”]
 */




/**
 * Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades,
 * seguidos da quantidade, em ordem decrescente.Você pode usar a função criada no tópico 2.
 * Exemplo de impressão: [“UF - 30”, “UF- 27”, “UF - 25”, “UF - 23”, “UF - 21”]
 */




/**
 * Criar um método que imprima no console um array com a cidade de maior nome de cada estado,
 * seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
 */




/**
 * Criar um método que imprima no console um array com a cidade de menor nome
 * de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
 */




/**
 * Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF.
 * Exemplo: “Nome da Cidade - UF"
 */




/**
 * Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF.
 * Exemplo: “Nome da Cidade - UF".
 */