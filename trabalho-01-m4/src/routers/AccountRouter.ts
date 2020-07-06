const route = "/accounts";

import { Router } from "express";
import AccountController from "@controllers/AccountController";
const router = Router();

router.get("/", AccountController.index);
router.get("/:agencia/:conta", AccountController.consulta);
router.get("/media/saldo/:agencia", AccountController.avgPerAgencia);
router.get("/menores/saldos/:limit", AccountController.menoresSaldos);
router.get("/maiores/saldos/:limit", AccountController.maioresSaldos);

router.delete("/:agencia/:conta", AccountController.excluir);

router.post("/depositar/:agencia/:conta", AccountController.depositar);
router.post("/saque/:agencia/:conta", AccountController.saque);
router.post("/transferir/:o_conta/:d_conta", AccountController.transferir);

router.post("/transfere/private", AccountController.private);

export default {
  url: route,
  router,
};
