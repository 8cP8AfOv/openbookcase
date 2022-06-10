var express = require('express');
var router = express.Router();

const { Client } = require('pg')

const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//https://qiita.com/tamura_CD/items/e3abdab9b8c5aa35fa6b


router.get('/', function (req, res, next) {
  //var param = {"result":"id:  "+ req.params.id};
var id = req.query.id;
var keyword = req.query.keyword;
var user = '';
console.log( 'id: ' + id );
console.log('keyword: ' + keyword);

  pg.connect();
  pg.query(`SELECT * from users where id = ${ id };`, (err, result) => {
      if (err) throw err;
      user = JSON.stringify(result.rows[0]);
      //r = result.rows;
      console.log(user);
      pg.end();
  });

  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(user);
});

/* サンプルAPI④ 
 * http://localhost:3000/samples にPOSTメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.post('/', function(req, res, next) {
  var param = {"値":"POSTメソッドのリクエストを受け付けました","bodyの値":req.body.card};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});




module.exports = router;