import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'
    const { file, key, value } = await useBody(event)

    const filePath = fileURLToPath(new URL(`${contentPath}/${file}`, import.meta.url))

    // Parse Markdown Metadata



    let contents = fs.readFileSync(filePath, 'utf8')
    contents = contents.split('---')
    const attributes = contents[1].replace(/^\s*[\r\n]/gm, '')
    const re = /(\w+):\s*(?:"([^"]*)"|(\S+))/g;
    let parsedAttributes = {}, m;
    while (m = re.exec(attributes)) {
        parsedAttributes[m[1]] = (m[3] || m[2]);
    }

    parsedAttributes[key] = value

    const parsedToString = Object.entries(parsedAttributes).map(([key, value]) => `${key}: '${value}'`)

    const newContents = `---
${parsedToString.join('\r\n')}
---
${contents[2].replace(/^\n|\n$/g, '')}`


    fs.writeFile(filePath, newContents, function (err) {
        if (err) throw err;
        console.log('File is updated successfully.');
        return "File is updated successfully."
    });

    return "File is updated successfully."
})