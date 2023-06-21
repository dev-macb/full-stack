import { Knex } from '../../knex';
import { EnderecoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const cadastrar = async (endereco: Omit<EnderecoModel, 'id_endereco' | 'criado_em' | 'atualizado_em'>): Promise<number | Error> => {
    try {
        const [resultado] = await Knex(ENomeTabelas.enderecos)
            .insert({ 
                id_pessoa: endereco.id_pessoa,
                logradouro: endereco.logradouro, 
                complemento: endereco.complemento, 
                numero: endereco.numero,
                bairro: endereco.bairro,
                cep: endereco.cep,
                cidade: endereco.cidade,
                uf: endereco.uf
            })
            .returning('id_endereco');

        if (typeof resultado === 'object') return resultado.id_endereco;
        else if (typeof resultado === 'number') return resultado;
        else return new Error('Erro ao cadastrar o registro');
    }
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao cadastrar o registro');
    }
};


export { cadastrar };
