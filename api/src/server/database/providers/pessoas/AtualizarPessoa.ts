// Importação de módulos
import { Knex } from '../../knex';
import { PessoaModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


// Declaração de interface
interface IPessoa extends Omit<PessoaModel, 'id_pessoa' | 'criado_em' | 'atualizado_em'> { }


const atualizar = async (id: number, pessoa: IPessoa): Promise<void | Error> => {
    try {
        const [{ contador }] = await Knex(ENomeTabelas.pessoas)
            .where('id_pessoa', '=', id)
            .count<[{ contador: number }]>('* as contador');

        if (contador === 0) {
            return new Error('A cidade usada no cadastro não foi encontrada');
        }

        const resultado = await Knex(ENomeTabelas.pessoas)
            .update({ ...pessoa, atualizado_em: Knex.fn.now()})
            .where('id_pessoa', '=', id);

        if (resultado > 0) return;
        else return new Error('Erro ao atualizar o registro');
    } 
    catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};


export { atualizar };
