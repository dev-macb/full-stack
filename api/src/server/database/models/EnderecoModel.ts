// Declaração de inteface
interface EnderecoModel {
    id_endereco: number;
    id_pessoa: number;
    logradouro: string;
    complemento: string;
    numero: number;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    criado_em: Date;
    atualizado_em: Date;
}

export { EnderecoModel };
