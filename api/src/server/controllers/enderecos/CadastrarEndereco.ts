// Importação de módulos
import * as yup from 'yup';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EnderecoModel } from '../../database/models';
import { ValidarConsulta } from '../../shared/middlewares';
import { EnderecoProvider } from '../../database/providers/enderecos';


// Declaração de interface
interface ICorpo extends Omit<EnderecoModel, 'id_endereco' | 'criado_em' | 'atualizado_em'> { }


const validarCadastrar = ValidarConsulta((obterEsquema) => ({
    body: obterEsquema<ICorpo>(yup.object().shape({
        id_pessoa: yup.number().required(),
        logradouro: yup.string().required().min(3),
        complemento: yup.string().required().min(3),
        numero: yup.number().required().min(3),
        bairro: yup.string().required().min(3),
        cep: yup.string().required().min(7),
        cidade: yup.string().required().min(3),
        uf: yup.string().required().length(2)
    }))
}));


const cadastrar = async(request: Request<{}, {}, ICorpo>, response: Response) => {
    const dados: ICorpo = request.body;
    
    const resultado = await EnderecoProvider.cadastrar(dados);

    if (resultado instanceof Error) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erro: resultado.message });
    else return response.status(StatusCodes.CREATED).json(resultado);
};


export { validarCadastrar, cadastrar };
