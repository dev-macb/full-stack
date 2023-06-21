// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContatoModel } from '../../database/models';
import { ValidarConsulta } from '../../shared/middlewares';
import { ContatoProvider } from '../../database/providers/contatos';


// Declaração de interface
interface ICorpo extends Omit<ContatoModel, 'id_contato' | 'criado_em' | 'atualizado_em'> { }


const validarCadastrar = ValidarConsulta((obterEsquema) => ({
    body: obterEsquema<ICorpo>(yup.object().shape({
        id_pessoa: yup.number().required(),
        descricao: yup.string().required().min(3),
        telefone: yup.string().required().min(10),
        email: yup.string().required().email()
    }))
}));


const cadastrar = async(request: Request<{}, {}, ICorpo>, response: Response) => {
    const dados: ICorpo = request.body;
    
    const resultado = await ContatoProvider.cadastrar(dados);

    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else return response.status(StatusCodes.CREATED).json(resultado);
};


export { validarCadastrar, cadastrar };
