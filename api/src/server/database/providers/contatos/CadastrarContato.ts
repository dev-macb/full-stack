import { Knex } from '../../knex';
import { ContatoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const cadastrar = async (contato: Omit<ContatoModel, 'id_contato' | 'criado_em' | 'atualizado_em'>): Promise<number | Error> => {
    try {
        const [resultado] = await Knex(ENomeTabelas.contatos)
            .insert({ 
                id_pessoa: contato.id_pessoa,
                descricao: contato.descricao, 
                telefone: contato.telefone, 
                email: contato.email
            })
            .returning('id_contato');

        if (typeof resultado === 'object') return resultado.id_contato;
        else if (typeof resultado === 'number') return resultado;
        else return new Error('Erro ao cadastrar o registro');
    }
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao cadastrar o registro');
    }
};


export { cadastrar };
