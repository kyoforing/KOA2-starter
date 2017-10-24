const writeConfig = {
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_URL,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT
    },
    pool: { min: 0, max: 7 }
};

const readConfig = {
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_REPLICA_URL,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT
    },
    pool: { min: 0, max: 7 }
};

module.exports = {
    read: () => {
        return require('knex')(readConfig);
    },
    write: () => {
        return require('knex')(writeConfig);
    }
}
