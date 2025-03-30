#!/usr/bin/env node

const { green, blue, white, gray } = require("kleur");
const fs = require("fs");
const path = require("path");

// Log debug information at script start
console.log(blue("========== Post-Init Script Debug Information =========="));
console.log(blue(`Node Version: ${process.version}`));
console.log(blue(`Script Path: ${__filename}`));
console.log(blue(`Current Directory: ${process.cwd()}`));
console.log(
  blue(`Environment: PROJECT_NAME=${process.env.PROJECT_NAME || "not set"}`)
);
console.log(blue(`Command Line Arguments: ${process.argv.join(", ")}`));
console.log(blue("======================================================"));

/**
 * Process and replace project name in specific files
 * @param {string} projectName - The name of the new project
 * @param {string} projectPath - The root path of the project
 */
function processProjectName(projectName, projectPath) {
  console.log(blue(`\nProcessing project name: ${projectName}`));

  // Make sure to check specifically for CodSodRNKit in app.json
  const appJsonPath = path.join(projectPath, "app.json");
  if (fs.existsSync(appJsonPath)) {
    try {
      console.log(
        gray(`Processing app.json specifically for CodSodRNKit name`)
      );
      let appJsonContent = fs.readFileSync(appJsonPath, "utf8");
      appJsonContent = appJsonContent.replace(
        /"name":\s*"CodSodRNKit"/g,
        `"name": "${projectName}"`
      );
      appJsonContent = appJsonContent.replace(
        /"displayName":\s*"CodSodRNKit"/g,
        `"displayName": "${projectName}"`
      );
      fs.writeFileSync(appJsonPath, appJsonContent, "utf8");
    } catch (error) {
      console.error(`Error processing app.json:`, error);
    }
  }

  // List of files to process for project name replacements
  const filesToProcess = [
    "package.json",
    "app.json",
    "index.js",
    "android/app/build.gradle",
    "android/app/src/main/java/com/helloworld/MainActivity.kt",
    "android/app/src/main/java/com/helloworld/MainApplication.kt",
    "android/settings.gradle",
    "ios/HelloWorld/AppDelegate.swift",
    "ios/HelloWorld/Info.plist",
    "ios/HelloWorld.xcodeproj/project.pbxproj",
    "ios/Podfile",
  ];

  // Process each file if it exists
  filesToProcess.forEach((filePath) => {
    const fullPath = path.join(projectPath, filePath);
    if (fs.existsSync(fullPath)) {
      try {
        console.log(gray(`Processing file: ${filePath}`));
        let content = fs.readFileSync(fullPath, "utf8");

        // Replace occurrences of placeholders with the project name
        content = content.replace(/HelloWorld/g, projectName);
        content = content.replace(/helloworld/g, projectName.toLowerCase());
        // Also replace any remaining CodSodRNKit instances
        content = content.replace(/CodSodRNKit/g, projectName);
        content = content.replace(/codsodrnkit/g, projectName.toLowerCase());

        // Write the modified content back to the file
        fs.writeFileSync(fullPath, content, "utf8");
      } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
      }
    } else {
      console.log(gray(`File not found: ${filePath}`));
    }
  });

  // Handle directory renaming for Android
  const androidSrcDir = path.join(projectPath, "android/app/src/main/java/com");
  const oldAndroidDir = path.join(androidSrcDir, "helloworld");
  const newAndroidDir = path.join(androidSrcDir, projectName.toLowerCase());

  if (fs.existsSync(oldAndroidDir)) {
    try {
      console.log(
        blue(
          `Renaming Android directory from 'helloworld' to '${projectName.toLowerCase()}'`
        )
      );
      fs.renameSync(oldAndroidDir, newAndroidDir);
    } catch (error) {
      console.error("Error renaming Android directory:", error);
    }
  }

  // Handle directory renaming for iOS
  const iosDir = path.join(projectPath, "ios");
  const oldIosProjectDir = path.join(iosDir, "HelloWorld");
  const newIosProjectDir = path.join(iosDir, projectName);
  const oldIosTestsDir = path.join(iosDir, "HelloWorldTests");
  const newIosTestsDir = path.join(iosDir, `${projectName}Tests`);
  const oldIosXcodeDir = path.join(iosDir, "HelloWorld.xcodeproj");
  const newIosXcodeDir = path.join(iosDir, `${projectName}.xcodeproj`);

  // Rename iOS directories if they exist
  [
    { old: oldIosProjectDir, new: newIosProjectDir },
    { old: oldIosTestsDir, new: newIosTestsDir },
    { old: oldIosXcodeDir, new: newIosXcodeDir },
  ].forEach((dirs) => {
    if (fs.existsSync(dirs.old)) {
      try {
        console.log(
          blue(
            `Renaming iOS directory from '${path.basename(
              dirs.old
            )}' to '${path.basename(dirs.new)}'`
          )
        );
        fs.renameSync(dirs.old, dirs.new);
      } catch (error) {
        console.error(
          `Error renaming iOS directory ${path.basename(dirs.old)}:`,
          error
        );
      }
    }
  });
}

