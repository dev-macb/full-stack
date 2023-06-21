// Importação de módulos
import { Knex } from '../../knex';
import { PessoaModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const buscarTodos = async (pagina: number, limite: number, filtro: string): Promise<PessoaModel[] | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.pessoas)
            .select('*')
            .where('nome_completo', 'like', `%${filtro}%`)
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
