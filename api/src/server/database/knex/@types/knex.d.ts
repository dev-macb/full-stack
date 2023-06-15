// Importação de módulos
import { PessoaModel } from '../../models/PessoaModel';
import { UsuarioModel } from '../../models/UsuarioModel';
import { ContatoModel } from '../../models/ContatoModel';
import { EnderecoModel } from '../../models/EnderecoModel';


declare module 'knex/types/tables' {
    interface Tables {
        pessoas: PessoaModel;
        produtos: UsuarioModel;
        contatos: ContatoModel;
        enderecos: EnderecoModel;
    }
}
