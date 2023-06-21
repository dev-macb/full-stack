// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidarConsulta } from '../../shared/middlewares';
import { EnderecoProvider } from '../../database/providers/enderecos';


// Declaração de interface
interface IParametro { id?: number; }


const validarDeletar = ValidarConsulta(obterEsquema => ({
    params: obterEsquema<IParametro>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    }))
}));


const deletar = async (request: Request<IParametro>, response: Response) => {
    const id = request.params.id;
    
    if (!id) return response.status(StatusCodes.BAD_REQUEST).json({ erro: 'O parâmetro "id" precisa ser informado.' });

    const resultado = await EnderecoProvider.deletar(id);
    
    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else return response.status(StatusCodes.NO_CONTENT).send();
};


export { validarDeletar, deletar };
