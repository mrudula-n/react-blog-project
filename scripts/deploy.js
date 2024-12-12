/* eslint-disable no-undef */
const { exec } = require("child_process");

async function deploy() {
  try {
    // Build the application
    console.log("Building application...");
    await execCommand("npm run build");

    // Optimize images
    console.log("Optimizing images...");
    await execCommand("npm run optimize-images");

    // Generate service worker
    console.log("Generating service worker...");
    await execCommand("npm run generate-sw");

    // Run tests
    console.log("Running tests...");
    await execCommand("npm run test");

    // Deploy to hosting
    console.log("Deploying to hosting...");
    await execCommand("npm run deploy-hosting");

    console.log("Deployment complete!");
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        console.error(`Stderr: ${stderr}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

deploy();
