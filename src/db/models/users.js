import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    _id : { type : Number, required : true },
    chat_id : { type : Number, required : true },
    username : { type : String, required : true },
    state : { type : Boolean, default : true }
})

const UserModel = model("User", UserSchema)

export default UserModel