function printCenteredAsciiArt(asciiArt) {
  const terminalWidth = process.stdout.columns;
  const lines = asciiArt.split("\n");
  const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const leftPadding = Math.max(Math.floor((terminalWidth - maxLength) / 2), 0);

  const centeredAsciiArt = lines
    .map((line) => " ".repeat(leftPadding) + line)
    .join("\n");

  console.log(green(centeredAsciiArt));
}

const asciiArt = `
███████████████████████████████████████████████████████████████████████████████████████████
█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░███░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░███
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀░░░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀░░░░█
█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░▄▀▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░▄▀▄▀░░█
█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░░░░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█████████░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░▄▀▄▀░░█░░░░░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░▄▀▄▀░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀░░░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀░░░░█
█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░███░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░███
███████████████████████████████████████████████████████████████████████████████████████████      

                                        ${white("CodSod")}  
                            ${gray(
                              "Computer Science Education Channel"
                            )}                                                   
`;

/**
 * Handle gitignore file copying
 * @param {string} projectPath - The root path of the project
 */
function handleGitignore(projectPath) {
  console.log(blue("\nHandling gitignore file..."));

  const gitignorePath = path.join(projectPath, "gitignore");
  const dotGitignorePath = path.join(projectPath, ".gitignore");

  try {
    // Check if gitignore exists
    if (fs.existsSync(gitignorePath)) {
      console.log(gray("Found gitignore file"));

      // Read the contents of gitignore
      const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");

      // Check if .gitignore exists
      if (fs.existsSync(dotGitignorePath)) {
        console.log(gray("Found existing .gitignore file, appending contents"));
        // Read existing .gitignore content
        const existingContent = fs.readFileSync(dotGitignorePath, "utf8");
        // Append new content if it's not already there
        if (!existingContent.includes(gitignoreContent)) {
          fs.writeFileSync(
            dotGitignorePath,
            existingContent + "\n" + gitignoreContent,
            "utf8"
          );
        }
      } else {
        console.log(gray("Creating new .gitignore file"));
        // Create new .gitignore file
        fs.writeFileSync(dotGitignorePath, gitignoreContent, "utf8");
      }

      // Delete the original gitignore file
      console.log(gray("Removing original gitignore file"));
      fs.unlinkSync(gitignorePath);
    } else {
      console.log(gray("No gitignore file found, skipping"));
    }
  } catch (error) {
    console.error("Error handling gitignore:", error);
  }
}

// Main function that runs after initialization
function main() {
  try {
    // Try multiple sources for the project name in this order:
    // 1. PROJECT_NAME environment variable (set by RN CLI)
    // 2. From React Native template CLI args
    // 3. From command line args
    // 4. From the directory name as last resort
    let projectName = process.env.PROJECT_NAME;
    const projectPath = process.cwd();

    // If no PROJECT_NAME env var, check for RN CLI specific args format
    if (!projectName && process.argv.length > 2) {
      // React Native CLI might pass template vars as JSON in args
      try {
        const argsData = JSON.parse(process.argv[2]);
        if (argsData && argsData.project_name) {
          projectName = argsData.project_name;
          console.log(
            blue(`Found project name in CLI args JSON: ${projectName}`)
          );
        }
      } catch (e) {
        // Not JSON, try as simple arg
        projectName = process.argv[2];
        console.log(
          blue(`Using command line arg as project name: ${projectName}`)
        );
      }
    }

    // Last resort: use directory name
    if (!projectName) {
      projectName = path.basename(projectPath);
      console.log(blue(`Using directory name as project name: ${projectName}`));
    }

    // Display the ASCII art
    printCenteredAsciiArt(asciiArt);

    // Handle gitignore file
    handleGitignore(projectPath);

    // Process project name replacements
    if (projectName) {
      processProjectName(projectName, projectPath);
    } else {
      console.log(blue("\nWarning: Could not determine project name."));
      console.log(
        blue("Project name substitution may not have occurred properly.")
      );
    }
  } catch (error) {
    console.error("Error in post-init script:", error);
  }

  // Complete the process
  processComplete();
}

function processComplete() {
  console.log("\n");
  console.log(blue("🚀 React-Native Boilerplate initialized successfully! 🚀"));
  console.log("\n");
  console.log(
    green("👏 Congratulations! Your project is now set up and ready to go.")
  );
  console.log("\n");

  console.log(
    green("🎉 Thank you for choosing our boilerplate. Happy coding! 🎉")
  );
  console.log("\n");

  console.log(blue("Script execution completed, exiting now..."));

  // Use a small delay before exiting to ensure all output is flushed
  setTimeout(() => {
    process.exit(0);
  }, 100);
}

// Execute the main function
console.log(blue("Starting post-init script execution..."));
main();
