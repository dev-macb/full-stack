// Importação de módulos
import { Knex } from '../../knex';
import { PessoaModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const buscar = async (id: number): Promise<PessoaModel | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.pessoas).select('*').where('id_pessoa', '=', id).first();

        if (resultado) return resultado;
        else return new Error('Registro não encontrado');
    } 
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao consultar o registro');
    }
};

export { buscar };