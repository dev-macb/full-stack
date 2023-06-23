// Importação de mmódulos
import * as buscarEndereco from './BuscarEndereco';
import * as contarEnderecos from './ContarEnderecos';
import * as deletarEndereco from './DeletarEndereco';
import * as cadastrarEndereco from './CadastrarEndereco';
import * as atualizarEndereco from './AtualizarEndereco';
import * as buscarTodosEnderecos from './BuscarTodosEnderecos';
import * as buscarPorPessoa from './BuscarPorPessoa';

const EnderecoProvider = {
    ...buscarEndereco,
    ...contarEnderecos,
    ...deletarEndereco,
    ...cadastrarEndereco,
    ...atualizarEndereco,
    ...buscarTodosEnderecos,
    ...buscarPorPessoa
};


export { EnderecoProvider };
