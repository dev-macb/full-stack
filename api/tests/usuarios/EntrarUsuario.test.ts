// Importação de módulos
import { servidorTeste } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Usuário - Entrar', () => {
    beforeAll(async () => {
        await servidorTeste.post('/registrar').send({ 
            apelido: 'Teste', 
            senha: 'Teste123'
        });
    });


    it('Realizar autenticação com êxito', async () => {
        const resposta = await servidorTeste
            .post('/entrar')
            .send({ apelido: 'Teste', senha: 'Teste123' });
            
        expect(resposta.statusCode).toEqual(StatusCodes.OK);
        expect(resposta.body).toHaveProperty('tokenAcesso');
    });


    it('Tentar autenticar usuário com apelido errado', async () => {
        const resposta = await servidorTeste
            .post('/entrar')
            .send({ apelido: 'Inexistente', senha: 'Teste123' });

        expect(resposta.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta.body).toHaveProperty('erro');
    });


    it('Tentar autenticar usuário com senha errada', async () => {
        const resposta = await servidorTeste
            .post('/entrar')
            .send({ apelido: 'Teste', senha: 'SenhaErrada' });

        expect(resposta.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta.body).toHaveProperty('erro');
    });


    it('Tentar autenticar usuário com senha muito pequena', async () => {
        const resposta = await servidorTeste
            .post('/entrar')
            .send({ apelido: 'Teste', senha: '123' });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.senha');
    });


    it('Tentar autenticar usuário sem senha', async () => {
        const resposta = await servidorTeste
            .post('/entrar')
            .send({ apelido: 'Teste' });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.senha');
    });


    it('Tentar autenticar usuário sem apelido', async () => {
        const resposta = await servidorTeste
            .post('/entrar')
            .send({ senha: 'Teste123' });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.apelido');
    });
});