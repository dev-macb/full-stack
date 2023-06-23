// Importação de mmódulos
import * as buscarContato from './BuscarContato';
import * as contarContatos from './ContarContatos';
import * as deletarContato from './DeletarContato';
import * as cadastrarContato from './CadastrarContato';
import * as atualizarContato from './AtualizarContato';
import * as buscarTodosContatos from './BuscarTodosContatos';
import * as buscarPorPessoa from './BuscarPorPessoa';

const ContatoProvider = {
    ...buscarContato,
    ...contarContatos,
    ...deletarContato,
    ...cadastrarContato,
    ...atualizarContato,
    ...buscarTodosContatos,
    ...buscarPorPessoa
};


export { ContatoProvider };
