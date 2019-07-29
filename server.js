const express = require('express');
const exphbs =  require('express-handlebars');
const methodOverride = require("method-override");
const bodyParser = require('body-parser') ;
const path = require('path');

/*Db connection*/
var db = require('./config/database');

const app = express();

app.engine('handlebars', exphbs({
	 defaultLayout : 'main', 
	 /*layoutsDir: path.join(__dirname, 'views/layouts')*/

}));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//BODYPARSER

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//SET STATIC FOLDER

app.use(express.static(path.join(__dirname, 'public')));	

//INDEX ROUTE
app.get('/', (req,res) => res.render('index'));


//ROUTING PAGES
app.use('/routing', require('./routes/routing'));

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is listening on ${PORT}`));
