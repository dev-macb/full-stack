// Importação de módulos
import { Knex } from '../../knex';
import { ContatoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


// Declaração de interface
interface IContato extends Omit<ContatoModel, 'id_contato' | 'criado_em' | 'atualizado_em'> { }


const atualizar = async (id: number, contato: IContato): Promise<void | Error> => {
    try {
        const [{ contador }] = await Knex(ENomeTabelas.contatos)
            .where('id_contato', '=', id)
            .count<[{ contador: number }]>('* as contador');

        if (contador === 0) {
            return new Error('A pessoa usada no cadastro não foi encontrada');
        }

        const resultado = await Knex(ENomeTabelas.contatos)
            .update({ ...contato, atualizado_em: Knex.fn.now()})
            .where('id_contato', '=', id);

        if (resultado > 0) return;
        else return new Error('Erro ao atualizar o registro');
    } 
    catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};


export { atualizar };
