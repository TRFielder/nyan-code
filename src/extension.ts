// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
let activePanel: vscode.WebviewPanel | undefined;

export function activate({
  subscriptions,
  extensionUri,
}: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  subscriptions.push(
    vscode.commands.registerCommand("nyancode.nyancat", () => {
      if (activePanel) {
        activePanel.dispose();
      }
      const assetPath = "src/assets/nyancat";
      // Make a second panel for our nyan coder
      const panel = vscode.window.createWebviewPanel(
        "nyanCat",
        "Nyan Cat",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      activePanel = panel;
      // Set the HTML content of the webView panel
      //   const htmlContent =
      // get the animation frame paths
      const path1 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-1.png");
      const uri1 = panel.webview.asWebviewUri(path1);

      const path2 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-2.png");
      const uri2 = panel.webview.asWebviewUri(path2);

      const path3 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-3.png");
      const uri3 = panel.webview.asWebviewUri(path3);

      const path4 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-4.png");
      const uri4 = panel.webview.asWebviewUri(path4);

      const path5 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-5.png");
      const uri5 = panel.webview.asWebviewUri(path5);

      const path6 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-6.png");
      const uri6 = panel.webview.asWebviewUri(path6);

      const nyanFrameGenerator = getNyanState();

      panel.webview.html = getWebViewContent(
        uri1,
        uri2,
        uri3,
        uri4,
        uri5,
        uri6
      );

      // Trigger the aniumation when the user types
      const typeCommand = vscode.commands.registerCommand("type", (...args) => {
        panel.webview.postMessage(nyanFrameGenerator.next().value);
        return vscode.commands.executeCommand("default:type", ...args);
      });
      subscriptions.push(typeCommand);

      // Disposal
      panel.onDidDispose(
        () => {
          typeCommand.dispose();
        },
        null,
        subscriptions
      );
    }),

    vscode.commands.registerCommand("nyancode.tacnayn", () => {
      if (activePanel) {
        activePanel.dispose();
      }
      const assetPath = "src/assets/tacnayn";
      // Make a second panel for our nyan coder
      const panel = vscode.window.createWebviewPanel(
        "tacNayn",
        "Tac Nayn",
        vscode.ViewColumn.Two,
        { enableScripts: true }
      );

      activePanel = panel;
      // Set the HTML content of the webView panel
      //   const htmlContent =
      // get the animation frame paths
      const path1 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-1.png");
      const uri1 = panel.webview.asWebviewUri(path1);

      const path2 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-2.png");
      const uri2 = panel.webview.asWebviewUri(path2);

      const path3 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-3.png");
      const uri3 = panel.webview.asWebviewUri(path3);

      const path4 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-4.png");
      const uri4 = panel.webview.asWebviewUri(path4);

      const path5 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-5.png");
      const uri5 = panel.webview.asWebviewUri(path5);

      const path6 = vscode.Uri.joinPath(extensionUri, assetPath, "frame-6.png");
      const uri6 = panel.webview.asWebviewUri(path6);

      const nyanFrameGenerator = getNyanState();

      panel.webview.html = getWebViewContent(
        uri1,
        uri2,
        uri3,
        uri4,
        uri5,
        uri6
      );

      // Trigger the aniumation when the user types
      const typeCommand = vscode.commands.registerCommand("type", (...args) => {
        panel.webview.postMessage(nyanFrameGenerator.next().value);
        return vscode.commands.executeCommand("default:type", ...args);
      });
      subscriptions.push(typeCommand);

      // Disposal
      panel.onDidDispose(
        () => {
          typeCommand.dispose();
        },
        null,
        subscriptions
      );
    })
  );

  enum NyanState {
    one = "one",
    two = "two",
    three = "three",
    four = "four",
    five = "five",
    six = "six",
  }

  function* getNyanState() {
    let current = NyanState.one;

    while (true) {
      if (current === NyanState.one) {
        current = NyanState.two;
        yield NyanState.two;
      } else if (current === NyanState.two) {
        current = NyanState.three;
        yield NyanState.three;
      } else if (current === NyanState.three) {
        current = NyanState.four;
        yield NyanState.four;
      } else if (current === NyanState.four) {
        current = NyanState.five;
        yield NyanState.five;
      } else if (current === NyanState.five) {
        current = NyanState.six;
        yield NyanState.six;
      } else if (current === NyanState.six) {
        current = NyanState.one;
        yield NyanState.one;
      }
    }
  }
}

function getWebViewContent(
  one: vscode.Uri,
  two: vscode.Uri,
  three: vscode.Uri,
  four: vscode.Uri,
  five: vscode.Uri,
  six: vscode.Uri
) {
  return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Bongo Cat</title>
		</head>
		<body>
		<div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
			<img id="one" src=${one} width="50%"/>
			<img id="two" src=${two} width="50%" hidden/>
			<img id="three" src=${three} width="50%" hidden/>
			<img id="four" src=${four} width="50%" hidden/>
			<img id="five" src=${five} width="50%" hidden/>
			<img id="six" src=${six} width="50%" hidden/>
		</div>
		</body>
		<script>
			const one = document.getElementById('one');
			const two = document.getElementById('two');
			const three = document.getElementById('three');
			const four = document.getElementById('four');
			const five = document.getElementById('five');
			const six = document.getElementById('six');
			let timeout;

			window.addEventListener('message', event => {
				const message = event.data;
				clearTimeout(timeout);
				if(message === 'one'){
					one.hidden = false;
					two.hidden = true;
					three.hidden = true;
					four.hidden = true;
					five.hidden = true;
					six.hidden = true;
				} else if(message === "two") {
					one.hidden = true;
					two.hidden = false;
					three.hidden = true;
					four.hidden = true;
					five.hidden = true;
					six.hidden = true;
				} else if(message === "three") {
					one.hidden = true;
					two.hidden = true;
					three.hidden = false;
					four.hidden = true;
					five.hidden = true;
					six.hidden = true;
				} else if(message === "four") {
					one.hidden = true;
					two.hidden = true;
					three.hidden = true;
					four.hidden = false;
					five.hidden = true;
					six.hidden = true;
				} else if(message === "five") {
					one.hidden = true;
					two.hidden = true;
					three.hidden = true;
					four.hidden = true;
					five.hidden = false;
					six.hidden = true;
				} else if(message === "six") {
					one.hidden = true;
					two.hidden = true;
					three.hidden = true;
					four.hidden = true;
					five.hidden = true;
					six.hidden = false;
				}
				
			});
		</script>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
