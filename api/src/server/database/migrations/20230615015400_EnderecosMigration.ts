// Importação de módulos
import { Knex } from 'knex';
import { ENomeTabelas } from '../ENomeTabelas';


async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(ENomeTabelas.enderecos, tabela => {
            tabela.bigIncrements('id_endereco').primary().index();
            tabela.bigInteger('id_pessoa').index().notNullable()
                .references('id_pessoa').inTable(ENomeTabelas.pessoas).onUpdate('CASCADE').onDelete('RESTRICT');
            tabela.string('logradouro', 50).notNullable();
            tabela.string('complemento', 50).nullable();
            tabela.integer('numero').nullable();
            tabela.string('bairo', 50).nullable();
            tabela.string('cep', 10).nullable();
            tabela.string('cidade', 50).nullable();
            tabela.string('uf', 2).nullable();
            tabela.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
            tabela.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
            tabela.comment('Tabela usada para armazenar endereços do sistema.');
        })
        .then(() => {
            console.log(`[*] Tabela "${ENomeTabelas.enderecos}" foi criada.`);
        });
}


async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable(ENomeTabelas.enderecos)
        .then(() => { console.log(`[*] A tabela "${ENomeTabelas.enderecos}" foi deletada.`); });
}


export { up, down };
