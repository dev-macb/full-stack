import { Knex } from '../../knex';
import { PessoaModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const cadastrar = async (pessoa: Omit<PessoaModel, 'id_pessoa' | 'criado_em' | 'atualizado_em'>): Promise<number | Error> => {
    try {
        const [resultado] = await Knex(ENomeTabelas.pessoas)
            .insert({ 
                cpf: pessoa.cpf, 
                nome_completo: pessoa.nome_completo, 
                data_nascimento: pessoa.data_nascimento
            })
            .returning('id_pessoa');

        if (typeof resultado === 'object') return resultado.id_pessoa;
        else if (typeof resultado === 'number') return resultado;
        else return new Error('Erro ao cadastrar o registro');
    }
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao cadastrar o registro');
    }
};


export { cadastrar };
