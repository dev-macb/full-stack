// Importação de módulos
import * as buscarPessoa from './BuscarPessoa';
import * as deletarPessoa from './DeletarPessoa';
import * as cadastrarPessoa from './CadastrarPessoa';
import * as atualizarPessoa from './AtualizarPessoa';
import * as buscarTodasPessoas from './BuscarTodasPessoas';


const PessoaController = {
    ...buscarPessoa,
    ...deletarPessoa,
    ...cadastrarPessoa,
    ...atualizarPessoa,
    ...buscarTodasPessoas
};


export { PessoaController };
