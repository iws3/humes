// import { writeFile } from 'fs';
import {readdir, stat, mkdir, writeFile} from 'fs/promises';
import {join} from 'path'

async function exploreDirectory(directoryPath) {
    console.log(`\nExploring: ${directoryPath}`);
    console.log('='.repeat(50));

    try{
        // readdir gives us an array of files and folder names
        const items=await readdir(directoryPath);
        console.log(`Found ${items.length}:\n`);

        for (const item of items) {
      // join combines path segments correctly for the current OS
      const fullPath = join(directoryPath, item);
      
      // stat gives us detailed information about a file or folder
      const stats = await stat(fullPath);
      
      // We can check if something is a file or directory
      if (stats.isDirectory()) {
        console.log(`📁 ${item}/ (folder)`);
        console.log(`   Created: ${stats.birthtime.toLocaleString()}`);
      } else if (stats.isFile()) {
        console.log(`📄 ${item} (file)`);
        console.log(`   Size: ${stats.size} bytes`);
        console.log(`   Modified: ${stats.mtime.toLocaleString()}`);
      }
      
      console.log(''); // blank line for readability
    }

    }
    catch(err){
        console.error(`Found error ${err.message}`)
    }
}

// CREATE SAMPLE STRUCTURE:
async function createSampleStructure(){
    console.log('Creating sample directory structure...');

    try{
        await mkdir('sample-project', {recursive:true});
        await mkdir('sample-project/src', {recursive:true});
        await mkdir('sample-project/docs', {recursive:true});

        // create some files:
        await writeFile('sample-project/README.md', '# My Porject\n\n The is a sample project');
        await writeFile('sample-project/src/index.js', 'console.log("hello, world");');
        await writeFile('sample-project/src/utils.js', 'export function add(a,b) {return a+b};');
        await writeFile('sample-project/docs/guide.md', '# User Guide here!');

        console.log('Sample project structure created')

    }
    catch(err){
        console.error(`Error occured creatig dummy file and folder structure: ${err.message}`)
    }
}


async function main(){
    await createSampleStructure();
    await exploreDirectory('sample-project');
}
// exploreDirectory()
main()