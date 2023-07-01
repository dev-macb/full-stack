// Importação de módulos
import { servidorTeste } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - Cadastrar', () => {
    let tokenAcesso = '';
    beforeAll(async () => {
        await servidorTeste.post('/registrar').send({ apelido: 'Teste', senha: 'Teste123' });
        const autenticacao = await servidorTeste.post('/entrar').send({ apelido: 'Teste', senha: 'Teste123' });

        tokenAcesso = autenticacao.body.tokenAcesso;
    });


    it('Tenta criar registro de pessoa sem token de autenticação', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .send({ 
                nome_completo: 'Teste da Silva', 
                cpf: '111.111.111-11',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta.body).toHaveProperty('erro');
    });


    it('Cria registro de pessoa com êxito', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Teste da Silva', 
                cpf: '111.111.111-11',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta.body).toEqual('number');
    });


    it('Cria um outro registro de pessoa com êxito', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Outro Registro Teste', 
                cpf: '222.222.222-22',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta.body).toEqual('number');
    });


    it('Tenta criar registro com CPF duplicado', async () => {
        const resposta1 = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Teste Duplicado', 
                cpf: '333.333.333-33',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');

        const resposta2 = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Teste Duplicado', 
                cpf: '333.333.333-33',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resposta2.body).toHaveProperty('erro');
    });


    it('Tenta criar registro com nome_completo muito curto', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Min', 
                cpf: '444.444.444-44',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.nome_completo');
    });


    it('Tenta criar registro sem nomeCompleto', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                cpf: '444.444.444-44',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.nome_completo');
    });


    it('Tenta criar registro sem cpf', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Min', 
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.cpf');
    });


    it('Tenta criar registro sem data_nascimento', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Min', 
                cpf: '444.444.444-44'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.data_nascimento');
    });


    it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({});

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.cpf');
        expect(resposta.body).toHaveProperty('erros.body.nome_completo');
        expect(resposta.body).toHaveProperty('erros.body.data_nascimento');
    });
});