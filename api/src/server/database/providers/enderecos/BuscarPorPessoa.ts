// Importação de módulos
import { Knex } from '../../knex';
import { EnderecoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const buscarPorPessoa = async (idPessoa: number): Promise<EnderecoModel[] | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.enderecos).select('*').where('id_pessoa', '=', idPessoa);

        if (resultado) return resultado;
        else return new Error('Registro não encontrado');
    } 
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao consultar o registro');
    }
};

export { buscarPorPessoa };