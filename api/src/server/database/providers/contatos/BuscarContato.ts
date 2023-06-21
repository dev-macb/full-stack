// Importação de módulos
import { Knex } from '../../knex';
import { ContatoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const buscar = async (id: number): Promise<ContatoModel | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.contatos).select('*').where('id_contato', '=', id).first();

        if (resultado) return resultado;
        else return new Error('Registro não encontrado');
    } 
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao consultar o registro');
    }
};

export { buscar };