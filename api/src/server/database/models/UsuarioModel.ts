// Declaração de inteface
interface UsuarioModel {
    id_usuario: number;
    apelido: string;
    senha: string;
    ativo: boolean;
    criado_em: Date;
    atualizado_em: Date;
}

export { UsuarioModel };
