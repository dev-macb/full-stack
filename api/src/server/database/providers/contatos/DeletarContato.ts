// Importação de módulos
import { Knex } from '../../knex';
import { ENomeTabelas } from '../../ENomeTabelas';


const deletar = async (id: number): Promise<void | Error> => {
    try {
        const resultado = await Knex(ENomeTabelas.contatos).where('id_contato', '=', id).del();

        if (resultado > 0) return;
        else return new Error('Erro ao apagar o registro');
    } 
    catch (erro) {
        console.log(erro);
        return new Error('Erro ao apagar o registro');
    }
};

export { deletar };
