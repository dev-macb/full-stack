// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsuarioModel } from '../../database/models';
import { ValidarConsulta } from '../../shared/middlewares';
import { UsuarioProvider } from '../../database/providers/usuarios';

import { JWTService, HashService } from '../../shared/services';


interface ICorpo extends Omit<UsuarioModel, 'id_usuario' | 'ativo' | 'criado_em' | 'atualizado_em'> { }


const validarEntrar = ValidarConsulta((obterEsquema) => ({
    body: obterEsquema<ICorpo>(yup.object().shape({
        apelido: yup.string().required().min(3),
        senha: yup.string().required().min(5)
    })),
}));


const entrar = async (request: Request<{}, {}, ICorpo>, response: Response) => {
    const { apelido, senha } = request.body;
    const usuario = await UsuarioProvider.entrar(apelido);

    if (usuario instanceof Error) return response.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Email ou senha são inválidos' });

    const senhaCorreta = await HashService.comparar(senha, usuario.senha);
    if (senhaCorreta) {
        const tokenAcesso = JWTService.gerar({ uid: usuario.id_usuario });
        
        if (tokenAcesso === 'JWT_SECRET_NOT_FOUND') return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: 'Erro ao gerar o token de acesso' });
        else return response.status(StatusCodes.OK).json({ tokenAcesso });
    }

    return response.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Apelido ou senha inválidos' });
};


export { validarEntrar, entrar };
