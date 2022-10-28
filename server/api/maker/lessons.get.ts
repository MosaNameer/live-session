import * as fs from 'fs';
import { fileURLToPath, URL } from "url";
import { readdir } from 'fs/promises'


export default defineEventHandler(async (event) => {
    const contentPath = '../../content'

    const getLessons = (await readdir(fileURLToPath(new URL(`${contentPath}`, import.meta.url)), { withFileTypes: true }))
                            .filter(dirent => dirent.isDirectory())
                            .map(dirent => dirent.name)
    return getLessons
})