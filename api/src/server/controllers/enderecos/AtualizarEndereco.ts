// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EnderecoModel } from '../../database/models';
import { ValidarConsulta } from '../../shared/middlewares';
import { EnderecoProvider } from '../../database/providers/enderecos';


// Declaração de interfaces
interface IParametro { id?: number; }
interface ICorpo extends Omit<EnderecoModel, 'id_endereco' | 'criado_em' | 'atualizado_em'> { }


const validarAtualizar = ValidarConsulta((getSchema) => ({
    params: getSchema<IParametro>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<ICorpo>(yup.object().shape({
        id_pessoa: yup.number().required().min(3),
        logradouro: yup.string().required().min(3),
        complemento: yup.string().required().min(3),
        numero: yup.number().required().min(3),
        bairro: yup.string().required().min(3),
        cep: yup.string().required().min(7),
        cidade: yup.string().required().min(3),
        uf: yup.string().required().length(2)
    }))
}));


const atualizar = async (request: Request<IParametro, {}, ICorpo>, response: Response) => {
    const id = request.params.id;
    const dados: ICorpo = request.body;
    
    if (!id) return response.status(StatusCodes.BAD_REQUEST).json({ erro: 'O parâmetro "id" precisa ser informado.' });

    const resultado = await EnderecoProvider.atualizar(id, dados);

    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else return response.status(StatusCodes.NO_CONTENT).json(resultado);
};


export { validarAtualizar, atualizar };
