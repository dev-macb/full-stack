// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsuarioModel } from '../../database/models';
import { ValidarConsulta } from '../../shared/middlewares';
import { UsuarioProvider } from '../../database/providers/usuarios';


// Declaração de interface
interface ICorpo extends Omit<UsuarioModel, 'id_usuario' | 'ativo' | 'criado_em' | 'atualizado_em'> { }


const validarRegistrar = ValidarConsulta((obterEsquema) => ({
    body: obterEsquema<ICorpo>(yup.object().shape({
        apelido: yup.string().required().min(3),
        senha: yup.string().required().min(6)
    })),
}));


const registrar = async (request: Request<{}, {}, ICorpo>, response: Response) => {
    const dados: ICorpo = request.body;
    
    const resultado = await UsuarioProvider.regristar(dados);

    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: resultado.message });
    else return response.status(StatusCodes.CREATED).json(resultado);
};


export { validarRegistrar, registrar };
