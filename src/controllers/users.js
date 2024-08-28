import UserModel from "../db/models/users.js"

export const createUser = async (credentials) => {
    let user;

    try {
        user = await UserModel.findOne({ chat_id: credentials.chat_id });
        if (user) {
            console.log('User already registered!');
            return user;
        }
        
        const id = await UserModel.estimatedDocumentCount()
        user = new UserModel({
            _id : id + 1,
            ...credentials
        })

        const response = await user.save()

        return response
    } catch (error) {
        console.log(error)
    }
}