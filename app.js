//1. Import
var express = require('express');
var path = require('path');
var request = require("request");
var routes = require('./routes/route.js');

//2. Initiate
var app = express();


//3. Configure
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",routes.home);
// http://localhost:8080/widgetembed/?symbol=BITFINEX%3ABTCUSD&interval=60&saveimage=0&toolbarbg=f1f3f6&studies=RSI%40tv-basicstudies&hideideas=1&theme=Dark&style=1&timezone=Asia%2FKolkata&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=BITFINEX%3ABTCUSD
app.all("/*", function(req, res, next) {
    if (req.url.indexOf("/widgetembed") == 0) {
        res.sendFile(path.join(__dirname, "public/test.html"))
    } else {
        req.pipe(request("https://s.tradingview.com" + req.url)).pipe(res);
    }
});


//5. Listen
var port = process.env.PORT || 8080;
var server = app.listen(port,
    function(request,response)
    {
        console.log("Catch the action at http://localhost:" + port);
    }
);


