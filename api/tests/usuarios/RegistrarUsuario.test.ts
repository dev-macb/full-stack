// Importação de módulos
import { servidorTeste } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Usuários - Registrar', () => {
    it('Cria um registro de usuário com êxito', async () => {
        const resposta = await servidorTeste
            .post('/registrar')
            .send({ apelido: 'Teste1', senha: '1234567' });

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta.body).toEqual('number');
    });


    it('Cria um outro registro de usuário com êxito', async () => {
        const resposta = await servidorTeste
            .post('/registrar')
            .send({ apelido: 'Teste2', senha: '123456' });

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta.body).toEqual('number');
    });


    it('Tenta registrar um usuário com apelido duplicado', async () => {
        const resposta1 = await servidorTeste
            .post('/registrar')
            .send({ apelido: 'Duplicado', senha: '123456' });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');

        const resposta2 = await servidorTeste
            .post('/registrar')
            .send({ apelido: 'Duplicado', senha: '123456' });

        expect(resposta2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resposta2.body).toHaveProperty('erro');
    });


    it('Tenta registrar um usuário sem apelido', async () => {
        const resposta = await servidorTeste
            .post('/registrar')
            .send({ senha: '123456' });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.apelido');
    });


    it('Tenta registrar um usuário sem senha', async () => {
        const resposta = await servidorTeste
            .post('/registrar')
            .send({ apelido: 'Duplicado' });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.senha');
    });


    it('Tenta registrar um usuário com apelido muito pequeno', async () => {
        const resposta = await servidorTeste
            .post('/registrar')
            .send({ apelido: 'min', senha: '123456' });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.apelido');
    });


    it('Tenta registrar um usuário com senha muito pequena', async () => {
        const resposta = await servidorTeste
            .post('/registrar')
            .send({ apelido: 'Duplicado', senha: '12345' });

        expect(resposta.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta.body).toHaveProperty('erros.body.senha');
    });
});
