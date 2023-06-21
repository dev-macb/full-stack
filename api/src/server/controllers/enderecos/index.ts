// Importação de módulos
import * as buscarEndereco from './BuscarEndereco';
import * as deletarEndereco from './DeletarEndereco';
import * as cadastrarEndereco from './CadastrarEndereco';
import * as atualizarEndereco from './AtualizarEndereco';
import * as buscarTodosEnderecos from './BuscarTodosEnderecos';


const EnderecoController = {
    ...buscarEndereco,
    ...deletarEndereco,
    ...cadastrarEndereco,
    ...atualizarEndereco,
    ...buscarTodosEnderecos
};


export { EnderecoController };
