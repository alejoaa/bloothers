require('dotenv').config()
var express = require('express'),
	path = require('path');
var app = express();


app.set("view engine", "ejs");

// define paths to modules in node_modules
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

// define views folder according to developing mode (developing or production)
if (process.env.DEV_ENV == "true") {
	app.set('views', path.join(__dirname, '/app/views'));
	app.use(express.static(__dirname + '/app/temp'));
	app.use(express.static(__dirname + '/app/assets'));
} else {
	app.set('views', path.join(__dirname, '/dist/views'));
	app.use(express.static(__dirname + "/dist/assets"));
}

// Routes

app.get('/', function(req, res) {
    res.redirect('/donar');
});

app.get('/donar', function(req, res) {
    res.render('donation.ejs');
});

app.get('/logros', function(req, res) {
    res.render('achievements.ejs');
});

app.listen(8000, function(){
	console.log("Devoloping mode set to: " + process.env.DEV_ENV);
	console.log('App is listening on port 8000!');
});