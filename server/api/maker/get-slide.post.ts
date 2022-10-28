import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'
    const { file } = await useBody(event)

    var contents = fs.readFileSync(fileURLToPath(new URL(`${contentPath}/${file}`, import.meta.url)), 'utf8')
    
    return contents.split('---').pop()
})