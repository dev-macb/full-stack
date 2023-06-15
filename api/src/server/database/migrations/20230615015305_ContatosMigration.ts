// Importação de módulos
import { Knex } from 'knex';
import { ENomeTabelas } from '../ENomeTabelas';


async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ENomeTabelas.contatos, tabela => {
            tabela.bigIncrements('id_contato').primary().index();
            tabela.bigInteger('id_pessoa').index().notNullable()
                .references('id_pessoa').inTable(ENomeTabelas.pessoas).onUpdate('CASCADE').onDelete('RESTRICT');
            tabela.string('descricao', 50).notNullable();
            tabela.string('telefone', 20).notNullable().checkLength('>', 8);
            tabela.string('email', ).unique().notNullable().defaultTo(1);
            tabela.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
            tabela.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
            tabela.comment('Tabela usada para armazenar contatos do sistema.');
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
