const vscode = require('vscode');
const format = require('html-format');

class HTMLDocumentFormatter {
	provideDocumentFormattingEdits(document, options) {

		// If the formatter is disabled, return an empty array of edits
		const isEnabled = vscode.workspace.getConfiguration().get('html-formatter--wrap-all-attributes.enableFormatter', true);
		if (!isEnabled) {
			return [];
		}

		// Get the tab size and insert spaces configuration
		const { tabSize, insertSpaces } = options;
		const indent = insertSpaces ? " ".repeat(tabSize) : "\t";
		const text = document.getText();
		const range = new vscode.Range(
			document.positionAt(0),
			document.positionAt(text.length)
		);

		vscode.window.showInformationMessage('HTML Formatter: executed');

		// Format the html document using the html-format package
		const indentedHtml = format(text, indent, 0)

		// Add line returns before "/>" and ">" in closing tags
		let startingSpaces = 0;
		let output = '';
		for (let line of indentedHtml.split('\n')) {

			// If line starts with <, store the indentation spaces length
			if (line.match(/^\s*</)) {
				startingSpaces = line.match(/^\s*/)[0];
			}

			// If line is an opening or closing tag without attributes, keep it as is (eg. <html> or </html>)
			if (line.match(/^\s*<[^\n ]+>$/)) {
				output += line + '\n';
			}
 
			// If line end with a self-closing tag, add a line break before it (eg. <input />)
			else if (line.endsWith('/>')) {
				line = line.replace('/>', `\n${startingSpaces}/>`);
				output += line + '\n';
			}

			// If line end with a closing chevron, add a line break before it (eg. <p class="muted">)
			else if (line.endsWith('>')) {
				line = line.replace('>', `\n${startingSpaces}>`);
				output += line + '\n';
			}

			// Else, keep the line as is
			else {
				output += line + '\n';
			}
		}

		return Promise.resolve([
			new vscode.TextEdit(range, output),
		]);


	}
}


function activate(context) {


	const formatter = new HTMLDocumentFormatter();
	context.subscriptions.push(
		vscode.languages.registerDocumentFormattingEditProvider("html", formatter)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('html-formatter--wrap-all-attributes.format', function () {
			const date = new Date();
			vscode.window.showInformationMessage('HTML Formatter: Wrap all attributes executed at: ' + date.toLocaleTimeString());
			// const editor = vscode.window.activeTextEditor;
			// console.log('editor.document.languageId:', editor.document.languageId);
		})
	);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
