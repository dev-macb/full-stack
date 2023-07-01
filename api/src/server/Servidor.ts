// Importação de módulos
import 'dotenv/config';
import express from 'express';
import { rotiador } from './routes';
import './shared/services/YupService';


const servidor = express();
servidor.use(express.json());
servidor.use(rotiador);


export { servidor };
