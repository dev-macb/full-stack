// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidarConsulta } from '../../shared/middlewares';
import { PessoaProvider } from './../../database/providers/pessoas';
import { ContatoProvider } from '../../database/providers/contatos';
import { EnderecoProvider } from '../../database/providers/enderecos';


// Declaração de interface
interface IParametro { id?: number; }


const validarBuscar = ValidarConsulta(obterEsquema => ({
    params: obterEsquema<IParametro>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));


const buscar = async (request: Request<IParametro>, response: Response) => {
    const id = request.params.id;

    if (!id) return response.status(StatusCodes.BAD_REQUEST).json({ erro: 'O parâmetro "id" precisa ser informado.' });

    const resultado = await PessoaProvider.buscar(id);
    const contatos = await ContatoProvider.buscarPorPessoa(id);
    const enderecos = await EnderecoProvider.buscarPorPessoa(id);


    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else if (contatos instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: contatos.message });
    else if (enderecos instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: enderecos.message });
    else return response.status(StatusCodes.OK).json({ resultado, contatos, enderecos });
};


export { validarBuscar, buscar };
