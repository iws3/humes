//  Recursive Directory Traversal - Going Deep


// Now comes the exciting part: how do we explore a folder and all of its subfolders, no matter how deeply nested? This is called "recursive traversal" and it's a fundamental algorithm in computer science. Create 04-recursive-traversal.js:
import {readdir, stat} from 'fs/promises';
import {join} from 'path';

// this function will call itself to explore nestd folders, rcursion is like looking in a box , finding another box inside, opening that box, finding yet another box, and so on
async function traverseDirectory(directoryPath, depth=0) {
    // depth tack how deep we are in the folder tree
    // we use it for indentation to make the output readable

    const indent=' '.repeat(depth);
    try{
        const items=await readdir(directoryPath);
        for (const item of items){
            const fullPath=join(directoryPath, item);
            const stats=await stat(fullPath);
            if(stats.isDirectory()){
                console.log(`${indent} 📁 ${item}/`)
                // recursion here: we call tjhe function again but with the subFolder's path and increase the depth by 1

                await traverseDirectory(fullPath, depth+1);
            }
            else if(stats.isFile()){
                console.log(`${indent} -- ${stats.size} bytes`);
            }
        }

    }
    catch(err){
        console.error(`error occured traversing the tree structure: ${err.message}`)
    }
}

// visualize how recursion works

function explainRecursion(number){
    console.log(`CALLED WITH NUMBER: ${number}`);
    if(number<=0){
        console.log('Base case reached! Going back up');
        return;
    }

    // recursive case: call ourselves with a smaller number
    explainRecursion(number -1);
    console.log(`Returning from number: ${number}`);
}

console.log('Understanding Recusrion:');
console.log('='.repeat(50));
explainRecursion(3)
console.log("\n\n Now traversing directory:");
console.log('='.repeat(50));
traverseDirectory('sample-project')