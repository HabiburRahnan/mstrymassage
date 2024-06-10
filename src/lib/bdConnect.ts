import mongoose from "mongoose";

type connectionObject = {
  isConnectd?: number;
};
const connection: connectionObject = {};
async function dbConnect(): Promise<void> {
    if(connection.isConnectd){
        console.log("Already connected to database")
    }
}
