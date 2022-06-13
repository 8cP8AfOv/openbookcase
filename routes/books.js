const { getPostgresClient } = require('./postgres');

async function myGet(q) {
    const db = await getPostgresClient();
    let id = parseInt(q.id);
    if ( isNaN(id) ) id = 0;
    let isbn = (q.isbn) ? q.isbn : '';
    let keyword = (q.keyword) ? q.keyword : '';
    let result = 'no book';
    try {
        if ( id ) {
            const sql = `Select * from books where id = $1 ;`;
            const params = [id];
            await db.begin();
            result = await db.execute(sql, params);
        } else if (isbn) {
            const sql = `Select * from books where isbn = $1 ;`;
            const params = [isbn];
            await db.begin();
            result = await db.execute(sql, params);
        } else {
            const sql = `Select * from books where (title like $1 ) or (authors like $1 ) ;`;
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
    let isbn = (q.isbn) ? q.isbn : '' ;    
    let title = (q.title) ? q.title : '' ;
    let authors = (q.authors) ? q.authors : '' ;
    let image = (q.image) ? q.image : '' ;
    let result = 'KO' ;
    try {
        if (id) {
            const sql = `Update books  set isbn = $1, title = $2, authors = $3, image = $4 where id = $5 ;`;
            const params = [isbn, title, authors, image, id];
            await db.begin();
            result = await db.execute(sql, params);
            await db.commit();
        } else {
            const sql = `Insert into books (isbn, title, authors, image) values ($1, $2, $3, $4) ;`;
            const params = [isbn, title, authors, image];
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
            const sql = `Delete from books where id = $1 ;`;
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
    //console.log('post: ' + req.body.isbn + ' : ' + req.body.title );
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