// Importação de módulos
import { servidorTeste } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - Buscar Todos', () => {
    let tokenAcesso = '';
    beforeAll(async () => {
        await servidorTeste.post('/registrar').send({ apelido: 'Teste', senha: 'Teste123' });
        const autenticacao = await servidorTeste.post('/entrar').send({ apelido: 'Teste', senha: 'Teste123' });

        tokenAcesso = autenticacao.body.tokenAcesso;
    });


    it('Tenta buscar todos registro de pessoas sem token de autenticação', async () => {
        const resposta = await servidorTeste
            .get('/pessoas')
            .send();

        expect(resposta.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta.body).toHaveProperty('erro');
    });


    it('Busca todos os registros de pessoa com êxito', async () => {
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
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Teste Alternativo', 
                cpf: '222.222.222-22',
                data_nascimento: '2000-02-20 20:00:00'
            });
        expect(resposta2.statusCode).toEqual(StatusCodes.CREATED);

        const resposta3 = await servidorTeste
            .get('/pessoas')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send();
            
        expect(Number(resposta3.header['x-total-count'])).toEqual(2);
        expect(resposta3.statusCode).toEqual(StatusCodes.OK);
        expect(resposta3.body.length).toBeGreaterThan(0);
    });
});