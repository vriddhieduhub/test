import * as fs from 'fs';
import * as path from 'path';

// process.cwd() সবসময় প্রজেক্টের রুট ডিরেক্টরি (যেখানে package.json আছে) রিটার্ন করে
const PROJECT_ROOT = process.cwd();
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'project_snapshot.txt');
const TARGET_DIR = path.join(PROJECT_ROOT, 'src');

let fileContentTree = '';
let fileContentMap = '';

function generateTree(dir: string, prefix = ''): void {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    files.forEach((file, index) => {
        const filePath = path.join(dir, file);
        const isLast = index === files.length - 1;
        const marker = isLast ? '└── ' : '├── ';
        
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            fileContentTree += `${prefix}${marker}${file}/\n`;
            generateTree(filePath, prefix + (isLast ? '    ' : '│   '));
        } else {
            fileContentTree += `${prefix}${marker}${file}\n`;
            readFileContent(filePath);
        }
    });
}

function readFileContent(filePath: string): void {
    try {
        // প্রজেক্ট রুট থেকে রিলেটিভ পাথ দেখানোর জন্য
        const relativePath = path.relative(PROJECT_ROOT, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        fileContentMap += `\n###########################################\n`;
        fileContentMap += `${relativePath}\n`;
        fileContentMap += `###########################################\n`;
        fileContentMap += `${content}\n`;
    } catch {
        fileContentMap += `\n[Error reading file: ${filePath}]\n`;
    }
}

function main(): void {
    if (!fs.existsSync(TARGET_DIR)) {
        console.error("Error: 'src' folder টি খুঁজে পাওয়া যায়নি!");
        return;
    }

    console.log("Processing 'src' folder...");
    fileContentTree += `src/\n`;
    
    generateTree(TARGET_DIR);

    const finalOutput = `===========================================\nPROJECT STRUCTURE\n===========================================\n\n${fileContentTree}\n\n===========================================\nFILE CONTENTS\n===========================================\n${fileContentMap}`;

    fs.writeFileSync(OUTPUT_FILE, finalOutput, 'utf-8');
    console.log(`Success! Snapshot তৈরি হয়ে গেছে: ${OUTPUT_FILE}`);
}

main();