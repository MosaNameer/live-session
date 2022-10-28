import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'
    const { file, content } = await useBody(event)

    const filePath = fileURLToPath(new URL(`${contentPath}/${file}`, import.meta.url))

    let contents = fs.readFileSync(filePath, 'utf8')
    contents = contents.split('---')
    const newContents =  `---
${contents[1].replace(/^\s*[\r\n]/gm, '')}---
${content.replace(/^\n|\n$/g, '')}`
    fs.writeFile(filePath, newContents, function (err) {
        if (err) throw err;
        console.log('File is updated successfully.');
        return "File is updated successfully."
    });

    return "File is updated successfully."
})