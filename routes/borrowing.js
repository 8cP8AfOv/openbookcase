const { getPostgresClient } = require('./postgres');

async function myGet(q) {
    console.log('myGet: ' + JSON.stringify(q));
    const db = await getPostgresClient();
    let user_id = parseInt(q.user_id);
    if ( isNaN(user_id) ) user_id = 0;    
    let book_id = parseInt(q.book_id);
    if ( isNaN(book_id) ) book_id = 0;
    let isbn = ( q.isbn ) ? q.isbn : '';
    let result = [];
    console.log('myGet user_id: ' + user_id);
    try {
        if ( user_id ) {
            const sql = `Select books.id, books.isbn, books.title, books.authors, borrowing.create_timestamp from borrowing inner join books on borrowing.book_id = books.id where borrowing.user_id = $1 ;`;
            const params = [user_id];
            await db.begin();
            result = await db.execute(sql, params);
        } else if (book_id) {
            const sql = `Select * from borrowing where book_id = $1  ;`;
            const params = [ book_id ];
            await db.begin();
            result = await db.execute(sql, params);
        } else {
            const sql = `Select * from borrowing where book_isbn = $1  ;`;
            const params = [ isbn ];
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
    let result = 'KO' ;
    try {
        if (Array.isArray( q )) {
            let values = '';
            q.forEach( e => {
                values += '(' + e.user_id + ',' + e.book_id + ",'" + e.book_isbn + "')," ;
            });
            values = values.substring(0, values.length - 1);
            console.log('borrowing post valcues: ' + values);
            let sql = 'Insert into borrowing (user_id, book_id, book_isbn) values ' + values + ';' ;
            //const params = [ values ];
            await db.begin();
            //result = await db.execute(sql, params);
            result = await db.execute(sql);
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

async function myDelete(q) {
    const db = await getPostgresClient();
    let result = 'KO' ;
    console.log('myDelete ini')
    console.log( JSON.stringify(q));
    try {
        if (Array.isArray( q )) {
            let val = '';
            q.forEach( e => {
                val = e.id + ',' ;
            });
            val = val.substring(0, val.length - 1);

            let sql = 'Delete from borrowing where book_id in ( ' +  val + ' ) ;'
            console.log(sql);
            //let sql = `Delete from borrowing where book_id in ( $1 ) ;`
            //const params = [ val ];
            await db.begin();
            //result = await db.execute(sql, params);
            result = await db.execute(sql);
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


/*
async function myPost(q) {
    const db = await getPostgresClient();
    let user_id = parseInt(q.user_id);
    if ( isNaN(user_id) ) user_id = 0;
    let book_id = parseInt(q.book_id);
    if ( isNaN(book_id) ) book_id = 0;    
    let isbn = (q.isbn) ? q.isbn : '' ;    
    let result = 'KO' ;
    try {
        if (user_id) {
            const sql = `Insert into borrowing (user_id, book_id, book_isbn) values ($1, $2, $3) ;`;
            const params = [user_id, book_id, isbn ];
            await db.begin();
            result = await db.execute(sql, params);
            await db.commit();
        } else {
            const sql = `Delete from borrowing where book_id = $1 ;`;
            const params = [book_id];
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
*/


//------------------------------------------------------------------------------------
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    myGet(req.query)
    .then((result) => {
        console.log('myGet: ' + result ) ;
        res.send(result);
        //res.header('Content-Type', 'application/json; charset=utf-8')
        //res.send( JSON.stringify( result ) );
    })
    .catch((e) => {
        console.log(e);
    });
});

router.post('/', function (req, res, next) {
    myPost(req.body)
    .then((result) => {
        console.log(result);
        res.send( 'OK ' );
    })
    .catch((e) => {
        console.log(e);
    });
});

router.delete('/', function(req, res, next) {
    myDelete(req.body)
    .then((result) => {
        console.log(result);
        res.send( 'OK ' );
    })
    .catch((e) => {
        console.log(e);
    });    
});

module.exports = router;