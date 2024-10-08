const vscode = require('vscode');
const beautify_html = require('js-beautify').html;


class HTMLDocumentFormatter {
	provideDocumentFormattingEdits(document, options) {

		// If the formatter is disabled, return an empty array of edits
		const isEnabled = vscode.workspace.getConfiguration().get('html-formatter--wrap-all-attributes.enableFormatter', true);
		const indentInnerHtml = vscode.workspace.getConfiguration().get('html-formatter--wrap-all-attributes.indentInnerHtml', true);
		const wrapAttributedIndentSize = vscode.workspace.getConfiguration().get('html-formatter--wrap-all-attributes.wrapAttributedIndentSize', 2);
		const preserveNewlines = vscode.workspace.getConfiguration().get('html-formatter--wrap-all-attributes.preserveNewlines', true);

		if (!isEnabled) {
			return [];
		}

		// Get the tab size and insert spaces configuration
		const { tabSize, insertSpaces } = options;
		const indent = insertSpaces ? " ".repeat(tabSize) : "\t";
		const text = document.getText();

		// Format the entire document
		const range = new vscode.Range(
			document.positionAt(0),
			document.positionAt(text.length)
		);

		// @doc: https://www.npmjs.com/package/js-beautify
		const formatter_options = {
			indent_size: indent.length, // number of spaces to use for indentation
			indent_char: insertSpaces ? ' ' : '\t', // indent with space or tabs depending on user settings
			preserve_newlines: preserveNewlines, // whether existing line breaks should be preserved
			indent_inner_html: indentInnerHtml, // indent <head> and <body> sections
			wrap_line_length: 0, // maximum amount of characters per line
			wrap_attributes: 'force-expand-multiline',
			wrap_attributes_indent_size: wrapAttributedIndentSize,
			wrap_attributes_min_attrs: 0, // force-wrap all attributes
			content_unformatted: ['pre', 'code'], // tags that should not be formatted
		}

		// HTML inner text should return to new line
		let indentedHtml = text.replace(/<(?!script)[^<>]+>([^<>]+)<\/[^<>\/]+>/gm, (match, p1) => {
			// ignore empty text
			if (p1.replace(/\s/g, '') == '') {
				return match;
			}
			// add line breaks
			else
				return match.replace(p1, `\n${p1.trim()}\n`);
		});

		// Format the HTML (indentation, new lines, etc.) using js-beautify
		indentedHtml = beautify_html(indentedHtml, formatter_options);

		return Promise.resolve([
			new vscode.TextEdit(range, indentedHtml),
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
			const isEnabled = vscode.workspace.getConfiguration().get('html-formatter--wrap-all-attributes.enableFormatter', true);
			if (!isEnabled) {
				vscode.window.showInformationMessage('HTML Formatter: "Wrap all attributes" is enabled.');
			} else {
				vscode.window.showInformationMessage('HTML Formatter: "Wrap all attributes" is disabled. Enable it in the settings.');
			}
		})
	);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
