// Importação de módulos
import * as entrarUsuario from './EntrarUsuario';
import * as registrarUsuario from './RegistrarUsuario';


const UsuarioProvider = {
    ...entrarUsuario,
    ...registrarUsuario,
};


export { UsuarioProvider };
