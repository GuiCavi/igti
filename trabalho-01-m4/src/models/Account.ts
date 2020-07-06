import mongoose from "@config/mongoose";

const AccountSchema = new mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate: function (value: number) {
      if (value < 0) {
        throw new Error("Valor negativo para balance");
      }
      return true;
    },
  },
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
