const http = require('http');
const url = require('url');
const fs = require('fs');
console.clear();



http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    try{
        StartHttp();
    }
    catch{
        console.log("Error!");
        console.log("Connection failed!");
    }
    function StartHttp(){

        fs.readFile(filename, function(err, data) {
            if (err) {
                if(filename.endsWith("/")){
                    filename += "index.html";
                    StartHttp();
                    return;
                }
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found\n" + filename + " is wrong");
            }
            let contentType = ``;
            if ( filename.endsWith( ".html" ) )
                contentType = "text/html";
            else if ( filename.endsWith( ".css" ) )
                contentType = "text/css";
            else if ( filename.endsWith( ".js" ) )
                contentType = "text/javascript";
            res.writeHead( 200, { 'Content-Type': contentType } );
            res.write(data);
            return res.end();
        });
    }
} ).listen( 1000, "0.0.0.0" );
