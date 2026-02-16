import { read } from "fs";
import { readFile, writeFile } from "fs/promises";
async function exploreEncoding() {
    const textwithEmojies="Hello World! 😩 This is fun! 🏃‍♂️‍➡️";

    await writeFile('unicode.txt', textwithEmojies, 'utf-8');
    // now let's read it in different ways to see what happens
    // reading as utf-8: correct way for text
    const asText=await readFile('Unicode.txt', 'utf8');
    console.log('As UTF-8 text:', asText);
    // READING AS RAW BYTED [BUFFER]

    const asBuffer=await readFile('unicode.txt');
    console.log('\n A raw Buffer:', asBuffer);
    console.log('Buffer Length:', asBuffer.length, 'bytes');
    // convert  buffer to hex to see the actual byte
    console.log('As hexadecimal:', asBuffer.toString('hex'));


}

exploreEncoding()