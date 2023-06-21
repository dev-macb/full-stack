// Importação de mmódulos
import * as buscarPessoa from './BuscarPessoa';
import * as contarPessoas from './ContarPessoas';
import * as deletarPessoa from './DeletarPessoa';
import * as cadastrarPessoa from './CadastrarPessoa';
import * as atualizarPessoa from './AtualizarPessoa';
import * as buscarTodasPessoas from './BuscarTodasPessoas';


const PessoaProvider = {
    ...buscarPessoa,
    ...contarPessoas,
    ...deletarPessoa,
    ...cadastrarPessoa,
    ...atualizarPessoa,
    ...buscarTodasPessoas
};


export { PessoaProvider };
