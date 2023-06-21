// Importação de módulos
import { Knex } from '../../knex';
import { EnderecoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const buscar = async (id: number): Promise<EnderecoModel | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.enderecos).select('*').where('id_endereco', '=', id).first();

        if (resultado) return resultado;
        else return new Error('Registro não encontrado');
    } 
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao consultar o registro');
    }
};

export { buscar };