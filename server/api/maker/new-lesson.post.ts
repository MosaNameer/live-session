import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'
import { kebabCase } from 'unkit/string'


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'
    const { name } = await readBody(event)
    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'requireds',
        })
    }

    const lessonName = kebabCase(name)

    const getLessons = (await readdir(fileURLToPath(new URL(`${contentPath}`, import.meta.url)), { withFileTypes: true }))
                            .filter(dirent => dirent.isDirectory())
                            .map(dirent => dirent.name)

    // LESSON ALREADY EXISTS
    if (getLessons.findIndex(l => l?.split('.').pop() == lessonName) !== -1) throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Lesson Already Exists',
    })


    const lessonPath = fileURLToPath(new URL(`${contentPath}/${getLessons?.length + 1}.${lessonName}`, import.meta.url))

    if (!fs.existsSync(lessonPath)) {
        fs.mkdirSync(lessonPath);
        return `${getLessons?.length + 1}.${lessonName}`
    } else {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Lesson already exists',
        })
    }
})