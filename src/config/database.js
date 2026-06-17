import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('[Conexión exitosa a PostgreSQL]');
        console.log('Fecha del servidor:', result.rows[0].now);
        return true;
    }
    catch (error) {
        console.error('[Error al conectar PostgreSQL]');
        console.error(error.message);
        return false;
    }
}

export default pool;