
## Features

Format HTML by wrapping all attributes, no matter if there is only one or more.

## Extension Settings

This extension contributes the following settings:

* `HtmlFormatterWrapAll.enableFormatter`: Enable/disable the formatter.
* `HtmlFormatterWrapAll.indentInnerHtml`: Indent inner html.
* `HtmlFormatterWrapAll.wrapAttributedIndentSize`: Indent size.
* `HtmlFormatterWrapAll.preserveNewlines`: Preserve newlines.


### 0.0.1

Initial release

---


## Context

The VS Code option for `html.format.wrapAttributes: 'force-expand-multiline'` is misleading. The contextual message states: 'Wrap each attribute except the first.' The actual behavior is: 'Wrap each attribute if the tag has more than one attribute; otherwise, do not wrap.'

After a bit of searching, I found that the default formatter in VS Code uses [js-beautify][1] under the hood. This is [stated here][2] where you can see the options for the default formatter. What I've noticed is that in the [js-beautify options][3], there is a setting called `--wrap-attributes-min-attrs` that can achieve this behavior, but it's not implemented in VS Code yet. The VS Code HTML formatter defaults to option `2`, which explains why single attribute tags do not return to new lines.

## Install

This formatter basically loads the js-beautify formatter, adding the option `wrap_attributes_min_attrs: 0` to allow wrapping single-attribute tags (see `./extension.js`). I haven't published it to the VS Code extensions store, but if you want to give it a try, here are the commands to execute:

- `npm clone https://github.com/kzlucas/vscode-ext-html-formatter-force-wrap-attributes`
- `cd vscode-ext-html-formatter-force-wrap-attributes`
- `npm install`
- `npm install -g @vscode/vsce`
- `vsce package`
- `code --install-extension ./html-formatter--wrap-all-attributes-0.0.1.vsix`
- `Ctrl + shift + P` > `Reload Window`

[Here is][6] the related VS Code official documentation about the Formatter API.

  [1]: https://www.npmjs.com/package/js-beautify
  [2]: https://code.visualstudio.com/docs/languages/html#_formatting
  [3]: https://www.npmjs.com/package/js-beautify#user-content-css--html
  [4]: https://prettier.io/blog/2022/03/16/2.6.0.html
  [5]: https://github.com/kzlucas/vscode-ext-html-formatter-force-wrap-attributes
  [6]: https://code.visualstudio.com/blogs/2016/11/15/formatters-best-practices
  [7]: https://github.com/microsoft/vscode/issues