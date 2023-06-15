// Importação de módulos
import path from 'path';
import { Knex } from 'knex';


const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreing_keys = ON');
            done();
        }
    }
};


const test: Knex.Config = {
    ...development,
    connection: ':memory'
};


const production: Knex.Config = {
    ...development,
};


export { development, test, production };
