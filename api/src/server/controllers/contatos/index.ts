// Importação de módulos
import * as buscarContato from './BuscarContato';
import * as deletarContato from './DeletarContato';
import * as cadastrarContato from './CadastrarContato';
import * as atualizarContato from './AtualizarContato';
import * as buscarTodosContatos from './BuscarTodosContatos';


const ContatoController = {
    ...buscarContato,
    ...deletarContato,
    ...cadastrarContato,
    ...atualizarContato,
    ...buscarTodosContatos
};


export { ContatoController };
