
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('./dist'));

const helmet = require('helmet')
app.use(helmet())

const port = process.env.PORT ||  3000; //8080;

// CRUD API --------------------------------------------------
var users = require('./routes/users');
app.use('/users', users);

var books = require('./routes/books');
app.use('/books', books);

var borrowing = require('./routes/borrowing');
app.use('/borrowing', borrowing);
// CRUD API --------------------------------------------------

app.get('/', (req, res) => {
	res.send('Hello World !!' );
});

app.all('*', (req, res) => {
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`Start server port:${port}`);
});
