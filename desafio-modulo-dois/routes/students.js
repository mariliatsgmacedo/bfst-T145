import express from 'express'
import { promises as fs } from 'fs'

const { readFile, writeFile } = fs

const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        let grade = req.body

        if (!grade.student || !grade.subject || !grade.type || grade.value === null) throw new Error('Required Types.')

        const data = JSON.parse(await readFile('grades.json'))

        grade = {
            id: data.nextId++,
            student: grade.student,
            subject: grade.subject,
            type: grade.type,
            value: grade.value,
            timestamp: new Date()
        }

        data.grades.push(grade)
        await writeFile('grades.json', JSON.stringify(data, null, 2))
        res.send(grade)

    } catch (err) {
        next(err)

    }
})

router.put('/:id', async (req, res, next) => {
    try {
        let grade = req.body

        if (!grade.student || !grade.subject || !grade.type || grade.value === null)
            throw new Error('Required Types.')

        const data = JSON.parse(await readFile('grades.json'))

        const index = data.grades
            .findIndex(gradIndex => gradIndex.id === parseInt(req.params.id))

        if (index === -1)
            throw new Error('Register not found.')

        data.grades[index].student = grade.student
        data.grades[index].subject = grade.subject
        data.grades[index].type = grade.type
        data.grades[index].value = grade.value

        await writeFile('grades.json', JSON.stringify(data, null, 2))

        res.send(grade)

    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('grades.json'))
        data.grades = data.grades.filter(grade => grade.id !== parseInt(req.params.id))
        await writeFile('grades.json', JSON.stringify(data, null, 2))
        res.end()
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('grades.json'))
        //delete data.nextId
        res.send(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('grades.json'))
        const student = data.grades.find(student => student.id === parseInt(req.params.id))
        res.send(student)
    } catch (err) {
        next(err)
    }
})

router.get('/:student/:subject', async (req, res, next) => {
    try {
        let gradeTotal = 0
        const data = JSON.parse(await readFile('grades.json'))
        data.grades
            .map(student => {
                let name = student.student.toUpperCase()
                let discipline = student.subject.toUpperCase()
                let nameParam = req.params.student.toUpperCase()
                let disciplineParam = req.params.subject.toUpperCase()

                if (name.includes(nameParam) && discipline.includes(disciplineParam)) {
                    gradeTotal += student.value
                }
                return gradeTotal
            })

        res.send(` Grades Sum Total: ${gradeTotal}`)

    } catch (err) {
        next(err)
    }
})

router.get('/:subject/:type', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile('grades.json'))
        let media = 0
        let sum = 0
        let cont = 0
        data.grades.map(student => {
            let discipline = student.subject.toUpperCase()
            let typeExercise = student.type.toUpperCase()
            let discParam = req.params.subject.toUpperCase()
            let typeExerciseParam = req.params.type.toUpperCase()
            let gradeExclusive = student.value

            if (discipline.includes(discParam) && typeExercise.includes(typeExerciseParam)) {
                cont++
                sum += gradeExclusive
                media = (sum / cont)
            }
            return media
        })

        res.send(`Media: ${media}`)

    } catch (err) {
        next(err)
    }

})

router.get('/:subject/:type', async (req, res, next) => {
    //TODO ORDER TO ID
    try {
        let biggerGrades = []

        const data = JSON.parse(await readFile('grades.json'))

        data.grades.map(student => {
            let discipline = student.subject.toUpperCase()
            let typeExercise = student.type.toUpperCase()
            let discParam = req.params.subject.toUpperCase()
            let typeExerciseParam = req.params.type.toUpperCase()
            let gradeExclusive = student.value

            if (discipline.includes(discParam) && typeExercise.includes(typeExerciseParam)) {
                console.log(student.id, discipline, typeExercise, gradeExclusive);
                biggerGrades.push(gradeExclusive)
                biggerGrades.sort()

            }

            return biggerGrades

        })

        res.send(`Arr: ${biggerGrades.reverse()}`)

    } catch (err) {
        next(err)
    }
})


//Error handling
router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message })
})


export default router