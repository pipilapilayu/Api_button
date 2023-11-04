// temp validate voices.json matches voice file name, should be integrited in build tools

const fs = require('node:fs/promises');

async function main() {
    const content = await fs.readFile('src/setting/translate/voices.json', 'utf-8');
    const config = JSON.parse(content);
    /** @type {string[]} */const paths = config.voices.map(v => v.path);
    const files = await fs.readdir('public/voices');

    const notExistPaths = paths.filter(v => !files.includes(v));
    if (notExistPaths.length) {
        console.log('invalid path:')
        console.log(notExistPaths.join('\n'));
    }
    const notUsedFiles = files.filter(v => !paths.includes(v));
    if (notUsedFiles.length) {
        console.log('not used files in public/voices:');
        console.log(notUsedFiles.join('\n'));
    }
}
main();