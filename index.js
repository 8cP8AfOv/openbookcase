/*-----------------------------------------------------------
Postgres のテスト
--------------------------------------------------------------*/

var r = 'a';
const { Client } = require('pg')

/*
const pg = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'testdb',
    password: 'postgres',
    port: 5432,
})
*/

/*
const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
*/
//console.log(process.env.DATABASE_URL )


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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('./dist'))
//app.use(express.static(path.join(__dirname, 'dist')));

const helmet = require('helmet')
app.use(helmet())

const port = process.env.PORT ||  3000; //8080;

var users = require('./routes/users');
app.use('/users', users);

app.use('/testdb', (req, res) => {

  var id = req.query.id;
  //var keyword = req.query.keyword;
  var user = 'a';
  //console.log( 'id: ' + id );
  //console.log('keyword: ' + keyword);
  
    pg.connect();
  
    pg.query(`SELECT * from users where id = ${ id };`, (err, result) => {
        if (err) throw err;
        user = JSON.stringify(result.rows[0]);
        //r = result.rows;
        //console.log(user);
        pg.end();
    });
  
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(user);


});

app.get('/', (req, res) => {
	res.send('Hello World !!' );
});


app.all('*', (req, res) => {
	res.send('404 Not found');
});

app.listen(port, () => {
	console.log(`Start server port:${port}`);
});

