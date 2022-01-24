import * as vscode from "vscode";

// Returns the location of the `fastly` CLI binary.
// Checks configuration first, then the PATH.
export function getFastlyCLI(): string | null {
  var commandExistsSync = require("command-exists").sync;
  let configured = vscode.workspace.getConfiguration("fastly").get("cli");

  if (configured && typeof configured === "string" && configured !== "fastly") {
    if (!commandExistsSync(configured)) {
      vscode.window.showErrorMessage(
        "Unable to find Fastly CLI in location specified in settings."
      );
      return null;
    } else {
      return configured;
    }
  }

  if (!commandExistsSync("fastly")) {
    vscode.window.showErrorMessage(
      "Unable to find Fastly CLI in PATH. Please follow the instructions at https://fastly.dev/reference/cli/#installing."
    );
    return null;
  } else {
    return "fastly";
  }
}
