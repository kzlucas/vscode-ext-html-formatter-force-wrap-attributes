var beautify_html = require('js-beautify').html;
const html = `\

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"
content="width=device-width, initial-scale=1.0">
<title>Document</title>
<body>
<main class="grid" aria="okook" fruit="banana"  >   </main>
<input type="text" name="name" id="name" value="John Doe" />
</body>
<script>
if(true) {
console.log('Hello');
}
</script>
</head>
</html>
`;

const options = { 
    indent_size: 4,
    indent_char: ' ',
    wrap_attributes_indent_size: 2,
    max_preserve_newline: 0,
    preserve_newlines: false,
    indent_inner_html: true,
    wrap_line_length: 0,
    wrap_attributes: 'force-expand-multiline',
    wrap_attributes_min_attrs: 1,
    // wrap_attributes_indent_size
}

const indentedHtml = beautify_html(html, options);
let output = indentedHtml;
// let output = '';

// // foreach lines,
// let startingSpaces = 0;
// for (let line of indentedHtml.split('\n')) {

//     // If line starts with <, store the indentation spaces length
//     if (line.match(/^\s*</)) {
//         startingSpaces = line.match(/^\s*/)[0];
//     }

//     // If line is an opening or closing tag without attributes, keep it as is
//     if (line.match(/^\s*<[^\n ]+>$/)) {
//         output += line + '\n';
//     }

//     // If line end with a self-closing tag, add a line break before it
//     else if (line.endsWith('/>')) {
//         line = line.replace('/>', `\n${startingSpaces}/>`);
//         output += line + '\n';
//     }

//     // If line end with a closing tag, add a line break before it
//     else if (line.endsWith('>')) {
//         line = line.replace('>', `\n${startingSpaces}>`);
//         output += line + '\n';
//     }

//     // Else, keep the line as is
//     else {
//         output += line + '\n';
//     }
// }

console.log(output);