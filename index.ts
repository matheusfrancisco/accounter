import express from 'express';
import 'reflect-metadata';
import { buildHolderController } from './src/view/holder-controller';

const server = express();
const holderController = buildHolderController({ createHolder: () => {} });
server.get('/', (req, res) => {
  res.send('Hello world');
});
server.post('/holders', holderController.post);

server.listen(3000, () => {});
