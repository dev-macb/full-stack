// Importação de módulos
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PessoaController } from '../controllers';
import { ContatoController } from '../controllers';
import { EnderecoController } from '../controllers';
import { UsuarioController } from '../controllers/usuarios';
import { autorizacao } from '../shared/middlewares';


const rotiador = Router();

rotiador.get('/', (_, response) => { return response.status(StatusCodes.OK).send('Olá Mundo!'); });

// Usuários
rotiador.get('/entrar', UsuarioController.validarEntrar, UsuarioController.entrar);
rotiador.post('/registrar', UsuarioController.validarRegistrar, UsuarioController.registrar);

// Pessoas
rotiador.post('/pessoa', autorizacao, PessoaController.validarCadastrar, PessoaController.cadastrar);
rotiador.get('/pessoa/:id', autorizacao, PessoaController.validarBuscar, PessoaController.buscar);
rotiador.get('/pessoas', PessoaController.validarBuscarTodas, PessoaController.buscarTodas);
rotiador.put('/pessoa/:id', autorizacao, PessoaController.validarAtualizar, PessoaController.atualizar);
rotiador.delete('/pessoa/:id', autorizacao, PessoaController.validarDeletar, PessoaController.deletar);

// Contatos
rotiador.post('/contato', autorizacao, ContatoController.validarCadastrar, ContatoController.cadastrar);
rotiador.get('/contato/:id', autorizacao, ContatoController.validarBuscar, ContatoController.buscar);
rotiador.get('/contatos', autorizacao, ContatoController.validarBuscarTodos, ContatoController.buscarTodos);
rotiador.put('/contato/:id', autorizacao, ContatoController.validarAtualizar, ContatoController.atualizar);
rotiador.delete('/contato/:id', autorizacao, ContatoController.validarDeletar, ContatoController.deletar);

// Endereços
rotiador.post('/endereco', autorizacao, EnderecoController.validarCadastrar, EnderecoController.cadastrar);
rotiador.get('/endereco/:id', autorizacao, EnderecoController.validarBuscar, EnderecoController.buscar);
rotiador.get('/enderecos', autorizacao, EnderecoController.validarBuscarTodos, EnderecoController.buscarTodos);
rotiador.put('/endereco/:id', autorizacao, EnderecoController.validarAtualizar, EnderecoController.atualizar);
rotiador.delete('/endereco/:id', autorizacao, EnderecoController.validarDeletar, EnderecoController.deletar);


export { rotiador };
