const http = require('http');

// define hostname
const hostname = 'localhost';
const port = 3000;

// create server
const server = http.createServer((req, res) => {

    const { url } = req;

    console.log(url)

    if (url === '/translations'){
        const translations = {
            1: 'one',
            2: 'two',
            3: 'three',
        }
        res.setHeader('Content-Type', 'application/json');

        res.write(JSON.stringify(translations))
        res.end()
    }

    res.end('this is the power of node!')
});

// start up the server
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})