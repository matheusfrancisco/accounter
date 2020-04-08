import express from 'express';
import 'reflect-metadata';
import { FintopFactory } from './src/fintop-factory';

(async () => {
  const { holderController } = await FintopFactory.build();
  const server = express();
  server.use(express.json());

  server.get('/', (req, res) => {
    res.send('Hello world');
  });

  server.post('/holders', holderController.post);
  server.listen(3000, () => {});
})();
