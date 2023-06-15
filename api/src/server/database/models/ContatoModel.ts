// Declaração de inteface
interface ContatoModel {
    id_contato: number;
    id_pessoa: number;
    descricao: string;
    telefone: string;
    email: string;
    criado_em: Date;
    atualizado_em: Date;
}

export { ContatoModel };