import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'
import { kebabCase } from 'unkit/string'
import { v4 as uuidv4 } from 'uuid';


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'
    const { lessonPath } = await useBody(event)
    if (!lessonPath) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'requireds',
        })
    }


    // LESSON NOT EXISTS
    if (!fs.existsSync(fileURLToPath(new URL(`${contentPath}/${lessonPath}`, import.meta.url)))) throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Lesson Not Exists',
    })

    const getSlides = (await readdir(fileURLToPath(new URL(`${contentPath}/${lessonPath}/`, import.meta.url)), { withFileTypes: true }))
                            .filter(dirent => dirent.isFile())
                            .map(dirent => dirent.name)

    const randomSlideName = `${getSlides?.length + 1}.${uuidv4()}.md`
    const slidePath = fileURLToPath(new URL(`${contentPath}/${lessonPath}/${randomSlideName}`, import.meta.url))

    fs.writeFile(slidePath, `---
title: "Slide ${getSlides?.length + 1}"
type: "CodeEditor"
chapter: "Chapter 1"
---
# Slide Title
Slide Text
    `, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
        return randomSlideName
    });
    return randomSlideName
})