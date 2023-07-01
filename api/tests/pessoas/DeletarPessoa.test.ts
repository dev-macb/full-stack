// Importação de módulos
import { servidorTeste } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - Deletar', () => {
    let tokenAcesso = '';
    beforeAll(async () => {
        await servidorTeste.post('/registrar').send({ apelido: 'Teste', senha: 'Teste123' });
        const autenticacao = await servidorTeste.post('/entrar').send({ apelido: 'Teste', senha: 'Teste123' });

        tokenAcesso = autenticacao.body.tokenAcesso;
    });


    it('Tenta apagar registro de pessoa sem token de autenticação', async () => {
        const resposta = await servidorTeste.delete('/pessoa/1').send();

        expect(resposta.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta.body).toHaveProperty('erro');
    });


    it('Apaga registro de pessoa com êxito', async () => {
        const resposta = await servidorTeste
            .post('/pessoa')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send({ 
                nome_completo: 'Teste da Silva', 
                cpf: '111.111.111-11',
                data_nascimento: '2000-02-20 20:00:00'
            });

        expect(resposta.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await servidorTeste
            .delete(`/pessoa/${resposta.body}`)
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });


    it('Tenta apagar registro de pessoa inexistente', async () => {
        const resposta = await servidorTeste
            .delete('/pessoa/99999')
            .set({ Authorization: `Bearer ${tokenAcesso}` })
            .send();

        expect(resposta.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resposta.body).toHaveProperty('erro');
    });
});