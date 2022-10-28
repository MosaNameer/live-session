import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'
    const { file, key, value } = await useBody(event)

    const filePath = fileURLToPath(new URL(`${contentPath}/${file}`, import.meta.url))

    let contents = fs.readFileSync(filePath, 'utf8')
    contents = contents.split('---')
    const attributes = contents[1].replace(/^\s*[\r\n]/gm, '').match(/[^\r\n]+/g)
    const newAttributes = attributes.map(a => {
        const [k, v] = a.split(':')
        if (k == key) {
            return `${k}: "${value}"`
        } else {
            return a
        }
    })
    
    const newContents =  `---
${newAttributes.join('\r\n')}
---
${contents[2].replace(/^\n|\n$/g, '')}`


    fs.writeFile(filePath, newContents, function (err) {
        if (err) throw err;
        console.log('File is updated successfully.');
        return "File is updated successfully."
    });

    return "File is updated successfully."
})