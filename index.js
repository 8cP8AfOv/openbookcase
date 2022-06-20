/*-----------------------------------------------------------
Postgres のテスト
--------------------------------------------------------------*/
//https://node-postgres.com/features/pooling


var r = 'a';
/*
const { Client } = require('pg')


const pg = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'testdb',
    password: 'postgres',
    port: 5432,
});

*/


const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


//--------------------------------------------------------------------------
/*
pg.connect();

pg.query('SELECT * from users;', (err, result) => {
    if (err) throw err;
    	r = JSON.stringify(result.rows[0]);
      //r = result.rows;
		console.log(r)
    	pg.end();
});
*/

// 現在時刻を取得
/*
pg.query('SELECT NOW()', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
		r = JSON.stringify(row);
  };
  // 接続終了
  pg.end();
});
*/

//--------------------------------------------------------------------------

var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
 });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('./dist'));
//app.use(express.static(path.join(__dirname, 'dist')));

const helmet = require('helmet')
app.use(helmet())

const port = process.env.PORT ||  3000; //8080;

// for test
app.use('/testdb', (req, res) => {
  pg.connect();

pg.query('SELECT * from users;', (err, result) => {
    if (err) throw err;
    	r = JSON.stringify(result.rows);
      //r = result.rows;
		//console.log(r)
    	pg.end();

  res.send(r);
});

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
