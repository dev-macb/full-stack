// Importação de módulos
import { Knex } from 'knex';
import { ENomeTabelas } from '../ENomeTabelas';


async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ENomeTabelas.usuarios, tabela => {
            tabela.bigIncrements('id_usuario').primary().index();
            tabela.string('apelido', 50).unique().notNullable().checkLength('>', 3).index();
            tabela.string('senha', 200).notNullable().checkLength('>', 5);
            tabela.boolean('ativo').notNullable().defaultTo(1);
            tabela.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
            tabela.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
            tabela.comment('Tabela usada para armazenar usuarios do sistema.');
        })
        .then(() => {
            console.log(`[*] Tabela "${ENomeTabelas.usuarios}" foi criada.`);
        });
}


async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable(ENomeTabelas.usuarios)
        .then(() => { console.log(`[*] A tabela "${ENomeTabelas.usuarios}" foi deletada.`); });
}


export { up, down };
