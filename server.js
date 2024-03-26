const http = require('http'); 
const fs = require('fs');

const server = http.createServer((req, res) => {  //Se ejecutara cada reques o reponse para una solicitud.
    const url = req.url;
    const method = req.method;
    if(url ==='/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>First interaction</title><head>');
        res.write('<body><form action = "/test" method="POST"><input type="text" name="message"><button type ="submit" >Go</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/test' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('test.txt', message);
            //console.log(parsedBody);
        });

        
        res.statusCode= 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First interaction</title><head>');
    res.write('<body><h1> Hello everyone </h1></body>');
    res.write('</html>');
    res.end(); 


});

server.listen(3000);

