// Importação de módulos
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PessoaController } from '../controllers';
import { ContatoController } from '../controllers';
import { EnderecoController } from '../controllers';



const rotiador = Router();


rotiador.get('/', (_, response) => { return response.status(StatusCodes.OK).send('Olá Mundo!'); });


// Pessoas
rotiador.post('/pessoa', PessoaController.validarCadastrar, PessoaController.cadastrar);
rotiador.get('/pessoa/:id', PessoaController.validarBuscar, PessoaController.buscar);
rotiador.get('/pessoas', PessoaController.validarBuscarTodas, PessoaController.buscarTodas);
rotiador.put('/pessoa/:id', PessoaController.validarAtualizar, PessoaController.atualizar);
rotiador.delete('/pessoa/:id', PessoaController.validarDeletar, PessoaController.deletar);

// Contatos
rotiador.post('/contato', ContatoController.validarCadastrar, ContatoController.cadastrar);
rotiador.get('/contato/:id', ContatoController.validarBuscar, ContatoController.buscar);
rotiador.get('/contatos', ContatoController.validarBuscarTodos, ContatoController.buscarTodos);
rotiador.put('/contato/:id', ContatoController.validarAtualizar, ContatoController.atualizar);
rotiador.delete('/contato/:id', ContatoController.validarDeletar, ContatoController.deletar);

// // Endereços
rotiador.post('/endereco', EnderecoController.validarCadastrar, EnderecoController.cadastrar);
rotiador.get('/endereco/:id', EnderecoController.validarBuscar, EnderecoController.buscar);
rotiador.get('/enderecos', EnderecoController.validarBuscarTodos, EnderecoController.buscarTodos);
rotiador.put('/endereco/:id', EnderecoController.validarAtualizar, EnderecoController.atualizar);
rotiador.delete('/endereco/:id', EnderecoController.validarDeletar, EnderecoController.deletar);


export { rotiador };
