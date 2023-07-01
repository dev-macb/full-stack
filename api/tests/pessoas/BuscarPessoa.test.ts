// Importação de módulos
import { servidorTeste } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - Buscar', () => {
    let tokenAcesso = '';
    beforeAll(async () => {
        await servidorTeste.post('/registrar').send({ apelido: 'Teste', senha: 'Teste123' });
        const autenticacao = await servidorTeste.post('/entrar').send({ apelido: 'Teste', senha: 'Teste123' });

        tokenAcesso = autenticacao.body.tokenAcesso;
    });


    it('Tenta buscar um registro de pessoa sem token de autenticação', async () => {
        const resposta = await servidorTeste
            .get('/pessoa/1')
            .send();

        expect(resposta.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta.body).toHaveProperty('erro');
    });


    it('Busca registro por id com êxito', async () => {
        const resposta1 = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Teste da Silva', 
                cpf: '111.111.111-11',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);

        const resposta2 = await servidorTeste
            .get(`/pessoa/${resposta1.body}`)
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send();

        expect(resposta2.statusCode).toEqual(StatusCodes.OK);
        expect(resposta2.body).toHaveProperty('resultado');
    });


    it('Tenta buscar registro de pessoa inexistente', async () => {
        const resposta = await servidorTeste
            .get('/pessoa/99999')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send();

        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resposta.body).toHaveProperty('erro');
    });
});