// Importação de módulos
import { Knex } from 'knex';
import { ENomeTabelas } from '../ENomeTabelas';


async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ENomeTabelas.pessoas, tabela => {
            tabela.bigIncrements('id_pessoa').primary().index();
            tabela.string('cpf', 50).unique().notNullable().checkLength('>', 10).index();
            tabela.string('nome_completo', 200).notNullable();
            tabela.timestamp('data_nascimento').notNullable().defaultTo(knex.fn.now());
            tabela.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
            tabela.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
            tabela.comment('Tabela usada para armazenar pessoas do sistema.');
        })
        .then(() => {
            console.log(`[*] Tabela "${ENomeTabelas.pessoas}" foi criada.`);
        });
}


async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable(ENomeTabelas.pessoas)
        .then(() => { console.log(`[*] A tabela "${ENomeTabelas.pessoas}" foi deletada.`); });
}


export { up, down };
