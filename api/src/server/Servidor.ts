import 'dotenv/config';
import express from 'express';
import { rotiador } from './routes';
import './shared/services/TraducaoYup';


const servidor = express();
servidor.use(express.json());
servidor.use(rotiador);


export { servidor };
