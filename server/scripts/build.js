const { rimrafSync } = require("rimraf");
const { exec } = require("node:child_process");
const fs = require("fs");
const path = require("path");

rimrafSync(path.resolve("dist"));
console.log("Cleanup.");
const swagger = exec("npx ts-node ./src/swagger.ts && npx tsc");
swagger.on("close", () => {
  console.log("Builded");
  fs.cpSync(path.resolve("src", "ml-models", "trained_models"), path.resolve("dist", "ml-models", "trained_models"), {
    recursive: true,
  });
  console.log("Models copied.");
});
