//https://qiita.com/masaks/items/3ee1b5a06a95315a7ae7

/*
const { Client } = require('pg');
const pg = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'testdb',
    password: 'postgres',
    port: 5432,
})
const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1234",
  port: "5432"
});
*/
/*
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
*/
/*
const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
*/
//---------------------------------------

const { Pool } = require('pg').Pool;
//const connectionString = 'postgresql://postgres:postgres@localhost:5432/testdb';
const connectionString = 'postgres://zxxrerpbjexjkt:d6376ad799cd1032ad56f03dd6d2583f65fdc2a29d3f283f9e7fe69d463e2de1@ec2-54-211-255-161.compute-1.amazonaws.com:5432/de90tuv7jdic7i';
const pool = new Pool({ connectionString });

/**
 * Postgresクラス
 */
class Postgres {

    /**
     * Poolからclientを取得
     * @return {Promise<void>}
     */
    async init() {
        this.client = await pool.connect();
    }

    /**
     * SQLを実行
     * @param query
     * @param params
     * @return {Promise<*>}
     */
    async execute(query, params = []) {
        return (await this.client.query(query, params)).rows;
    }

    /**
     * 取得したクライアントを解放してPoolに戻す
     * @return {Promise<void>}
     */
    async release() {
        await this.client.release(true);
    }

    /**
     * Transaction Begin
     * @return {Promise<void>}
     */
    async begin() {
        await this.client.query('BEGIN');
    }

    /**
     * Transaction Commit
     * @return {Promise<void>}
     */
    async commit() {
        await this.client.query('COMMIT');
    }

    /**
     * Transaction Rollback
     * @return {Promise<void>}
     */
    async rollback() {
        await this.client.query('ROLLBACK');
    }
}

/**
 * Postgresのインスタンスを返却
 * @return {Promise<Postgres>}
 */
const getClient = async () => {
    const postgres = new Postgres();
    await postgres.init();
    return postgres;
};

module.exports.getPostgresClient = getClient;
