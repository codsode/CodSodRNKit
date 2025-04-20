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
async function processProjectName(projectName, projectPath) {
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
    "ios/HelloWorld.xcodeproj/xcshareddata/xcschemes/HelloWorld.xcscheme",
  ];

  // Process each file if it exists
  for (const filePath of filesToProcess) {
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
  }

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

  // Function to handle iOS scheme file renaming
  const renameIosScheme = async () => {
    const iosDir = path.join(projectPath, "ios");

    // Search for the scheme file in case directory structure has changed
    const findSchemeFile = (dirPath, schemeName, depth = 0) => {
      if (depth > 4) return null; // Limit recursion depth

      try {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        // First look for the exact scheme file
        const exactFile = path.join(dirPath, `${schemeName}.xcscheme`);
        if (fs.existsSync(exactFile)) return exactFile;

        // Then recursively search subdirectories
        for (const entry of entries) {
          if (entry.isDirectory()) {
            const foundPath = findSchemeFile(
              path.join(dirPath, entry.name),
              schemeName,
              depth + 1
            );
            if (foundPath) return foundPath;
          } else if (entry.name === `${schemeName}.xcscheme`) {
            return path.join(dirPath, entry.name);
          }
        }
      } catch (error) {
        console.error(`Error searching directory ${dirPath}:`, error);
      }

      return null;
    };

    // First try the expected path
    let oldSchemeFile = path.join(
      iosDir,
      "HelloWorld.xcodeproj/xcshareddata/xcschemes/HelloWorld.xcscheme"
    );

    // If not found, search for it
    if (!fs.existsSync(oldSchemeFile)) {
      console.log(
        blue("Scheme file not found at expected location, searching...")
      );
      oldSchemeFile = findSchemeFile(iosDir, "HelloWorld");

      if (!oldSchemeFile) {
        console.error(
          "Could not find HelloWorld.xcscheme file in iOS directory"
        );
        return false;
      }
    }

    // Now get the directory to create the new scheme file
    const schemeDir = path.dirname(oldSchemeFile);
    const newSchemeFile = path.join(schemeDir, `${projectName}.xcscheme`);

    if (oldSchemeFile === newSchemeFile) {
      console.log(
        blue("Scheme file already named correctly, no need to rename")
      );
      return true;
    }

    try {
      console.log(
        blue(
          `Renaming iOS scheme file from HelloWorld.xcscheme to ${projectName}.xcscheme`
        )
      );

      // Read the scheme file and replace any remaining references
      let schemeContent = fs.readFileSync(oldSchemeFile, "utf8");
      schemeContent = schemeContent.replace(/HelloWorld/g, projectName);

      // Write the new scheme file first
      fs.writeFileSync(newSchemeFile, schemeContent, "utf8");

      // Then delete the old one
      if (fs.existsSync(oldSchemeFile)) {
        fs.unlinkSync(oldSchemeFile);
      }

      return true;
    } catch (error) {
      console.error("Error renaming iOS scheme file:", error);
      return false;
    }
  };

  // Try to rename the scheme file with a retry mechanism
  let schemeRenamed = false;
  const maxRetries = 5;
  const retryDelay = 1000; // 1 second

  for (let i = 0; i < maxRetries && !schemeRenamed; i++) {
    if (i > 0) {
      console.log(
        blue(`Retrying scheme file rename (attempt ${i + 1}/${maxRetries})...`)
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
    schemeRenamed = await renameIosScheme();
  }

  if (!schemeRenamed) {
    console.log(
      blue(
        "Could not rename iOS scheme file. Please rename it manually after the project is created."
      )
    );
  }

  // Handle directory renaming for iOS
  const oldIosProjectDir = path.join(projectPath, "ios/HelloWorld");
  const newIosProjectDir = path.join(projectPath, "ios", projectName);
  const oldIosTestsDir = path.join(projectPath, "ios/HelloWorldTests");
  const newIosTestsDir = path.join(projectPath, "ios", `${projectName}Tests`);
  const oldIosXcodeDir = path.join(projectPath, "ios/HelloWorld.xcodeproj");
  const newIosXcodeDir = path.join(
    projectPath,
    "ios",
    `${projectName}.xcodeproj`
  );

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

/**
 * Set executable permissions for gradlew
 * @param {string} projectPath - The root path of the project
 */
function setGradlePermissions(projectPath) {
  console.log(blue("\nSetting gradlew permissions..."));
  const gradlewPath = path.join(projectPath, "android", "gradlew");

  try {
    if (fs.existsSync(gradlewPath)) {
      // Set executable permissions (chmod +x)
      fs.chmodSync(gradlewPath, "755");
      console.log(green("✓ Successfully set gradlew permissions"));
    } else {
      console.log(gray("gradlew file not found, skipping permission setting"));
    }
  } catch (error) {
    console.error("Error setting gradlew permissions:", error);
  }
}

// Main function that runs after initialization
async function main() {
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

    // Process project name
    await processProjectName(projectName, projectPath);

    // Set gradlew permissions
    setGradlePermissions(projectPath);

    // Handle gitignore
    handleGitignore(projectPath);
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
main().catch((error) => {
  console.error("Fatal error in post-init script:", error);
  process.exit(1);
});
