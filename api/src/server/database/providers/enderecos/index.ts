// Importação de mmódulos
import * as buscarEndereco from './BuscarEndereco';
import * as contarEnderecos from './ContarEnderecos';
import * as deletarEndereco from './DeletarEndereco';
import * as cadastrarEndereco from './CadastrarEndereco';
import * as atualizarEndereco from './AtualizarEndereco';
import * as buscarTodosEnderecos from './BuscarTodosEnderecos';


const EnderecoProvider = {
    ...buscarEndereco,
    ...contarEnderecos,
    ...deletarEndereco,
    ...cadastrarEndereco,
    ...atualizarEndereco,
    ...buscarTodosEnderecos
};


export { EnderecoProvider };
