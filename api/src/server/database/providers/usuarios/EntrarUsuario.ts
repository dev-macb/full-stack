// Importação de módulos
import { Knex } from '../../knex';
import { UsuarioModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


const entrar = async (email: string): Promise<UsuarioModel | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.usuarios)
            .select('*')
            .where('apelido', '=', email)
            .first();

        if (resultado) return resultado;

        return new Error('Registro não encontrado');
    } 
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao consultar o registro');
    }
};


export { entrar };
