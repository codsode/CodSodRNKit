#!/usr/bin/env node
const { execSync } = require("child_process");
const { green, blue, white, gray, red } = require("kleur");

// Function to print ASCII art centered
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

printCenteredAsciiArt(asciiArt);

function installDependencies() {
  try {
    console.log(
      blue("\n⠹ Installing dependencies with '--legacy-peer-deps'...\n")
    );
    execSync("npm install --legacy-peer-deps", { stdio: "inherit" });
    console.log(green("\n🎉 Dependencies installed successfully! 🎉\n"));
  } catch (error) {
    console.error(
      red(
        "\n❌ Failed to install dependencies. Please run 'npm install --legacy-peer-deps' manually.\n"
      )
    );
    process.exit(1);
  }
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

  installDependencies();
}

// Start the process
processComplete();
