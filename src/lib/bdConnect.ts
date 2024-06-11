import mongoose from "mongoose";

type connectionObject = {
  isConnectd?: number;
};
const connection: connectionObject = {};
async function dbConnect(): Promise<void> {
  if (connection.isConnectd) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGOBD_URI || "", {});
    console.log(db);
    connection.isConnectd = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connected failed", error);

    process.exit(1);
  }
}

export default dbConnect;
