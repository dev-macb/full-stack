// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidarConsulta } from '../../shared/middlewares';
import { PessoaProvider } from './../../database/providers/pessoas';


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

    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else return response.status(StatusCodes.OK).json(resultado);
};


export { validarBuscar, buscar };
