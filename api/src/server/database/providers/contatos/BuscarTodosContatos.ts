// Importação de módulos
import { Knex } from '../../knex';
import { ContatoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const buscarTodos = async (pagina: number, limite: number, filtro: string): Promise<ContatoModel[] | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.contatos)
            .select('*')
            .where('descricao', 'like', `%${filtro}%`)
            .offset((pagina - 1) * limite)
            .limit(limite);

        return resultado;
    } 
    catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};


export { buscarTodos };
