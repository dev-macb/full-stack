// Declaração de inteface
interface PessoaModel {
    id_pessoa: number;
    cpf: string;
    nome_completo: string;
    data_nascimento: string;
    criado_em: Date;
    atualizado_em: Date;
}

export { PessoaModel };