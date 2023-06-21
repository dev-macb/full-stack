// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PessoaModel } from '../../database/models';
import { ValidarConsulta } from '../../shared/middlewares';
import { PessoaProvider } from '../../database/providers/pessoas';


// Declaração de interfaces
interface IParametro { id?: number; }
interface ICorpo extends Omit<PessoaModel, 'id_pessoa' | 'criado_em' | 'atualizado_em'> { }


const validarAtualizar = ValidarConsulta((obterEsquema) => ({
    params: obterEsquema<IParametro>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: obterEsquema<ICorpo>(yup.object().shape({
        cpf: yup.string().required().min(3),
        nome_completo: yup.string().required().min(3),
        data_nascimento: yup.date().required()
    }))
}));


const atualizar = async (request: Request<IParametro, {}, ICorpo>, response: Response) => {
    const id = request.params.id;
    const dados: ICorpo = request.body;
    
    if (!id) return response.status(StatusCodes.BAD_REQUEST).json({ erro: 'O parâmetro "id" precisa ser informado.' });

    const resultado = await PessoaProvider.atualizar(id, dados);

    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else return response.status(StatusCodes.NO_CONTENT).json(resultado);
};


export { validarAtualizar, atualizar };
