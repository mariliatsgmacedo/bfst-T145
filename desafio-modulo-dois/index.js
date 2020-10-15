import express from 'express'
import studentsRouter from './routes/students.js'
import { promises as fs } from 'fs';

const { readFile, _writeFile } = fs

const app = express()
app.use(express.json())

app.use('/students', studentsRouter)


app.listen(3000, async () => {
    try {
        await readFile('grades.json')
        console.log('API Started.');
    } catch (err) {
        console.log('Not Possible!')
    }
})