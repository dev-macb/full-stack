// Importação de módulos
import 'dotenv/config';
import express from 'express';
import { rotiador } from './routes';


// Declaração e configuração do servidor
const servidor = express();
servidor.use(express.json());
servidor.use(rotiador);


export { servidor };
