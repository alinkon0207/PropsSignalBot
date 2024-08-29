import { connect } from "mongoose";
import { config } from "dotenv";


config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await connect(`${URI}`, { useNewUrlParser : true, useUnifiedTopology : true });
        console.log("Connection to the Database was successful.");
    } catch (err) {
        console.error(err);
    }
}


export default connectDB;
