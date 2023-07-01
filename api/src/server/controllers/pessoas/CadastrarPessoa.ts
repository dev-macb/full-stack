// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PessoaModel } from '../../database/models';
import { ValidarConsulta } from '../../shared/middlewares';
import { PessoaProvider } from '../../database/providers/pessoas';


// Declaração de interface
interface ICorpo extends Omit<PessoaModel, 'id_pessoa' | 'criado_em' | 'atualizado_em'> { }


const validarCadastrar = ValidarConsulta((obterEsquema) => ({
    body: obterEsquema<ICorpo>(yup.object().shape({
        cpf: yup.string().required().min(10),
        nome_completo: yup.string().required().min(4),
        data_nascimento: yup.date().required()
    }))
}));


const cadastrar = async(request: Request<{}, {}, ICorpo>, response: Response) => {
    const dados: ICorpo = request.body;
    
    const resultado = await PessoaProvider.cadastrar(dados);

    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else return response.status(StatusCodes.CREATED).json(resultado);
};


export { validarCadastrar, cadastrar };
