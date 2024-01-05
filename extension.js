const { exec } = require('child_process');
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// autoformatter
	// var disposable = vscode.commands.registerCommand('gts-code-formatter.startautoformatter', function () {
	// 	registerOnsaveFormater()
	// });
	// context.subscriptions.push(disposable);

	// // workspace format
	// var disposable = vscode.commands.registerCommand('gts-code-formatter.formatworkspace', function () {
	// 	formatworkspace()
	// });
	// context.subscriptions.push(disposable);

	var disposable = vscode.languages.registerDocumentFormattingEditProvider('typescript', {
		provideDocumentFormattingEdits(document) {
			formatDocument(document.fileName)
		}
	});
	context.subscriptions.push(disposable);
}

function deactivate() { }

// function formatworkspace() {
// 	vscode.workspace.workspaceFolders.forEach(workspace => {
// 		formatDocument(workspace.uri.fsPath)
// 	});
// }


// function registerOnsaveFormater() {
// 	vscode.workspace.onWillSaveTextDocument(event => {
// 		const { languageId, fileName, } = event.document
// 		if (languageId !== 'typescript') {
// 			return
// 		}
// 		formatDocument(fileName)
// 	});
// }

function formatDocument(filePath) {
	console.log(filePath)
	exec(`npx gts fix ${filePath}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
			return;
		}
		console.log('Document formatted')
	});
}

module.exports = {
	activate,
	deactivate
}
