// Importação de módulos
import supertest from 'supertest';
import { servidor } from '../src/server/Servidor';
import { Knex } from '../src/server/database/knex';


beforeAll(async () => { 
    await Knex.migrate.latest(); 
    await Knex.seed.run(); 
});

afterAll(async () => { 
    await Knex.destroy(); 
});


const servidorTeste = supertest(servidor);


export { servidorTeste };
