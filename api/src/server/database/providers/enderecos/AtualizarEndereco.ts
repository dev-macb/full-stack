// Importação de módulos
import { Knex } from '../../knex';
import { EnderecoModel } from '../../models';
import { ENomeTabelas } from '../../ENomeTabelas';


// Declaração de interface
interface IEndereco extends Omit<EnderecoModel, 'id_endereco' | 'criado_em' | 'atualizado_em'> { }


const atualizar = async (id: number, endereco: IEndereco): Promise<void | Error> => {
    try {
        const [{ contador }] = await Knex(ENomeTabelas.enderecos)
            .where('id_endereco', '=', id)
            .count<[{ contador: number }]>('* as contador');

        if (contador === 0) {
            return new Error('A pessoa usada no cadastro não foi encontrada');
        }

        const resultado = await Knex(ENomeTabelas.enderecos)
            .update({ ...endereco, atualizado_em: Knex.fn.now()})
            .where('id_endereco', '=', id);

        if (resultado > 0) return;
        else return new Error('Erro ao atualizar o registro');
    } 
    catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};


export { atualizar };
