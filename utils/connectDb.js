import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }
  const db = await mongoose.connect(process.env.MONG_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("database connection affirmative");
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
