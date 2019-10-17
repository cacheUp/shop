import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("database connection affirmative");
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.error(err);
  }
}

export default connectDb;
