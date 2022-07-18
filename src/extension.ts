import * as vscode from "vscode";
import { getFastlyCLI } from "./cli";

export function activate(context: vscode.ExtensionContext) {
  // Determine the location of the Fastly CLI binary to be used
  let fastly = getFastlyCLI();

  // Ensure `fastly` CLI is available
  if (!fastly) {
    console.log("fastly extension not activated due to missing CLI");
    return;
  }

  // The `fastly.compute.build` command builds the current Compute@Edge project into a Fastly package.
  let buildCommand = vscode.commands.registerCommand(
    "fastly.compute.build",
    () => {
      vscode.window.showInformationMessage("Building Compute@Edge project...");
    }
  );

  context.subscriptions.push(buildCommand);
}

export function deactivate() {}
