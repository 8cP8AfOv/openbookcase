const { getPostgresClient } = require('./postgres');

async function myGet(q) {
    const db = await getPostgresClient();
    let id = parseInt(q.id);
    if ( isNaN(id) ) id = 0;
    console.log('id: ' + q.id)
    console.log('key: ' + q.keyword)
    let keyword = (q.keyword) ? q.keyword : '';
    let result = 'no user';
    try {
        if ( id ) {
            const sql = `Select * from users where id = $1 ;`;
            const params = [id];
            await db.begin();
            result = await db.execute(sql, params);
        } else {
            const sql = `Select * from users where (name like $1 ) or (email like $1 ) ;`;
            const params = [ '%' + keyword + '%' ];
            await db.begin();
            result = await db.execute(sql, params);
        }
    } catch (e) {
        await db.rollback();
        throw e;
    } finally {
        await db.release();
        return result;
    }
}

async function myPost(q) {
    const db = await getPostgresClient();
    let id = parseInt(q.id);
    if ( isNaN(id) ) id = 0;
    let name = (q.name) ? q.name : '' ;
    let email = (q.email) ? q.email : '' ;
    let result = 'KO' ;
    try {
        if (id) {
            const sql = `Update users  set name = $1, email = $2 where id = $3 ;`;
            const params = [name, email, id];
            await db.begin();
            result = await db.execute(sql, params);
            await db.commit();
        } else {
            const sql = `Insert into users (name, email) values ($1, $2) ;`;
            const params = [name, email];
            await db.begin();
            result = await db.execute(sql, params);
            await db.commit();
        };
    } catch (e) {
        await db.rollback();
        throw e;
    } finally {
        await db.release();
        return result ;
    }
}

async function myDelete(id) {
    const db = await getPostgresClient();
    id = parseInt(id);
    if ( isNaN(id) ) id = 0;
    let result = 'KO';
    try {
        if ( id ) {
            const sql = `Delete from users where id = $1 ;`;
            const params = [id];
            await db.begin();
            result = await db.execute(sql, params);
            await db.commit();
        } ;
    } catch (e) {
        await db.rollback();
        throw e;
    } finally {
        await db.release();
        return result ;
    }
}

//------------------------------------------------------------------------------------
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log('req query:' + req.query.toString())
    myGet(req.query)
    .then((result) => {
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.send( JSON.stringify( result ) );
    })
    .catch((e) => {
        console.log(e);
    });
});

router.post('/', function (req, res, next) {
    //console.log('post: ' + req.body.name + ' : ' + req.body.email );
    myPost(req.body)
    .then((result) => {
        console.log(result);
        res.send( 'OK ' );
    })
    .catch((e) => {
        console.log(e);
    });
});

router.delete('/:id', function (req, res, next) {
    //console.log('del: ' + req.params.id );
    myDelete( req.params.id )
    .then((result) => {
        console.log(result);
        res.send( 'OK ' );
    })
    .catch((e) => {
        console.log(e);
        res.send('KO');
    });
});




module.exports = router;