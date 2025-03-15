#!/usr/bin/env node

/**
 * This script fixes the template by replacing all occurrences of "CodSodRNKit"
 * with "HelloWorld" in all relevant files.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Helper to recursively get all files in a directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Main function to fix the template
function fixTemplate() {
  console.log("Starting template fix...");

  // 1. Replace all occurrences of CodSodRNKit in template files
  const templatePath = path.join(__dirname, "template");
  const filesToProcess = getAllFiles(templatePath);

  // Skip node_modules and binary files
  const skipExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".pdf",
    ".zip",
    ".jar",
    ".aar",
  ];

  let replacementCount = 0;

  filesToProcess.forEach((filePath) => {
    const ext = path.extname(filePath).toLowerCase();

    // Skip binary files and node_modules
    if (skipExtensions.includes(ext) || filePath.includes("node_modules")) {
      return;
    }

    try {
      // Read file as text
      let content = fs.readFileSync(filePath, "utf8");
      const originalContent = content;

      // Replace all occurrences of CodSodRNKit with HelloWorld
      content = content.replace(/CodSodRNKit/g, "HelloWorld");
      content = content.replace(/codsodrnkit/g, "helloworld");

      // Only write back if changes were made
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`Fixed: ${filePath}`);
        replacementCount++;
      }
    } catch (error) {
      // Skip files that can't be read as text
      console.log(`Skipping (binary or permission issue): ${filePath}`);
    }
  });

  console.log(
    `\nReplaced "CodSodRNKit" with "HelloWorld" in ${replacementCount} files.`
  );
  console.log("Template fix completed!");
}

// Execute the function
fixTemplate();
