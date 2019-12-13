import express from "express";
import { buildHolderController } from "./src/view/holder-controller";

const server = express();
const holderController = buildHolderController({ createHolder: () => {} });
server.get("/", (_, res)=> {res.send("Hello world");});
server.post("/holders", holderController.postHolder);

server.listen(3000, () => {});