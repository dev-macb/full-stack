// Importação de módulos
import { Knex } from 'knex';
import { ENomeTabelas } from '../ENomeTabelas';


async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ENomeTabelas.contatos, tabela => {
            tabela.bigIncrements('id_contato').primary().index();
            tabela.bigInteger('id_pessoa').notNullable().references('id_pessoa').inTable(ENomeTabelas.pessoas).onUpdate('CASCADE').onDelete('RESTRICT');
            tabela.string('descricao', 200).notNullable();
            tabela.string('telefone').notNullable();
            tabela.string('email').notNullable();
            tabela.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
            tabela.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
        })
        .then(() => {
            console.log(`[*] Tabela "${ENomeTabelas.contatos}" foi criada.`);
        });
}


async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable(ENomeTabelas.contatos)
        .then(() => { console.log(`[*] A tabela "${ENomeTabelas.contatos}" foi deletada.`); });
}


export { up, down };
