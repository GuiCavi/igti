import mongoose from "mongoose";

const DB_HOST = "igti-m04.zdtjz.mongodb.net";
const DB_USER = "admin";
const DB_PASS = "wpxbgC3JCRYp2ouO";
const DB_DATABASE = "igti";

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(
  MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  },
  () => console.log("DB Connected")
);

mongoose.Promise = global.Promise;

export default mongoose;
