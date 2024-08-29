import { Schema, model } from "mongoose";

const SignalSchema = new Schema({
    _id : { type : Number, required : true },
    pair : { type : String, required : true },
    signal : { type : Boolean, required : true }, // true: Buy (LONG), false: Sell (SHORT)
    time_received : { type : Date, default : Date.now() }
});

const SignalModel = model("Signal", SignalSchema);

export default SignalModel;
