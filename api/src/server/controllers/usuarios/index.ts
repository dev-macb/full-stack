// Importação de módulos
import * as entrarUsuario from './EntrarUsuario';
import * as registrarUsuario from './RegistrarUsuario';


const UsuarioController = {
    ...entrarUsuario,
    ...registrarUsuario,
};


export { UsuarioController };
