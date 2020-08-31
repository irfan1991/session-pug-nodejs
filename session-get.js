var http = require('http')
var pug = require('pug')
var NodeSession = require('node-session')

var mainPug = "./templates/main.pug"
var page1Pug = "./templates/page1.pug"
var page2Pug = "./templates/page2.pug"

// membuat session
var session = new NodeSession({
    secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'
 
});

var server = http.createServer( function (request, response) {
    // mengaktifkan session
    session.startSession(request, response , function () {
        response.writeHead(200, {"Content-Type" : "text/html"})
        if (request.url === "/") {
            
            // mendaftarkan variable ke dalam session
            request.session.put("var1", "Pemrograman Node JS")

            //Tampilkan ke halaman utama
            var template = pug.renderFile(mainPug);
            response.end(template);

        } else if ( request.url === "/page1") {

            if (request.session.has('var2')) {

                // mengambil nilai variable dari dalam session dari halaman 1
                var value = request.session.get("var1");
            
                
            } else {

                var value = "Tidak ada nilai session";
                
            }

            
            // menampilkan ke halaman 1
            var template = pug.renderFile(page1Pug, {var1 : value});
            response.end(template);
        
        } else if ( request.url === "/page2") {

            // // mengambil nilai variable dari dalam session dari halaman 1
            // var value = request.session.get("var1");

            request.session.forget("var1")
            request.session.flush();

            // menampilkan ke halaman 2
            var template = pug.renderFile(page2Pug, {var1 : value})
            response.end(template)

        } else {

            response.end("Halaman tidak ditemukan !!")
        }
    })
})
server.listen(3000)