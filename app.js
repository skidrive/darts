const http = require('http');
const fs = require('fs');
const ejs = require('ejs')
const url = require('url')

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');


var server = http.createServer(getFromClient);
server.listen(3000);
console.log('server start');

//ここまでメインプログラム===========

//createServerの処理
function getFromClient(request, response){
    var url_parts = url_parts = url.parse(request.url);
    switch (url_parts.pathname) {
        case '/':
            var content = ejs.render(index_page, {
                title: "Index",
                content: "これはテンプレートを使ったサンプルページです。"
            });
            response.writeHead(200, {'Content-type' : 'text/html'});
            response.write(content);
            response.end();
            break;

        case '/other':
            var content = ejs.render(other_page, {
                title: "Other",
                content: "これは新しく用意したページです。",
            });
            response.writeHead(200, {'Content-type' : 'text/html'});
            response.write(content);
            response.end();
            break;
        
        default:
            response.writeHead(200, {'Content-type' : 'text/plain'});
            response.end('no page is foundです');
            break;
    }
}
