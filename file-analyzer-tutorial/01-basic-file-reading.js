import { read } from "fs";
import { readFile, writeFile } from "fs/promises";
// fs/promise let us use modern async/await syntax

async function createSample() {
  const content = "Hello this is my first file created with Node.js";

  try {
    // writeFile takes two main arguments:
    // 1. The path where you want to create file
    // 2. The content to write into it
    await writeFile("Sample.txt", content, "utf-8");
    console.log("file created successfully");
  } catch (err) {
    console.error("Error creating file:", err.message);
  }
}

async function readSampleFile() {
  try {
    const content = await readFile("sample.txt", "utf-8");
    console.log("file content");
    console.log("content:", content);
    console.log("FILE STATISTICS:");
    console.log(`length: ${content.length} characters`);
    console.log(`First 20 characters: ${content.substring(0, 20)}...`);
  } catch (err) {
    console.error(`Error occured writing to a file: `, err.message);
  }
}

async function main(){
    await createSample();
    await readSampleFile()
}


main()