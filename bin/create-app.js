#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Parse arguments
const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.error('Please provide a project name:');
  console.error('  npx create-yuv-app my-app');
  process.exit(1);
}

const projectPath = path.resolve(process.cwd(), projectName);

// Create project directory
if (fs.existsSync(projectPath)) {
  console.error(`The directory ${projectName} already exists. Please use a different name or delete the directory.`);
  process.exit(1);
}

fs.mkdirSync(projectPath, { recursive: true });

console.log(`Creating a new YUV.AI NextJS app in ${projectPath}`);

// Clone the template using git
try {
  execSync(`git clone --depth 1 https://github.com/hoodini/yuv-nextjs-boilerplate ${projectName}`, { stdio: 'inherit' });
  
  // Remove git folder
  fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });
  
  // Create empty git repo
  execSync('git init', { cwd: projectPath, stdio: 'inherit' });
  
  // Remove the bin directory since it's not needed in the project
  fs.rmSync(path.join(projectPath, 'bin'), { recursive: true, force: true });
  
  // Update package.json
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = projectName;
  packageJson.private = true;
  delete packageJson.bin;
  delete packageJson.repository;
  delete packageJson.keywords;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('Installing dependencies...');
  execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
  
  console.log('\n🎉 YUV.AI NextJS Boilerplate has been successfully created!\n');
  console.log(`To get started, run the following commands:`);
  console.log(`  cd ${projectName}`);
  console.log(`  cp .env.example .env.local`);
  console.log(`  # Add your MongoDB and Clerk credentials to .env.local`);
  console.log(`  npm run dev`);
  console.log('\nHappy coding! Fly High With YUV.AI 🚀');
  
} catch (error) {
  console.error('An error occurred during project setup:', error);
  fs.rmSync(projectPath, { recursive: true, force: true });
  process.exit(1);
} 