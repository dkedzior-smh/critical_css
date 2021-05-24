const critical = require('critical');
const request = require('request');
const fs = require('fs');

const paths = [
    'index.html', // input file
    'critical.css', // output critical css
    'index-critical.html', // output critical html
    'uncritical.css' // output uncritical css
];

console.log('1 -> Removing old files.');
paths.forEach(path => {
    try {
        fs.unlinkSync(path)
        console.log('file', path, 'removed.')
    } catch(err) {
        console.error(err)
    }
})

const uriOG4 = 'https://og4.com';

console.log('2 -> Getting HTML from', uriOG4)
request(
    { uri: uriOG4 },
    function(error, response, body) {
        fs.writeFileSync('index.html', body);

        console.log('3 -> The HTML file was saved!');
        console.log('4 -> Start of critical files generation.');

        critical.generate({
            src: 'index.html',
            target: {
                css: paths[1],
                html: paths[2],
                uncritical: paths[3],
            },
            css: ['styles-l.css', 'styles-m.css'],// TODO: get flies from generated
            width: 1300,
            height: 900,
            minify: false,
        }).then( () =>
            console.log('5 -> Critical files ware generated!')
        );
    }
)


