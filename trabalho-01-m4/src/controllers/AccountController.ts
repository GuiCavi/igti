import Account from "@models/Account";

class AccountController {
  index = async (req, res) => {
    try {
      const accounts = await Account.find();

      return res.json({
        accounts,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível listar a contas",
      });
    }
  };

  depositar = (req, res) => {
    try {
      const { valor } = req.body;

      console.log(parseFloat(valor));

      req.body.valor = Math.abs(parseFloat(valor));

      return this.transacao(req, res);
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível depositar",
      });
    }
  };

  saque = (req, res) => {
    try {
      const { valor } = req.body;

      req.body.valor = Math.abs(parseFloat(valor) + 1) * -1;

      return this.transacao(req, res);
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível sacar",
      });
    }
  };

  transacao = async (req, res) => {
    try {
      // “agencia”, o número da “conta” e o valor do depósito.
      const { agencia, conta } = req.params;
      const { valor } = req.body;

      const account = await Account.findOne({ $and: [{ conta }, { agencia }] });

      if (!account) {
        return res.status(404).send({
          message: "Conta não encontrada",
        });
      }

      if (account.balance + valor > 0) {
        account.balance += valor;
        await account.save();
      } else {
        return res.status(400).send({
          message: "Não é possível fazer a transação",
        });
      }

      return res.json({
        message: "Transação realizada",
        saldo: account.balance,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Não é possível fazer a transação",
      });
    }
  };

  consulta = async (req, res) => {
    try {
      const { agencia, conta } = req.params;

      const account = await Account.findOne({ $and: [{ agencia }, { conta }] });

      if (!account) {
        return res.status(404).send({
          message: "Conta não encontrada",
        });
      }

      return res.status(200).send({
        message: "Conta encontrada",
        saldo: account.balance,
      });
    } catch (error) {}
  };

  excluir = async (req, res) => {
    try {
      const { agencia, conta } = req.params;

      const account = await Account.findOneAndDelete({
        $and: [{ agencia }, { conta }],
      });

      const totalAccounts = await Account.find({ agencia });

      if (!account) {
        return res.status(404).send({
          message: "Conta não encontrada",
        });
      }

      return res.status(200).send({
        message: "Conta encontrada",
        totalAccounts: totalAccounts.length,
      });
    } catch (error) {}
  };

  transferir = async (req, res) => {
    try {
      const { o_conta: oConta, d_conta: dConta } = req.params;
      const { valor } = req.body;

      const oAccount = await Account.findOne({ conta: oConta });

      if (!oAccount) {
        return res.status(404).send({
          message: "Conta origem não encontrada",
        });
      }

      const dAccount = await Account.findOne({ conta: dConta });

      if (!dAccount) {
        return res.status(404).send({
          message: "Conta destino não encontrada",
        });
      }

      let chargeFee = oAccount.agencia !== dAccount.agencia;

      if (oAccount.balance + Math.abs(valor) * -1 > 0) {
        oAccount.balance += Math.abs(valor) * -1 - +chargeFee * 8;
        dAccount.balance += Math.abs(valor);

        await oAccount.save();
        await dAccount.save();
      } else {
        return res.status(400).send({
          message: "Não é possível fazer a transação (origem não tem saldo)",
        });
      }

      return res.status(200).send({
        message: "Transferência realizada com sucess",
        saldo: oAccount.balance,
      });
    } catch (error) {}
  };

  avgPerAgencia = async (req, res) => {
    try {
      const { agencia } = req.params;

      const avg = await Account.aggregate([
        { $match: { agencia: parseInt(agencia) } },
        {
          $group: {
            _id: null,
            media: { $avg: "$balance" },
          },
        },
      ]);

      console.log(avg);

      return res.status(200).send({
        message: `A média dos saldos da agência ${agencia} é: ${avg[0].media}`,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Não foi possível sacar",
        error: error.message,
      });
    }
  };

  menoresSaldos = async (req, res) => {
    try {
      const { limit } = req.params;
      const accounts = await Account.find()
        .sort("balance")
        .limit(parseInt(limit));

      return res.status(200).send({
        message: `O menores saldos`,
        accounts,
      });
    } catch (error) {}
  };

  maioresSaldos = async (req, res) => {
    try {
      const { limit } = req.params;
      const accounts = await Account.find()
        .sort("-balance name")
        .limit(parseInt(limit));

      return res.status(200).send({
        message: `O maiores saldos`,
        accounts,
      });
    } catch (error) {}
  };

  private = async (req, res) => {
    try {
      const agencias = await Account.distinct("agencia");

      let promises = agencias.map(async (agencia) => {
        const ag = await Account.find({ agencia }).sort("-balance").limit(1);

        return ag;
      });

      const contas = await Promise.all(promises);

      promises = contas.map(async (conta) => {
        console.log(conta[0]);
        conta[0].agencia = 99;

        await conta[0].save();
        return conta[0];
      });

      const transferidas = await Promise.all(promises);

      return res.status(200).send({
        message: `O maiores saldos`,
        contas: transferidas,
      });
    } catch (error) {}
  };
}

export default new AccountController();
