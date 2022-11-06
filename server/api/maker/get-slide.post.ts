import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'
    const { file } = await useBody(event)

    var contents: string[] | string = fs.readFileSync(fileURLToPath(new URL(`${contentPath}/${file}`, import.meta.url)), 'utf8')
    contents = contents.split('---')
    contents.shift()
    contents.shift()

    return contents.join('---')
})